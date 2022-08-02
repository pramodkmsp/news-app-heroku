const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
var whitelist = ['https://newsapi.org/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(express.static(__dirname + '/dist/top-ten-news'));
app.get('/*', cors(corsOptionsDelegate), function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/top-ten-news/index.html'));
});

app.listen(process.env.PORT || 8080);
