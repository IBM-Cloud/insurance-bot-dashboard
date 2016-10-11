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
  console.log("mongoCredentials: ", mongoCredentials);
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
  toneAnalyzer.tone({ text: text }, (err, data) => {
    if (err) {
      console.log('err :', err);
      resolve([])
      return;
    }

    const tones = data.document_tone.tone_categories[0].tones;
    console.log('Watson tone result :', tones);
    const tonesFiltered = tones.filter(function(tone) {
        return tone.tone_id !== "disgust" && tone.tone_id !== "fear"
    });
    resolve(tonesFiltered);
  });
});

const getAllLogs = function *() {
  if (util.isUndefined(mongoCredentials)) {
    this.body = [];
    console.log("ERROR: mongoCredentials = null");
    return;
  }
  const db = yield MongoClient.connect(mongoCredentials.uri, mongoOptions);
  const collection = db.collection('logs');
  const docs = yield collection.find({}).toArray();

  docs.sort((a, b) => new Date(b.date) - new Date(a.date));
  this.body = docs;
  db.close();
};

const deleteAllLogs = function *() {
  const db = yield MongoClient.connect(mongoCredentials.uri, mongoOptions);
  const collection = db.collection('logs');
  const r = yield collection.deleteMany({});

  this.body = `Deleted ${r.deletedCount}`;
  db.close();
};

const tone = function *(conversationID) {
  if (!toneAnalyzer) {
    this.body = [];
    console.log("Tone Analyzer not configured!!");
    return;
  }
  //Find the conversation in the log
  try{
    const db = yield MongoClient.connect(mongoCredentials.uri, mongoOptions);
    const collection = db.collection('logs');
    const docs = yield collection.find({'conversation' : conversationID}).limit(1).toArray();
    console.log("Found doc. _id : ", docs[0]._id);
    const logs = docs[0].logs;
    //Concact all the input text.
    const text = logs.reduce((final, log) => `${final} ${log.inputText}. `, '');
    console.log("Analyzing text: " + text);
    this.body = yield processTone(text);
  }
  catch (e) {
      console.log("Error while processing tone");
      this.body = [];
  }

  };


const calls = {
  getAllLogs,
  deleteAllLogs,
  tone,
};

export default calls;
