var fs = require('fs');
var path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/foo', {useNewUrlParser: true, useUnifiedTopology: true});

var models = {};

let dir = path.join(__dirname, '..', 'model');

fs.readdirSync(dir).forEach(function(name){
  let file = path.join(dir, name);
  let obj = require(file);
  for (var key in obj){
    models[key] = mongoose.model(key,obj[key]);
  }
});

module.exports = models;