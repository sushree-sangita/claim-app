angular.module('appController', ['lbServices', 'authServiceModule']).controller('MainController', ['$location', 'AuthService', function($location, AuthService) {
    
    var vm = this;
    
    vm.msg = "Hello Ameeya!";
    
    vm.viewClaims = function() {
          $location.path('/claims');
    };
    
    // Employee
    vm.user = {};
    
    vm.user = {
      email: 'admin@admin.com',
      password: 'admin'
    };
    
    vm.doLogin = function() {
      AuthService.login(vm.user.email, vm.user.password)
        .then(function() {
          $location.path('/home');
        }).error(function(error) {
          alert("Wrong credentials!");
      });
    };
    
     vm.doLogout = function() {
      AuthService.logout()
        .then(function() {
          $location.path('/login');
        });
    };
    
}]);