'use strict';

describe('data-store Services', function() {

  var $httpBackend,
    DocumentService,
    UserService;

  beforeEach(angular.mock.module('DmsApp'));
  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      UserService = $injector.get('UserService');
      DocumentService = $injector.get('DocumentService');
    });
  });

  describe('User Service', function() {

    it('should exist', function(done) {
      expect(UserService).toBeDefined();
      done();
    });

    it('should be able to get users', function(done) {
      $httpBackend.expectGET('/users').respond([{_id: 10, username: 'adam'}]);
      var users = UserService.queries.query();
      $httpBackend.flush();
      expect(users).toContain(jasmine.objectContaining({_id: 10, username: 'adam'}));
      done();
    });

    it('should be able to get a single user', function(done) {

      $httpBackend.expectGET('/users/10').respond([{username: 'adam'}]);

      var singleUser = UserService.queries.query({id: 10});

      $httpBackend.flush();

      expect(singleUser).toContain(jasmine.objectContaining({username: 'adam'}));
      expect(singleUser.length).toBe(1);
      done();
    });

    it('should be able to update a user', function(done) {
      var newUserData;
      $httpBackend.expectPUT('/users/11', {_id: 11, username: 'updated'}).respond({_id: 11, username: 'updated'});
      UserService.queries.update({_id: 11, username: 'updated'}, function(data) {
        newUserData = data;
      });
      $httpBackend.flush();

      expect(newUserData).toEqual(jasmine.objectContaining({_id: 11, username: 'updated'}));
      done();
    });

    it('should be able to delete user', function(done) {
      var response;
      $httpBackend.expectDELETE('/users/11').respond({message: 'deleted'});
      UserService.queries.delete({id: 11}, function(data) {
        response = data;
      });
      $httpBackend.flush();

      expect(response).toEqual(jasmine.objectContaining({message: 'deleted'}));
      done();
    });

    it('should be able to authenticate user', function(done) {
      var response;
      var userDetails = {email: 'user@email.com', password: 'user-password'};
      $httpBackend.expectPOST('/users/authenticate', userDetails).respond({message: 'user created'});
      UserService.authenticate(userDetails).then(function(res) {
        response = res.data;
      });
      $httpBackend.flush();
      expect(response).toEqual({message: 'user created'});
      done();
    });

    it('should be able to fetch a user documents', function(done) {
      var response;
      $httpBackend.expectGET('/users/11/documents').respond({success: true});
      UserService.getUserDocuments(11).then(function(res) {
        response = res.data;
      });
      $httpBackend.flush();
      expect(response).toEqual({success: true});
      done();
    });

  });

  describe('Document Service', function() {

    it('should exist', function(done) {
      expect(DocumentService).toBeDefined();
      done();
    });

    it('should be able to get documents', function(done) {
      $httpBackend.expectGET('/documents').respond([{_id: 1, title: 'first'}]);
      var documents = DocumentService.queries().query();
      $httpBackend.flush();
      expect(documents).toContain(jasmine.objectContaining({_id: 1, title: 'first'}));
      done();
    });

    it('should be able to get a document', function(done) {

      $httpBackend.expectGET('/documents/1').respond([{title: 'intro'}]);

      var singleDoc = DocumentService.queries().query({id: 1});

      $httpBackend.flush();

      expect(singleDoc).toContain(jasmine.objectContaining({title: 'intro'}));
      expect(singleDoc.length).toBe(1);
      done();
    });

    it('should be able to update a document', function(done) {
      var newDocumentData;
      $httpBackend.expectPUT('/documents/1', {_id: 1, title: 'updated'}).respond({_id: 1, title: 'updated'});
      DocumentService.queries().update({_id: 1, title: 'updated'}, function(data) {
        newDocumentData = data;
      });
      $httpBackend.flush();

      expect(newDocumentData).toEqual(jasmine.objectContaining({_id: 1, title: 'updated'}));
      done();
    });

    it('should be able to delete a document', function(done) {
      var response;
      $httpBackend.expectDELETE('/documents/1').respond({message: 'deleted'});
      DocumentService.queries().delete({id: 1}, function(data) {
        response = data;
      });
      $httpBackend.flush();

      expect(response).toEqual(jasmine.objectContaining({message: 'deleted'}));
      done();
    });

  });

});
