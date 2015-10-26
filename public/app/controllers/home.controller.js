'use strict';

angular.module('DmsApp').controller('homeCtrl', ['$scope', '$rootScope', '$location', '$localStorage', '$window', '$timeout', 'sideNav', 'DocumentService', '$resource', function($scope, $rootScope, $location, $localStorage, $window, $timeout, sideNav, DocumentService, $resource) {

  // parameters for pagination module
  $scope.currentPage = 1;
  $scope.pageSize = 10;

  //$scope.close used to close nav bar upon click
  $scope.close = sideNav.close;

  //$scope.toogle is used to toggle side nav
  $scope.toggle = sideNav.buildToggler;

  //function used to log a user out
  $scope.logout = function() {
    $window.sessionStorage.clear();
    $rootScope.isLogged = false;
    $location.url('home');
  };

  //gets documents created
  $scope.recentDocs = DocumentService.queries().query();

}]);