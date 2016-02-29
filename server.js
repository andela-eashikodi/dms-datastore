'use strict';

var mongoose = require('mongoose');
var db = process.env.MONGOLAB_URI || 'mongodb://localhost/testdmsapi';
mongoose.connect(db);
var app = require('./config/express')();

app.listen('7000', function(err) {
  if(err) {
    throw err;
  }
  console.log('Server started on port 7000');
});

module.exports = app;