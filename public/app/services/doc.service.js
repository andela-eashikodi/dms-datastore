'use strict';

//service configured to make http requests
angular.module('DmsApp').factory('DocumentService', ['$http', '$resource', '$window', function($http, $resource, $window) {

  return {
    queries: function() {
      return $resource('/documents/:id', { id: '@_id' }, {
        save: {
          method: 'POST',
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
        },
        delete: {
          method: 'DELETE'
        },
        update: {
          method: 'PUT'
        },
        query: {
          method: 'GET', isArray: true
        }
      });
    }
  };
  

}]);