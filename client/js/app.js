angular.module('app', [
    'appController',
    'authServiceModule',
    'ngRoute',
    'ngResource',
    'claimModule',
    'ui.bootstrap', 
    'ngSanitize', 
    'ngCsv', 
    'angular-loading-bar', 
    'ngAnimate',
    'lbServices'
]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MainController',
        controllerAs: 'MainCtrl'
    }).when('/home', {
        templateUrl: 'views/home.html',
        controller: 'MainController',
        controllerAs: 'MainCtrl',
        authenticate: true
    }).when('/claims', {
        templateUrl: 'modules/claims/views/claim-list.html',
        controller: 'ClaimListController',
        controllerAs: 'ClaimCtrl',
        authenticate: true
    }).when('/claims/create', {
        templateUrl: 'modules/claims/views/claim-form.html',
        controller: 'ClaimNewController',
        controllerAs: 'ClaimCtrl',
        authenticate: true
    }).when('/claims/:claim_id/view', {
        templateUrl: 'modules/claims/views/claim-form.html',
        controller: 'ClaimViewController',
        controllerAs: 'ClaimCtrl',
        authenticate: true
    }).when('/claims/:claim_id/edit', {
        templateUrl: 'modules/claims/views/claim-form.html',
        controller: 'ClaimEditController',
        controllerAs: 'ClaimCtrl',
        authenticate: true
    }).when('/claims/:claim_id/print', {
        templateUrl: 'modules/claims/views/claim-print.html',
        controller: 'ClaimViewController',
        controllerAs: 'ClaimCtrl',
        authenticate: true
    }).otherwise({
        redirectTo: '/home'
    });

    //    $locationProvider.html5Mode(true);

}]).run(['$rootScope', '$location', function($rootScope, $location) {

    $rootScope.$on('$routeChangeStart', function(event, next) {
        // redirect to login page if not logged in
        if (next.authenticate && !$rootScope.currentUser) {
            event.preventDefault(); //prevent current page from loading
            $location.path('/login');
        }
    });

   
}]);
