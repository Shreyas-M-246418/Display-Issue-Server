/*
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: { Accept: 'application/json' },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error exchanging code for token', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/


/*
//server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'https://github-login-three.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.options('*', cors()); // Enable pre-flight requests for all routes

app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: "Ov23li2EE68XAUxEK2Vm",
      client_secret: "e5a0837ccd64f5a2322b7fddddff225438b82847",
      code,
    }, {
      headers: { Accept: 'application/json' },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error exchanging code for token', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/

/*
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://github-login-three.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.options('*', cors());

app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: "Ov23li2EE68XAUxEK2Vm",
      client_secret: "e5a0837ccd64f5a2322b7fddddff225438b82847",
      code,
    }, {
      headers: { Accept: 'application/json' },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error exchanging code for token', error: error.message });
  }
});

app.get('/api/github/issues', async (req, res) => {
  const { owner, repo } = req.query;
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues', error: error.message });
  }
});

app.post('/api/github/issues', async (req, res) => {
  const { owner, repo, title, body } = req.body;
  const token = req.headers.authorization;

  try {
    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { title, body },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating issue', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

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

// GitHub OAuth route
app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: "Ov23li2EE68XAUxEK2Vm",
      client_secret: "e5a0837ccd64f5a2322b7fddddff225438b82847",
      code,
    }, {
      headers: { Accept: 'application/json' },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/auth/github:', error);
    res.status(500).json({ message: 'Error exchanging code for token', error: error.response ? error.response.data : error.message });
  }
});

// GitHub API proxy routes
app.get('/api/github/issues', async (req, res) => {
  const { owner, repo } = req.query;
  try {
    console.log(`Fetching issues for ${owner}/${repo}`);
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'YourAppName'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/github/issues GET:', error);
    res.status(500).json({ message: 'Error fetching issues', error: error.response ? error.response.data : error.message });
  }
});

app.post('/api/github/issues', async (req, res) => {
  const { owner, repo, title, body } = req.body;
  const token = req.headers.authorization;

  try {
    console.log(`Creating issue for ${owner}/${repo}`);
    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { title, body },
      {
        headers: {
          'Authorization': token,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'YourAppName'
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/github/issues POST:', error);
    res.status(500).json({ message: 'Error creating issue', error: error.response ? error.response.data : error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});