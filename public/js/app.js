'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/inicio', {
      templateUrl: 'partials/inicio',
      controller: 'MainController'
    }).
    when('/servicos', {
      templateUrl: 'partials/servicos',
      controller: 'ServiceController'
    }).
    when('/contato', {
      templateUrl: 'partials/contato',
      controller: 'ContactController'
    }).
    otherwise({
      redirectTo: '/inicio'
    });

  $locationProvider.html5Mode(true);
});
