const express = require('express');
const path = require('path');
const app = express();
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function () {
    app.use(allowCrossDomain);
})

app.use(express.static(__dirname + '/dist/top-ten-news'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/top-ten-news/index.html'));
});

app.listen(process.env.PORT || 8080);
