var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/favorites', function(req, res){
  var data = fs.readFileSync(path.join (__dirname, 'data.json'));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/favorites', function(req, res){
  if (!req.body.name || !req.body.oid) {
    res.status(400).send({error: "JSON not formed properly"});
    return;
  }
  var dataFilePath = path.join(__dirname, 'data.json');
  var data = JSON.parse(fs.readFileSync(dataFilePath));
  data.push(req.body);
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});