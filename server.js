'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdmsapi');
var app = require('./config/express')();

app.listen('7000', function(err) {
  if(err) {
    throw err;
  }
  console.log('Server started on port 7000');
});

module.exports = app;