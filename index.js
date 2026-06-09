const express = require('express');
const lodash = require('lodash');
const moment = require('moment');
const request = require('request');

const app = express();

// Vulnerable endpoint - uses eval (security issue)
app.get('/eval', (req, res) => {
  const code = req.query.code;
  eval(code);
  res.send('Evaluated');
});

// Vulnerable endpoint - hardcoded credentials
const API_KEY = 'hardcoded-api-key-12345';

app.get('/data', (req, res) => {
  request('https://api.example.com/data?key=' + API_KEY, (error, response, body) => {
    res.send(body);
  });
});

app.listen(3000, () => {
  console.log('Vulnerable app listening on port 3000');
});
