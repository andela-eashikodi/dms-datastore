'use strict';

describe('data-store ', function() {
  beforeEach(module('DmsApp'));
  beforeEach(module('ngResource'));

  describe('Home controller', function() {
    var mockBackend, scope, location;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      mockBackend = _$httpBackend_;

      var ctrl = $controller('homeCtrl', {$scope: scope});
    }));

    it('should make http request to gets docs',  function(done){
      mockBackend.expectGET('/documents').respond([{title: 'one', content: 'one'}]);
      mockBackend.flush();

      expect(scope.recentDocs).toContain(jasmine.objectContaining({title: 'one', content: 'one'}));
      expect(scope.recentDocs.length).toEqual(1);
      done();
    });

    it('should sign user out', function(done) {
      scope.logout();
      expect(scope.isLogged).toBe(false);
      done();
    });

    it('should have sidenav toggle function', function(done) {
      expect(scope.toggle).toBeDefined();
      expect(typeof scope.toggle).toBe('function');

      expect(scope.close).toBeDefined();
      expect(typeof scope.close).toBe('function');
      done();
    });

  });


  describe('User Controller', function() {
    var mockBackend, scope, location, ctrl;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      mockBackend = _$httpBackend_;

      ctrl = $controller('userCtrl', {$scope: scope});

    }));

    it('should sign up a new user and sign user in', function(done) {
      var newUser = {username: 'richman', email: 'richman@yahoo.com', name: {first: 'rich', last: 'man'}, password: 'richman'};
      mockBackend.expectPOST('/users', newUser).respond({});
      mockBackend.expectPOST('/users/authenticate', {email: newUser.email, password: newUser.password}).respond({});
      scope.signup(newUser);
      mockBackend.flush();
      expect(scope.signup).toBeTruthy();
      expect(scope.isLogged).toBe(true);
      done();
      
    });

    it('should successfully update a user', function(done) {
      mockBackend.expectPUT('/users/10').respond({});
      scope.saveUserChanges({_id: '10', username: 'newrich'});
      mockBackend.flush();
      expect(scope.saveUserChanges).toBeTruthy();
      expect(scope.updateSuccess).toBe(true);
      done();
    });

  });

  describe('Document Controller', function() {
    var mockBackend, scope, location, ctrl;
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      mockBackend = _$httpBackend_;

      ctrl = $controller('documentCtrl', {$scope: scope});

    }));


    it('should be able to create a new document', function(done) {
      mockBackend.expectPOST('/documents', {title: "new"}).respond({});
      scope.createDoc({title: "new"});
      mockBackend.flush();
      expect(scope.createDocSuccess).toBe(true);
      done();
    });

    it('should be able to delete a document', function(done) {
      mockBackend.expectDELETE('/documents/10').respond({});
      mockBackend.expectGET('/users/undefined/documents').respond({success: true});

      scope.deleteDoc({_id: 10, title: "new"});

      mockBackend.flush();
      expect(scope.deleteDocSuccess).toBe(true);
      expect(scope.userDocs).toEqual({success: true});
      done();
    });

    it('should successfully update a document', function(done) {
      mockBackend.expectPUT('/documents/10').respond({});
      scope.saveChanges({_id: '10', title: 'update-new'});
      mockBackend.flush();
      expect(scope.documentUpdated).toBe(true);
      done();
    });

  });

});

