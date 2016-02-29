'use strict';

//service to operate message toast
angular.module('DmsApp').factory('ToastService', function($mdToast) {
  return {
    showToast: function(message) {
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position('top right')
          .hideDelay(3000)
      );
    },
    showErrorToast: function(message) {
      $mdToast.show({
        template: '<md-toast style="background:#db7093;color:black">' + message + '</md-toast>',
        hideDelay: 5000,
        position: 'top right'
      });
    }
  };
});