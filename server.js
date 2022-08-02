const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
app.all('*', function(req, res, next) {
    const origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static(__dirname + '/dist/top-ten-news'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/top-ten-news/index.html'));
});

app.listen(process.env.PORT || 8080);
