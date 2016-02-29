'use strict';

var mongoose = require('mongoose');
var db = process.env.MONGOLAB_URI || 'mongodb://localhost/testdmsapi';
var port = process.env.PORT || '7000';
mongoose.connect(db);
var app = require('./config/express')();

app.listen(port, function(err) {
  if(err) {
    throw err;
  }
  console.log('Server started on port: ' + port);
  console.log('mongo connection: ' + db);
});

module.exports = app;