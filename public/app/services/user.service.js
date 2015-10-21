'use strict';

//service configured to make http requests
angular.module('DmsApp').factory('UserService', ['$http', '$resource', function($http, $resource) {

  return {
    queries: $resource('/users/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      save: {
        method: "POST"
      }
    }),
    authenticate: function(param) {
      return $http.post('/users/authenticate', param);
    },
    getUserDocuments: function(userId) {
      return $http.get('/users/' + userId + '/documents');
    }

  };

}]);