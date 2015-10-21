'use strict';

//service to operate sidenav of the app
angular.module('DmsApp').factory('sideNav', ['$mdUtil', '$mdSidenav', function($mdUtil, $mdSidenav) {
  return {
    buildToggler: $mdUtil.debounce(function(){
        $mdSidenav('right').toggle();
    }, 300),
    close: function () {
       $mdSidenav('right').close();
      }
  };
}]);