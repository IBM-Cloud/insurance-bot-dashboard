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

// This check ensures there is a services for MongoDB databases
assert(!util.isUndefined(mongodbServices), 'Must be bound to compose-for-mongodb services');

// We now take the first bound MongoDB service and extract it's credentials object
const mongoCredentials = mongodbServices[0].credentials;

const ca = [new Buffer(mongoCredentials.ca_certificate_base64, 'base64')];

const mongoOptions = {
  mongos: {
    ssl: true,
    sslValidate: true,
    sslCA: ca,
    poolSize: 1,
    reconnectTries: 1,
  },
};
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

const processTone = () => new Promise(resolve => {
  toneAnalyzer.tone({ text: 'Greetings from Watson Developer Cloud!' }, (err, data) => {
    if (err) console.log('err :', err);
    console.log('data :', data);
    resolve(data.document_tone.tone_categories[0].tones);
  });
});

const getAllLogs = function *() {
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

const tone = function *() {
  if (!toneAnalyzer) {
    this.body = 'Tone Analyzer not configured!!';
    return;
  }

  this.body = yield processTone();
};


const calls = {
  getAllLogs,
  deleteAllLogs,
  tone,
};

export default calls;
