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
  controller('ServiceController', function ($scope, Firebase, $timeout) {

    var tarifas = Firebase._construct('tarifas');

    Firebase.on(tarifas, 'loaded', function(data) {

      $timeout(function() {

        var taxes = [];

        for (var x in data) {
          if (data.hasOwnProperty(x)) {
            console.log(data[x]);

            data[x].taxaminuto = parseInt(data[x].taxaminuto, 10);

            taxes.push(data[x]);
          }
        }

        $scope.taxes = taxes;

      },0);

    });

    var planos = Firebase._construct('planos');
    Firebase.on(planos, 'loaded', function(data) {

      $timeout(function() {

        var plans = [];

        for (var x in data) {
          if (data.hasOwnProperty(x)) {
            plans.push(data[x]);
          }
        }

        $scope.plans = plans;

      },0);

    });

  }).
  controller('ContactController', function ($scope) {
    

  }).
  controller('SimulatorController', function ($scope, Firebase, $timeout) {

    Firebase._construct('tarifas');

    Firebase.on('loaded', function(data) {

      $timeout(function() {

        var taxes = [];

        for (var x in data) {
          if (data.hasOwnProperty(x)) {
            console.log(data[x]);

            data[x].taxaminuto = parseInt(data[x].taxaminuto, 10);

            taxes.push(data[x]);
          }
        }

        $scope.taxes = taxes;

      },0);

    });


    // var item = {
    //   'origem': '016', 
    //   'destino': '011', 
    //   'taxaminuto': 290
    // };

    // Firebase.add(item);

  });
