const app = require('./app')
const fs = require("fs")
const http = require('http');
const https = require('https');

const port = process.env.PORT || 5001

app.listen(port, () => {console.log('there')})
// const options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/babybedding.store/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/babybedding.store/fullchain.pem'),
// };
//
// http.createServer((req, res) => {
//     res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
//     res.end();
// }).listen(80, () => console.log('HTTP server running on port 80 (redirecting to HTTPS)'));
// const httpsServer = https.createServer(options, app);
//
// httpsServer.listen(port, () => console.log(`Server started at ${port}`))
