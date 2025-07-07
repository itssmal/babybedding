const app = require('./app')
const fs = require("fs")
const http = require('http');
const https = require('https');

const mode = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 5001

if (mode === 'development') {
    app.listen(port, () => console.log('Server dev is ready'))
    return;
}

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/babybedding.store/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/babybedding.store/fullchain.pem'),
};

http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(80, () => console.log('HTTP server running on port 80 (redirecting to HTTPS)'));
const httpsServer = https.createServer(options, app);

httpsServer.listen(port, () => console.log(`Server started at ${port}`))
