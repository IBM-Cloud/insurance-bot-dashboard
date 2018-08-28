import assert from 'assert';
import cfenv from 'cfenv';
import util from 'util';
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3';
import async from 'async';

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

// initialize Cloudant
const cloudantURL = appEnv.services.cloudantNoSQLDB[0].credentials.url || appEnv.getServiceCreds("insurance-bot-db").url;
const Cloudant = require('@cloudant/cloudant')({
  url: cloudantURL,
  plugin: 'retry',
  retryAttempts: 10,
  retryTimeout: 500
});
// Create the logs if it doesn't exist
var dbname = 'logs';
async.waterfall([
  // create database
  (callback) => {
    Cloudant.db.create(dbname, function(err, body) {
      if (err) {
        console.log('Database already exists:', dbname);
      } else {
        console.log('New database created:', dbname);
      }
      callback(null);
    });
  },
  // try to inject sample logs
  (callback) => {
    const sampleDocs = {
      docs: require('./samplelogs.json')
    };
    console.log('Injecting', sampleDocs.docs.length, 'documents');
    Cloudant.db.use(dbname).bulk(sampleDocs, (err, body) => {
        callback(err, body);
    });
  },
], (err) => {
  if (err) {
    console.log('[KO]', err);
  } else {
    console.log('[OK] Database initialized');
  }
});

const Logs = Cloudant.db.use(dbname);

// /////// GET WATSON TONE ANALYZER CREDENTIALS///////////
let toneAnalyzer;

const watsonServices = services.tone_analyzer;

if (!util.isUndefined(watsonServices)) {
  // We now take the first bound service and extract it's credentials object
  const watsonCredentials = watsonServices[0].credentials;

  const watsonOptions = {
    // For the url to be region-agnostic
    url: watsonCredentials.url,
    username: watsonCredentials.username,
    password: watsonCredentials.password,
    iam_apikey: watsonCredentials.apikey,
    version_date: '2017-09-21',
    version: 'v3',
  };
  // Create the service wrapper
  toneAnalyzer = new ToneAnalyzerV3(watsonOptions);
}

const processTone = (text) => new Promise(resolve => {
  console.log(`processTone: ${text}`);
  toneAnalyzer.tone({ text }, (err, data) => {
    if (err) {
      console.log('err :', err);
      resolve([]);
      return;
    }

    const tones = data.document_tone.tones ;
    //Required as tones is read-only
    const tonesSorted = tones.sort((a,b)=> {return a.score - b.score}).reverse();
    const tonesSelected =  tonesSorted.length > 3 ? tonesSorted.slice(0,3) : tonesSorted;
    resolve(tonesSelected);
  });
});

const getAllLogs = function *() {
  const list = new Promise((resolve, reject) => {
    Logs.list({ include_docs: true }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  const docs = (yield list).rows.map(doc => doc.doc);
  docs.sort((a, b) => new Date(b.date) - new Date(a.date));
  this.body = docs;
};

const deleteLog = function *(conversationID) {
  console.log("Deleting " + conversationID );
  const destroy = new Promise((resolve, reject) => {
    Logs.find({
      selector: {
        'conversation': conversationID
      }
    }, (err, result) => {
      console.log(result);
      if (err) {
        reject(err);
      } else if (result.docs.length == 0) {
        reject("not found");
      } else {
        Logs.destroy(result.docs[0]._id, result.docs[0]._rev, (destroyErr, destroyBody) => {
          if (destroyErr) {
            reject(destroyErr);
          } else {
            resolve(destroyBody);
          }
        });
      }
    });
  });
  const r = yield destroy;
  this.body = {'Deleted': 1};
};

const deleteAllLogs = function *() {
  const deleteAll = new Promise((resolve, reject) => {
    Logs.list((err, result) => {
      if (err) {
        reject(err);
      } else {
        Logs.bulk({
          docs: result.rows.map((doc) => {
            return {
              _id: doc.id,
              _rev: doc.rev,
              _deleted: true
            };
          })
        }, (bulkErr, bulkResult) => {
          if (bulkErr) {
            reject(bulkErr);
          } else {
            resolve({ 'Deleted': result.rows.length });
          }
        });
      }
    });
  });
  this.body = yield deleteAll;
};

const tone = function *(conversationID) {
  this.body = {};
  if (!toneAnalyzer) {
    console.log('Tone Analyzer not configured!!');
    return;
  }
  // Find the conversation in the log
  try {
    const findConversations = new Promise((resolve, reject) => {
      Logs.find({
        selector: {
          'conversation': conversationID
        }
      }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.docs);
        }
      });
    });
    console.log('Looking doc with conversationID: ', conversationID);
    const docs = yield findConversations;
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

    docs[0].tone = tone;
    Logs.insert(docs[0], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Updated tone');
      }
    });
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
