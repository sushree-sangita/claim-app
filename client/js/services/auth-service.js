// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular .module('authServiceModule', [
    'lbServices'
]).factory('AuthService', ['Employee', '$q', '$rootScope', function(Employee, $q, $rootScope) {
    function login(email, password) {
        return Employee.login({
            email: email, 
            password: password
        }).$promise.then(function(response) {
            $rootScope.currentUser = {
                id: response.user.id,
                tokenId: response.id,
                email: email,
                employeeName: response.user.name,
                username: response.user.username,
                level: response.user.level,
                employeeId: response.user.employeeId,
                practiceDivision: response.user.practiceDivision,
                designation: response.user.designation,
            };
        });
    }

    function logout() {
        console.log("AuthService.logout() called.");
        return Employee.logout().$promise.then(function() {
            $rootScope.currentUser = null;
        });
    }

    function register(email, password) {
        return Employee.create({
            email: email,
            password: password
        }).$promise;
    }

    return {
        login: login,
        logout: logout,
        register: register
    };
}]);
