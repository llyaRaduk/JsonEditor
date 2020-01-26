const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function (req, res) {
  res.send('dasdasdasdad');
});

app.post('/parser', function (req, res) {
  fs.writeFileSync('./server/users.json', JSON.stringify(req.body))
  res.send(JSON.stringify('OK'))
});

app.get('/parser', function (req, res) {
  let data = fs.readFileSync('./server/users.json')
  res.send(data);
});

app.listen(2000);
