const express = require('express');
const lodash = require('lodash');
const moment = require('moment');
// request is deprecated - using axios instead
const axios = require('axios');

const app = express();

// Secure endpoint - no eval
app.get('/secure-data', (req, res) => {
  // Input validation - no eval or dangerous operations
  const { query } = req.query;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query' });
  }
  // Safe operation
  res.json({ query: query.substring(0, 100) });
});

// Secure endpoint - environment variable, no hardcoding
app.get('/data', async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }
    const response = await axios.get('https://api.example.com/data', {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(3000, () => {
  console.log('Secure app listening on port 3000');
});
