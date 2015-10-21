'use strict';

//defines module for the app
angular.module('DmsApp', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngStorage', 'ngMessages', 'ngResource']);

//configure routing for app
angular.module('DmsApp').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '../app/views/home.view.html',
      controller: 'homeCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: '../app/views/signin.view.html',
      controller: 'userCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '../app/views/signup.view.html',
      controller: 'userCtrl'
    })
    .state('create', {
      url: '/create',
      templateUrl: '../app/views/create.view.html',
      controller: 'documentCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '../app/views/profile.view.html',
      controller: 'userCtrl'
    })
    .state('edit', {
      url: '/edit/:id',
      templateUrl: '../app/views/edit-doc.view.html',
      controller: 'documentCtrl'
    });

   $urlRouterProvider.otherwise('home');

}]);

//run block used to check if user is authenticated
angular.module('DmsApp').run(['$rootScope', '$window', function($rootScope, $window) {
  if($window.sessionStorage.token) {
    $rootScope.isLogged = true;
    $rootScope.userId = $window.sessionStorage.userId;
  }
  else {
    $rootScope.isLogged = false;
  }
}]);

//config block for angular custom theme
angular.module('DmsApp').config(function($mdThemingProvider) {
  var neonRedMap = $mdThemingProvider.extendPalette('red', {
    '500': '2f4f4f'
  });
  $mdThemingProvider.definePalette('neonRed', neonRedMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('neonRed')
    .accentPalette('light-blue',{
      'default':'50'
    })
    .warnPalette('red');
});