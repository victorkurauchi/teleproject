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
  controller('ServiceController', function ($scope, Taxe, Plan) {

    // Trazendo registros do firabse.io para popular lista de planos disponiveis
    Plan.list();

    // Trazendo registros do firebase.io para popular lista de tarifas disponiveis
    Taxe.list();

    $scope.createTaxe = function() {
      Taxe.insert($scope.taxe.origin, $scope.taxe.destiny, $scope.taxe.price);
      Taxe.list();
    }

  }).
  controller('ContactController', function ($scope) {
    

  }).
  controller('SimulatorController', function ($scope, Taxe, Plan) {

    // Populando selectboxes, onde os models tem os mesmos nomes que na view anterior,
    // respectivamente plans e taxes
    Plan.list();
    Taxe.list();


    $scope.simulate = function() {

    }
    

  });
