'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('MainController', function ($scope) {

  }).
  controller('ServiceController', function ($scope, Firebase) {
    $scope.predicate = '';

    Firebase._construct('tarifas');

    // var item = {
    //   'origem': '016', 
    //   'destino': '011', 
    //   'taxaminuto': 290
    // };

    // Firebase.add(item);

  }).
  controller('ConcactController', function ($scope) {
    // write Ctrl here

  }).
  controller('SimulatorController', function ($scope) {

  });
