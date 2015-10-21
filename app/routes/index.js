'use strict';

var userRoute = require('./user.route');
var documentRoute = require('./document.route');

module.exports = function(app) {
  userRoute(app);
  documentRoute(app);
};