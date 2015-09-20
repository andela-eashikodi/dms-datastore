var request = require('supertest');
var app = require('../config/express')();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdmsapi');
var User = mongoose.model('User');
var Document = mongoose.model('Document');
var user, userId, doc, documentId, userToken;
describe('Document Manager API', function() {

  describe('User routes', function() {

    beforeEach(function(done) {
      user = new User();
      User.remove({}, function() {
        user.username = 'johnson';
        user.name = { first: 'john', last: 'james'};
        user.email = 'john@gmail.com';
        user.password = 'johnson';
        user.save(function(err, data) {
          userId = data._id;
          done();
        });
      });
    });

    it('should log a user in', function(done) {
      request(app)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'john@gmail.com',
          password: 'johnson'
        })
        .end(function(err, res) {
          expect(res.body).toEqual(jasmine.objectContaining({
            success: true,
            message: 'User login succesful'
          }));
          done();
        });
    });

    it('should log a user out', function(done) {
      request(app)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'john@gmail.com',
          password: 'johnson'
        })
        .end(function(err, res) {
          request(app)
            .post('/users/logout')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
              expect(res.body).toEqual(jasmine.objectContaining({
                success: true,
                message: 'User Logout succesful'
              }));
            });
            done();
        });
    });

    it('should create a new user instance', function(done) {
      request(app)
        .post('/users/')
        .set('Content-Type', 'application/json')
        .send({
          username: 'frank',
          name: { first: 'frank', last: 'niro'},
          email: 'frank@gmail.com',
          password: 'franky'
        })
        .end(function(err, res) {
          expect(res.body).toEqual(jasmine.objectContaining({
            username: 'frank'
          }));
          done();
        });
    });

    it('should find matching instances of user', function(done) {
      request(app)
        .get('/users/')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.body.length).toEqual(1);
          expect(res.body[0]).toEqual(jasmine.objectContaining({
            username: 'johnson'
          }));
          done();
        });
    });

    it('should find a specific user by its id', function(done) {
      request(app)
        .get('/users/' + userId)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.body).toEqual(jasmine.objectContaining({
            username: 'johnson'
          }));
          done();
        });
    });

    it('should update user attributes', function(done) {
      request(app)
        .put('/users/' + userId)
        .send({
          username: 'johnson5'
        })
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.body).toEqual(jasmine.objectContaining({
            username: 'johnson5'
          }));
          done();
        });
    });

    it('should delete specific user instance', function(done) {
      request(app)
        .delete('/users/' + userId)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.body).toBe(null);
          done();
        });
    });

  });

  describe('Document routes', function() {

    beforeEach(function(done) {
      user = new User();
      doc = new Document();
      User.remove({}, function() {
        user.username = 'johnson';
        user.name = { first: 'john', last: 'james'};
        user.email = 'john@gmail.com';
        user.password = 'johnson';
        user.save(function(err, data) {
          userId = data._id;
          Document.remove({}, function() {
            doc.ownerId = userId;
            doc.title = 'Introduction';
            doc.content = 'A good read';
            doc.save(function(err, docData) {
              documentId = docData._id;
              done();
            })
          })
        });
      });
    });

    it('should create a new document instance', function(done) {
      request(app)
        .post('/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({
          email: 'john@gmail.com',
          password: 'johnson'
        })
        .end(function(err, res) {
          userToken = res.body.token;
          request(app)
          .post('/documents/?token=' + userToken)
          .set('Content-Type', 'application/json')
          .send({
            title: 'chapter-1',
            content: 'The very first chapter'
          })
          .end(function(err, res) {
            expect(res.body.ownerId).toMatch(jasmine.objectContaining(userId));
            expect(res.body).toEqual(jasmine.objectContaining({
              title: 'chapter-1',
              content: 'The very first chapter'
            }));
            done();
          });
        });
    });

    it('should find matching instances of document', function(done) {
      request(app)
        .get('/documents/')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.body.length).toEqual(1);
          expect(res.body[0]).toEqual(jasmine.objectContaining({
            title: 'Introduction'
          }));
          done();
        });
    });

    it('should find a specific document by its id', function(done) {
      request(app)
        .get('/documents/' + documentId)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.body).toEqual(jasmine.objectContaining({
            title: 'Introduction'
          }));
          done();
        });
    });

    it('should update a document attributes', function(done) {
      request(app)
        .put('/documents/' + documentId)
        .send({
          title: 'Introduction and Preface'
        })
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.body).toEqual(jasmine.objectContaining({
            title: 'Introduction and Preface'
          }));
          done();
        });
    });

    it('should delete specific document instance', function(done) {
      request(app)
        .delete('/documents/' + documentId)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.body).toBe(null);
          done();
        });
    });

    it('should find all documents accessible to the user', function(done) {
      request(app)
        .get('/users/' + userId + '/documents')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.body.length).toEqual(1);
          expect(res.body[0].ownerId).toMatch(jasmine.objectContaining(userId));
          expect(res.body[0]).toEqual(jasmine.objectContaining({
            title: 'Introduction'
          }))
          done();
        });
    });

  })  
});