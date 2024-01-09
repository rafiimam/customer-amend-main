

// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://172.30.202.18:9430',
            changeOrigin: true,
            secure: false,
            onProxyRes: function (proxyRes, req, res) {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';}
        })
    );
    app.use(
        '/AmendCustomer',  // Adjust the proxy path based on your needs
        createProxyMiddleware({
            target: 'https://172.28.201.5:9430',
            changeOrigin: true,
            secure: false,
            onProxyRes: function (proxyRes, req, res) {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';}
        })
    );
    app.use(
        createProxyMiddleware('/v7', {
            target: 'http://172.30.30.122:1010',
            changeOrigin: true,
            secure: false,
            onProxyRes: function (proxyRes, req, res) {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            },
        })
    );
};
