'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var app = express();
var session = require('client-sessions');
var path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports = function() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));  
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(methodOverride());
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, Accept, Content-Type, Access-Control-Allow-Headers, x_access_admin, Authorization, X-Requested-With");
    res.header('Access-Control-Allow-Methods', "POST, PUT, DELETE, GET");
    next();
  });
  app.use(session({
    cookieName: 'session',
    secret: 'int30r9338;..;safe',
    duration: 30 * 60 * 1000, //how long the session will live in milliseconds
    activeDuration: 5 * 60 * 1000, //allows users to lengthen their session by interacting with the site
  }));
  app.use(express.static(path.join(appDir + '/public')));
  app.get('/', function(req, res) {
    res.sendFile(appDir + '/public/index.html');
  });

  require('../app/routes/index')(app);
  return app;
};