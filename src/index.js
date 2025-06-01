/**
 * Basic Express app skeleton to serve as Firebase Cloud Function.
 */
const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('MyRide backend running');
});

exports.api = functions.https.onRequest(app);
