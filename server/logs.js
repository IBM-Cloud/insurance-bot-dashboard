import { MongoClient } from 'mongodb';
import assert from 'assert';
import cfenv from 'cfenv';
import util from 'util';
import watson from 'watson-developer-cloud';

// load local VCAP configuration
let vcapLocal;
try {
  vcapLocal = require('../vcap-local.json');
}
catch (e) {
  vcapLocal = {};
}

// get the app environment from Cloud Foundry, defaulting to local VCAP
const appEnv = cfenv.getAppEnv({ vcap: vcapLocal });
const services = appEnv.services;

// /////// GET MONGO CREDENTIALS ///////////

// The services object is a map named by service so we extract the one for MongoDB
const mongodbServices = services['insurance-bot-db'] || services['compose-for-mongodb'];

let mongoCredentials, mongoOptions;

if (!util.isUndefined(mongodbServices)) {
  // We now take the first bound MongoDB service and extract it's credentials object
  mongoCredentials = mongodbServices[0].credentials;
  console.log('mongoCredentials: ', mongoCredentials);
  const ca = [new Buffer(mongoCredentials.ca_certificate_base64, 'base64')];

  mongoOptions = {
    mongos: {
      ssl: true,
      sslValidate: true,
      sslCA: ca,
      poolSize: 1,
      reconnectTries: 1,
    },
  };
}
// /////// GET WATSON TONE ANALYZER CREDENTIALS///////////
let toneAnalyzer;

// The services object is a map named by service so we extract the one for MongoDB
const watsonServices = services.tone_analyzer;

if (!util.isUndefined(watsonServices)) {
  // We now take the first bound service and extract it's credentials object
  const watsonCredentials = watsonServices[0].credentials;

  const watsonOptions = {
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/',
    username: watsonCredentials.username,
    password: watsonCredentials.password,
    version_date: '2016-05-19',
    version: 'v3',
  };
  // Create the service wrapper
  toneAnalyzer = watson.tone_analyzer(watsonOptions);
}

const processTone = (text) => new Promise(resolve => {
  console.log(`processTone: ${text}`);
  toneAnalyzer.tone({ text }, (err, data) => {
    if (err) {
      console.log('err :', err);
      resolve([]);
      return;
    }

    const tones = data.document_tone.tone_categories[0].tones;
    console.log('Watson tone result :', tones);
    const tonesFiltered = tones.filter((tone) => {
      return tone.tone_id !== 'disgust' && tone.tone_id !== 'fear';
    });
    resolve(tonesFiltered);
  });
});

const getAllLogs = function *() {
  if (util.isUndefined(mongoCredentials)) {
    this.body = [];
    console.log('ERROR: mongoCredentials = null');
    return;
  }
  const db = yield MongoClient.connect(mongoCredentials.uri, mongoOptions);
  const collection = db.collection('logs');
  const docs = yield collection.find({}).toArray();

  docs.sort((a, b) => new Date(b.date) - new Date(a.date));
  this.body = docs;
  db.close();
};

const deleteLog = function *(conversationID) {
  console.log("Deleting " + conversationID );
  const db = yield MongoClient.connect(mongoCredentials.uri, mongoOptions);
  const collection = db.collection('logs');
  const r = yield collection.deleteOne({ conversation: conversationID });
  this.body = {'Deleted': r.deletedCount};
  db.close();
};
const deleteAllLogs = function *() {
  const db = yield MongoClient.connect(mongoCredentials.uri, mongoOptions);
  const collection = db.collection('logs');
  const r = yield collection.deleteMany({});

  this.body = {'Deleted': r.deletedCount};
  db.close();
};

const tone = function *(conversationID) {
  this.body = {};
  if (!toneAnalyzer) {
    console.log('Tone Analyzer not configured!!');
    return;
  }
  // Find the conversation in the log
  try {
    const db = yield MongoClient.connect(mongoCredentials.uri, mongoOptions);
    const collection = db.collection('logs');
    console.log('Looking doc with conversationID: ', conversationID);
    const docs = yield collection.find({ conversation: conversationID }).limit(1).toArray();
    if(!docs || !docs.length) {
      console.error("Can't find that doc in the DB");
      return;
    }
    console.log('Found doc.conversationID : ', docs[0].conversation);
    const logs = docs[0].logs;
    // Tone has already been processed for this chat.
    // && If processed messages equals the total messages.
    if (docs[0].tone && docs[0].tone.toneHistory.length == docs[0].logs.length) {
      this.body = docs[0].tone;
      return;
    }
    const tone = {};
    const toneHistory = [];
    let toneSummary = [];
    let text = '';
    // logs is an array of log. each log has inputText
    // process each inputText
    let i = 1;
    for (const log of logs) {
      // TODO: make this run in parallel, not synchornous.
      text = `${text}. ${log.inputText}`;
      const logTone = yield processTone(text);
      const logToneFormatted = { name: i };
      // We want logToneFormatted to look like { name: '1', joy: 0.27, frustration: 0.80, sadness: 0.70 },
      for (const tone of logTone) {
        logToneFormatted[tone.tone_id] = tone.score;
      }
      toneHistory.push(logToneFormatted);
      toneSummary = logTone;
      i++;
    }
    tone.toneSummary = toneSummary;
    tone.toneHistory = toneHistory;
    this.body = tone;
    // save the result for future. Don't need to yield for this.
    collection.updateOne({ conversation: conversationID }, { $set: { tone } });
  }
  catch (e) {
    console.log('Error while processing tone', e);
    this.body = {};
  }
};


const calls = {
  getAllLogs,
  deleteLog,
  deleteAllLogs,
  tone,
};

export default calls;
