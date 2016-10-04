// MAKES THE CONNECTION TO THE DB AND RETREIVES ALL DATA ONLY ON SERVER START
// RETURNS ONLY LOGS THAT CONTAIN MORE THAN 3 ENTRIES IN THE CONVERSATION
// TODO: Get new data on every request.
//
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

const logs = [];
const url = config.globals.__MONGODB_URL__;

const findDocuments = (db, callback) => {
  const collection = db.collection('logs');

  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
};

// FOR NOW: We only want logs that have more than 3 entries in the conversation
// because we don't want all the logs.
// TODO: Need better way to filter out bad entries. Probably should be by time.
const findGoodLogs = (logsFromDB) => {
  logsFromDB.forEach((log) => {
    if (log.logs.length > 2) {
      logs.push(log);
    }
  });
};


MongoClient.connect(url, (err, db) => {
  console.log(`Attemping to connect to ${url}`);
  assert.equal(null, err);
  console.log('Connected successfully!');
  findDocuments(db, findGoodLogs);
  db.close();
});

const getAllLogs = function *() {
  this.body = logs;
};

export default getAllLogs;
