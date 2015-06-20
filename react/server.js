var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var DATA_FILE_NAME = 'data.json';

app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var store = (function(dataFileName) {
  var dataFilePath = path.join(__dirname, dataFileName);
  var read = function() {
    return JSON.parse(fs.readFileSync(dataFilePath));
  }
  var write = function(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
  }
  var get = read;
  var add = function(newRecord) {
    var data = read();
    if (!data.index[newRecord.oid]) {
      data.records.push(newRecord);
      data.index[newRecord.oid] = true;
      write(data);
    }
    return data;
  }
  return {add: add, get: get};
})(DATA_FILE_NAME);

var sendAsJson = function(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
}

app.get('/favorites', function(req, res){
  var data = store.get();
  sendAsJson(res, data.records);
});

app.post('/favorites', function(req, res){
  if (!req.body.name || !req.body.oid) {
    res.status(400).send({error: "JSON not formed properly"});
    return;
  }
  var data = store.add(req.body);
  sendAsJson(res, data.records);
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});