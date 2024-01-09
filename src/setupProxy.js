{/**

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
        '/AmendCustomer',  
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
*/}

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_ENQUIRE_CUSTOMER_API_URL,
            changeOrigin: true,
            secure: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Credentials': true,
            },
        })
    );

    app.use(
        '/AmendCustomer',
        createProxyMiddleware({
            target: process.env.REACT_APP_AMEND_CUSTOMER_API_URL,
            changeOrigin: true,
            secure: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Credentials': true,
            },
        })
    );

    app.use(
        createProxyMiddleware('/v7', {
            target: process.env.REACT_APP_TOKEN_API_URL,
            changeOrigin: true,
            secure: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Credentials': true,
            },
        })
    );
};
