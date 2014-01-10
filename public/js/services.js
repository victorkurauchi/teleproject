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

      add: function(item) {
        var _ref = this.reference;
        _ref.push(item);
      }
    }

  });
