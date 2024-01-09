// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 5000; // You can use any port you prefer

// Define a path for your API
const apiPath = '/api';

// Create a proxy for the target server
const apiProxy = createProxyMiddleware(apiPath, {
    target: 'http://172.30.30.122:1010', // Replace with your target server URL
    changeOrigin: true,
});

// Use the proxy middleware
app.use(apiPath, apiProxy);

// Serve static files (if needed)
app.use(express.static('build')); // Replace 'build' with your build directory name

// Redirect all other requests to your React app
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'build' }); // Replace 'build' with your build directory name
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
