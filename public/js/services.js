'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['firebase']).
  value('version', '0.1')

  // Serviço criado para persistir dados no firebase, 
  // com a possibilidade de ser a propria persistencia em base de dados como mongodb etc..
  .service('Firebase', function($http, $rootScope) {

    return {
      url: 'https://teleproject.firebaseio.com',
      path: '',
      reference: null,

      _construct: function(path) {
        this.path = path;
        this.reference = new Firebase(this.url + '/' + path);
      },

      get: function(scope, localScopeVarname) {
        var result,
        self = this;

        var _ref = this.reference;
        var data = _ref.on('value', function(snapshot) {
          console.log(snapshot.val());

          $rootScope.localScopeVarname = snapshot.val();

          return snapshot.val();
        });

      },

      add: function(item) {
        var _ref = this.reference;
        _ref.push(item);
      }
    }

  });
