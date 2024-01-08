const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Set up a proxy for the target server
app.use(
    '/Playground/v7/Customer/EnquireCustomer',
    createProxyMiddleware({
        target: 'http://172.30.30.119:7788',
        changeOrigin: true,
    })
);

// Start the server on port 3001
const port = 3001;
app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
