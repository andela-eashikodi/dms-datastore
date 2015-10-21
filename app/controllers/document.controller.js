'use strict';

require('../models/document.schema');
var mongoose = require('mongoose');
var Document = mongoose.model('Document');
var DocumentController = function() {};

DocumentController.prototype.createDocument = function(req, res) {
  req.body.ownerId = req.decoded._id;
  Document.findOne({title: req.body.title}, function(err, doc) {
    if (doc) {
      res.status(401).json({
        sucess: false,
        message: 'Document with this title exists'
      });
    }
    else {
      Document.create(req.body, function(err, doc) {
        if (err) {
          return res.json(err);
        }
        return res.json(doc);
      });
    }
  });
};

DocumentController.prototype.getAllDocuments = function(req, res) {
  Document.find({}).populate('ownerId').exec(function(err, docs) {
    if (err) {
      return res.json(err);
    }
    return res.json(docs);
  });
};

DocumentController.prototype.findDocument = function(req, res) {
  Document.findById(req.params.id, function(err, doc) {
    if (err) {
      res.send(err);
    }
    res.json(doc);
  });
};

DocumentController.prototype.updateDocument = function(req, res) {
  Document.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, doc) {
    if (err) {
      return res.status(401).json(err);
    }
    res.json(doc);
  });
};

DocumentController.prototype.deleteDocument = function(req, res) {
  Document.findByIdAndRemove({_id: req.params.id}, function(err, doc) {
    if (err) {
      return res.json(err);
    }
    DocumentController.prototype.findDocument(req, res);
  });
};

module.exports = DocumentController;