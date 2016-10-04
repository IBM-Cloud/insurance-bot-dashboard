// MAKES THE CONNECTION TO THE DB AND RETREIVES ALL DATA ONLY ON SERVER START
// RETURNS ONLY LOGS THAT CONTAIN MORE THAN 3 ENTRIES IN THE CONVERSATION
// TODO: Get new data on every request.
//
import config from '../config';

var logs = [];
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = config.globals.__MONGODB_URL__;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log("Attemping to connect to " + url);
  assert.equal(null, err);
  console.log("Connected successfully!");
  findDocuments(db, findGoodLogs)
  db.close();
});

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('logs');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

//FOR NOW: We only want logs that have more than 3 entries in the conversation
//because we don't want all the logs.
//TODO: Need better way to filter out bad entries. Probably should be by time.
var findGoodLogs = function(logsFromDB){
  logsFromDB.forEach(function (log) {
    if(log.logs.length > 2){logs.push(log);}
  });
}

var getAllLogs = function *(){
  this.body = logs;
}

export default getAllLogs;
