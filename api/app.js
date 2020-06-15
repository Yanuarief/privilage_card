var fs = require('fs');
var http = require('http');
var https = require('https');
var cors = require('cors');
var multer  = require('multer');
var upload = multer();
var path = require('path');
var fs = require('fs-extra');
var path = require('path');
/* var privateKey  = fs.readFileSync('/etc/letsencrypt/live/restcore.xyz/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/restcore.xyz/cert.pem', 'utf8'); */

/*var credentials = {key: privateKey, cert: certificate};*/
var express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    controller = require('./controller'),
    bb = require('express-busboy');
bb.extend(app,{
	upload: true
});

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app,upload);

app.listen(port)

/*var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(1000);
httpsServer.listen(1001);
console.log('Ready On http : 1000 !');*/