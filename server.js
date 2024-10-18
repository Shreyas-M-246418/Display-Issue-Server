//server.js
/* Base class
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// GitHub Personal Access Token
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// CORS configuration
const corsOptions = {
  origin: ['https://github-login-three.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Pre-flight requests
app.options('*', cors(corsOptions));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// GitHub OAuth route
app.post('/api/auth/github', async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Authorization code is required' });
  }

  try {
    console.log('Exchanging code for token...');
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: { Accept: 'application/json' },
    });

    console.log('Token exchange response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/auth/github:', error.response ? error.response.data : error.message);
    next(error);
  }
});

// GitHub API proxy routes
app.get('/api/github/issues', async (req, res, next) => {
  const { owner, repo } = req.query;
  
  if (!owner || !repo) {
    return res.status(400).json({ message: 'Owner and repo are required parameters' });
  }

  try {
    console.log(`Fetching issues for ${owner}/${repo}`);
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'YourAppName',
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });
    console.log('GitHub API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/github/issues GET:', error.response ? error.response.data : error.message);
    next(error);
  }
});

app.post('/api/github/issues', async (req, res, next) => {
  const { owner, repo, title, body } = req.body;

  if (!owner || !repo || !title || !body) {
    return res.status(400).json({ message: 'Owner, repo, title, and body are required' });
  }

  try {
    console.log(`Creating issue for ${owner}/${repo}`);
    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { title, body },
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'YourAppName'
        },
      }
    );
    console.log('Issue created:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/github/issues POST:', error.response ? error.response.data : error.message);
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Environment variables:');
  console.log('GITHUB_TOKEN:', GITHUB_TOKEN ? 'Set' : 'Not set');
  console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? 'Set' : 'Not set');
  console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? 'Set' : 'Not set');
});
*/


/*
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// GitHub Personal Access Token
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// CORS configuration
const corsOptions = {
  origin: ['https://github-login-three.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Pre-flight requests
app.options('*', cors(corsOptions));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// GitHub OAuth route
app.post('/api/auth/github', async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    console.log('No authorization code provided');
    return res.status(400).json({ message: 'Authorization code is required' });
  }

  try {
    console.log('Exchanging code for token...');
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: { Accept: 'application/json' },
    });

    console.log('Token exchange response:', response.data);
    
    if (response.data.error) {
      console.error('Error from GitHub:', response.data.error);
      return res.status(400).json({ message: 'Failed to exchange code for token', error: response.data.error });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/auth/github:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to exchange code for token', error: error.message });
  }
});

// Job ID counter (This should ideally be stored in a database)
let jobIdCounter = 0;

// GitHub API proxy routes
app.get('/api/github/issues', async (req, res, next) => {
  const { owner, repo } = req.query;
  
  if (!owner || !repo) {
    return res.status(400).json({ message: 'Owner and repo are required parameters' });
  }

  try {
    console.log(`Fetching issues for ${owner}/${repo}`);
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'YourAppName',
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });
    console.log('GitHub API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/github/issues GET:', error.response ? error.response.data : error.message);
    next(error);
  }
});

app.post('/api/github/issues', async (req, res, next) => {
  const { owner, repo, jobTitle, companyName, workLocation, workDescription } = req.body;

  if (!owner || !repo || !jobTitle || !companyName || !workLocation || !workDescription) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  jobIdCounter++;
  const issueTitle = `Job ID: ${jobIdCounter}`;
  const issueBody = `
Job Title: ${jobTitle}
Company: ${companyName}
Location: ${workLocation}

Description:
${workDescription}
  `.trim();

  try {
    console.log(`Creating job posting for ${owner}/${repo}`);
    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { title: issueTitle, body: issueBody },
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'YourAppName'
        },
      }
    );
    console.log('Job posting created:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/github/issues POST:', error.response ? error.response.data : error.message);
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Environment variables:');
  console.log('GITHUB_TOKEN:', GITHUB_TOKEN ? 'Set' : 'Not set');
  console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? 'Set' : 'Not set');
  console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? 'Set' : 'Not set');
});
*/

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// GitHub Personal Access Token
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// CORS configuration
const corsOptions = {
  origin: ['https://github-login-three.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Pre-flight requests
app.options('*', cors(corsOptions));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// GitHub OAuth route
app.post('/api/auth/github', async (req, res, next) => {
  // ... (keep the existing OAuth logic)
});

// Job ID counter (This should ideally be stored in a database)
let jobIdCounter = 0;

// GitHub API proxy routes
app.get('/api/github/issues', async (req, res, next) => {
  const { owner, repo } = req.query;
  
  if (!owner || !repo) {
    return res.status(400).json({ message: 'Owner and repo are required parameters' });
  }

  try {
    console.log(`Fetching issues for ${owner}/${repo}`);
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'YourAppName',
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });
    console.log('GitHub API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/github/issues GET:', error.response ? error.response.data : error.message);
    next(error);
  }
});

app.post('/api/github/issues', async (req, res, next) => {
  const { owner, repo, jobTitle, companyName, workLocation, workDescription } = req.body;

  if (!owner || !repo || !jobTitle || !companyName || !workLocation || !workDescription) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  jobIdCounter++;
  const issueTitle = `Job Posting #${jobIdCounter}`;
  const issueBody = `
Job Title: ${jobTitle}
Company: ${companyName}
Location: ${workLocation}
Description: ${workDescription}
  `.trim();

  try {
    console.log(`Creating job posting for ${owner}/${repo}`);
    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { title: issueTitle, body: issueBody },
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'YourAppName'
        },
      }
    );
    console.log('Job posting created:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/github/issues POST:', error.response ? error.response.data : error.message);
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Environment variables:');
  console.log('GITHUB_TOKEN:', GITHUB_TOKEN ? 'Set' : 'Not set');
  console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? 'Set' : 'Not set');
  console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? 'Set' : 'Not set');
});