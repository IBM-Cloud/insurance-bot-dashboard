// MAKES THE CONNECTION TO THE DB AND RETREIVES ALL DATA ONLY ON SERVER START
// RETURNS ONLY LOGS THAT CONTAIN MORE THAN 3 ENTRIES IN THE CONVERSATION
// TODO: Get new data on every request.
//
import { MongoClient } from 'mongodb';
import assert from 'assert';
import cfenv from 'cfenv';
import util from 'util';

// This is a global variable we'll use for handing the MongoDB client around
let mongodb;

const logs = [];

const findDocuments = (db, callback) => {
  const collection = db.collection('logs');

  collection.find({}).toArray((err, docs) => {
    console.log("Found " + docs.length + " docs");
    assert.equal(err, null);
    callback(docs);
  });
};


// TODO: Need better way to filter out bad entries. Probably should be by time.
const findGoodLogs = (logsFromDB) => {
  logsFromDB.forEach((log) => {
      logs.push(log);
  });
};


  // configuration ===============================================================
  // load local VCAP configuration
  var vcapLocal = null
  try {
    vcapLocal = require("../vcap-local.json");
    console.log("Loaded local VCAP", vcapLocal);
  } catch (e) {
    console.log("No Local vcap-local.json file found");
  }

  // get the app environment from Cloud Foundry, defaulting to local VCAP
  var appEnvOpts = vcapLocal ? {
    vcap: vcapLocal
  } : {}

  const appEnv = cfenv.getAppEnv(appEnvOpts);

  // Within the application environment (appenv) there's a services object
  const services = appEnv.services;

  // The services object is a map named by service so we extract the one for MongoDB
  const mongodb_services = services['insurance-bot-db'] || services['compose-for-mongodb'];

  // This check ensures there is a services for MongoDB databases
  assert(!util.isUndefined(mongodb_services), "Must be bound to compose-for-mongodb services");

  // We now take the first bound MongoDB service and extract it's credentials object
  const credentials = mongodb_services[0].credentials;

  const ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];

  MongoClient.connect(credentials.uri, {
    mongos: {
      ssl: true,
      sslValidate: true,
      sslCA: ca,
      poolSize: 1,
      reconnectTries: 1,
    },
  },
     (err, db) => {
       if (err) {
         console.log(err);
       } else {
         // Although we have a connection, it's to the "admin" database
         // of MongoDB deployment.
         //mongodb = db.db('insurance');
         mongodb = db;
         if(mongodb) console.log("Successfully connected to mongodb instance.")
         findDocuments(mongodb, findGoodLogs);
       }
     }
  );

const getAllLogs = function *() {
  this.body = logs;
};

export default getAllLogs;
