const app = require('./app')
const fs = require("fs")
const https = require('https');

const port = process.env.PORT || 5000
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/babybedding.store/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/babybedding.store/fullchain.pem'),
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(port, () => console.log(`Server started at ${port}`))
