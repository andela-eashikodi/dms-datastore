'use strict';

angular.module('DmsApp').controller('userCtrl', ['$scope', '$rootScope', '$location', '$window', 'UserService', '$resource', 'ToastService', function($scope, $rootScope, $location, $window, UserService, $resource, ToastService) {

  //saves user changes upon editing
  $scope.saveUserChanges = function(newInfo) {
    UserService.queries.update(newInfo, function(data, headers) {
      $scope.updateSuccess = true;
      $scope.showError = false;
      ToastService.showToast('Changes Saved');
    }, function(err) {
      ToastService.showErrorToast('Email Taken!');
    });
  };

  //gets user profile information
  $scope.getProfile = function() {
    if(!$window.sessionStorage.token){
      $location.url('signin');
      ToastService.showToast('Please sign in first');
    }
    else {
      var userId = $window.sessionStorage.userId;
      //gets documents created by user
      UserService.getUserDocuments(userId).then(function(res) {
        $scope.userDocs = res.data;
        $scope.userInformation = UserService.queries.get({ id: userId });
      });
    }
  };

  //registers a new user
  $scope.signup = function(userInfo) {
    var userInput = {email: userInfo.email, password: userInfo.password};
    var newUser = new UserService.queries(userInfo);
    newUser.$save(function(data, headers) {
      $scope.showLoginErr = false;
      $scope.login(userInput);
    }, function(err) {
      $scope.showLoginErr = true;
      $scope.errorMsg = err.data.message;
    });
  };

  //authenticates a user
  $scope.login = function(userDetail) {
    UserService.authenticate(userDetail).then(function(res) {
      $scope.showLoginErr = false;
      $window.sessionStorage.token = res.data.token;
      $window.sessionStorage.userId = res.data.userId;
      $rootScope.isLogged = true;
      $location.url('home');
    }, function(err) {
      $scope.showLoginErr = true;
      $scope.errorMsg = err.data.message;
    });
  };

}]);