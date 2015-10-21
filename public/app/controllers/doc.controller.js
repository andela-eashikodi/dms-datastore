'use strict';

angular.module('DmsApp').controller('documentCtrl', ['$scope', '$rootScope', '$location', '$window', 'DocumentService', '$resource', 'ToastService', 'UserService', '$stateParams', function($scope, $rootScope, $location, $window, DocumentService, $resource, ToastService, UserService, $stateParams) {

  //function to create document
  $scope.createDoc = function(docInfo) {
    DocumentService.queries().save(docInfo, function(data, headers) {
      $scope.createDocSuccess = true;
      $scope.showError = false;
      //redirect to user profile
      $location.url('profile');
      ToastService.showToast('New Document Created! ');
    }, function(err) {
      //show error if task failed
      $scope.showError = true;
      $scope.errorMsg = err.data.message;
    });
  };

  //function to delete document
  $scope.deleteDoc = function(doc) {
    DocumentService.queries().delete({id: doc._id}, function() {
      $scope.deleteDocSuccess = true;
      var userId = $window.sessionStorage.userId;
      UserService.getUserDocuments(userId).then(function(res) {
        $scope.userDocs = res.data;
        ToastService.showErrorToast('File Deleted!');
      }, function(err) {
        ToastService.showErrorToast('Error!');
      });
    });
  };

  //function to ger a single document
  $scope.getDoc = function() {
    $scope.docDetails = DocumentService.queries().get({ id: $stateParams.id });
  };

  //function to save document editing
  $scope.saveChanges = function(docDetails) {
    DocumentService.queries().update(docDetails, function(data, headers) {
      $scope.documentUpdated = true;
      $scope.showError = false;
      ToastService.showToast('Changes Saved');
      $location.url('profile');
    }, function(err) {
      ToastService.showErrorToast('Document with this title exists!');
    });
  };

}]);