

// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://172.30.202.18:9430',
            changeOrigin: true,
            secure: false,
        })
    );
    app.use(
        '/AmendCustomer',  // Adjust the proxy path based on your needs
        createProxyMiddleware({
            target: 'https://172.28.201.5:9430',
            changeOrigin: true,
            secure: false,
        })
    )
};
