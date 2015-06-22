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
  };
  var write = function(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
  };
  var init = function() {
    write({
      records: [],
      index: {}
    });
  };
  var get = read;
  var add = function(newRecord) {
    var data = read();
    if (!data.index[newRecord.imdbID]) {
      data.records.push(newRecord);
      data.index[newRecord.imdbID] = newRecord;
      write(data);
    }
    return data;
  };
  var del = function(id) {
    var data = read();
    if (data.index[id]) {
      delete data.index[id];
      for (var i = 0; i < data.records.length; i++) {
        if (data.records[i].imdbID === id) {
          data.records.splice(i, 1);
          write(data);
          break;
        }
      }
    }
    return data;
  };
  return {init: init, add: add, get: get, delete: del};
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
  if (!req.body.title || !req.body.imdbID) {
    res.status(400).send({error: "JSON not formed properly"});
    return;
  }
  var data = store.add(req.body);
  sendAsJson(res, data.records);
});

app.delete('/favorites/:id', function(req, res){
  var data = store.delete(req.params.id);
  sendAsJson(res, data.records);
});

store.init();

app.listen(3000, function(){
  console.log("Listening on port 3000");
});