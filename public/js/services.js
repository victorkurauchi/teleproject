'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['firebase']).
  value('version', '0.1')

  // Serviço criado para persistir dados no firebase, 
  // com a possibilidade de ser a propria persistencia em base de dados como mongodb etc..
  .service('Firebase', function($rootScope, $firebase) {

    return {
      url: 'https://teleproject.firebaseio.com',
      path: '',
      reference: null,

      _construct: function(path) {
        this.path = path;
        var ref = new Firebase(this.url + '/' + path);
        this.reference = $firebase(ref);

        return this.reference;
      },

      on: function(ref, eventName, callback) {

        ref.$on(eventName, function () {  

          var args = arguments;

          $rootScope.$apply(function () {

            callback.apply(ref, args);
            
          });
        });

      },

      add: function(ref, item) {
        ref.$add(item);
      }
    }

  })
  .factory('Plan', function(Firebase, $timeout, $rootScope) {

    return {
      list: function() {
        var planos = Firebase._construct('planos');
        Firebase.on(planos, 'loaded', function(data) {

          $timeout(function() {

            var plans = [];

            for (var x in data) {
              if (data.hasOwnProperty(x)) {
                plans.push(data[x]);
              }
            }

            $rootScope.plans = plans;

          },0);

        });
      }
    }

  })
  .factory('Taxe', function(Firebase, $timeout, $rootScope) {

    return {

      ref: '',

      insert: function(origin, destiny, price) {
        var item = {
          'origem': origin, 
          'destino': destiny, 
          'taxaminuto': price
        };

        Firebase.add(this.ref, item);
      },

      list: function() {
        var tarifas = Firebase._construct('tarifas');
        this.ref = tarifas;

        Firebase.on(tarifas, 'loaded', function(data) {

          $timeout(function() {

            var taxes = [];

            for (var x in data) {
              if (data.hasOwnProperty(x)) {
                console.log(data[x]);

                data[x].descricao = 'Origem ' + data[x].origem + ' / Destino ' + data[x].destino + ' - R$' + data[x].taxaminuto;

                taxes.push(data[x]);
              }
            }

            $rootScope.taxes = taxes;

          },0);

        });
      },

      simulate: function(origin, plan, minutes) {

        var costWithPlan, costWithoutPlan;
        var pricePerMinute = parseFloat(origin.taxaminuto);
        var result = {};

        // Calculo com planos falemais
        // se os minutos informados pelo usuário NÃO exceder o que o plano oferece, não será cobrado a mais
        if (minutes <= plan.minutos) {
          costWithPlan = 0;
        } else if (minutes > plan.minutos) {
          var difference = (minutes - plan.minutos);
          console.log(difference);

          costWithPlan = pricePerMinute * difference;
        }

        costWithoutPlan = pricePerMinute * minutes;

        console.log('Custo com plano: ' + 'R$' + costWithPlan);
        console.log('Custo sem plano: ' + 'R$' + costWithoutPlan);

        result.withPlan    = costWithPlan;
        result.withoutPlan = costWithoutPlan;
        result.taxe        = pricePerMinute;
        result.plan        = plan;
        result.time        = minutes;

        $rootScope.displayResult = 1;

        return result;

      }

    }

  });
