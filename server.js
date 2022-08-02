const express = require('express');
const path = require('path');
const app = express();

const allowedOrigins = ['https://newsapi.org/v2/'];

app.use(express.static(__dirname + '/dist/top-ten-news'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/top-ten-news/index.html'));
});
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true) 
      } else {
        callback(new Error(`Origin: ${origin} is now allowed`))
      }
    }
}));
app.listen(process.env.PORT || 8080);
