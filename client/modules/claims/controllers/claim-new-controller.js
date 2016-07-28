'use strict';

angular.module('claimNewCtrlModule', []).controller('ClaimNewController', ['$location', 'Claim', '$scope', '$rootScope', function($location, Claim, $scope, $rootScope) {

    var vm = this;

    // set the view mode to "new"
    vm.viewMode = 'new';


    vm.claimFormData = {};
    vm.claimFormData.claimLines = [];
    vm.lineData = {};

    vm.claimFormData.filteredClaimLinesData = [];

    // initialize form employee data

    vm.claimFormData.practiceDivision = $rootScope.currentUser.practiceDivision;
    vm.claimFormData.employeeName = $rootScope.currentUser.employeeName;
    vm.claimFormData.designation = $rootScope.currentUser.designation;
    vm.claimFormData.level = $rootScope.currentUser.level;
    vm.claimFormData.employeeId = $rootScope.currentUser.employeeId;

    vm.lineData.localCurrency='INR';
    vm.claimFormData.advanceCurrency='INR';
    vm.lineData.currency='INR';
    $scope.$watch('ClaimCtrl.lineData.localCurrency + ClaimCtrl.lineData.currency', function(){
        if(vm.lineData.localCurrency==vm.lineData.currency){
            vm.lineData.exchangeRate=1;

        } else{
            vm.lineData.exchangeRate="";
        }
    } );


    vm.expenseTypeData = [
        'Air Fare',
        'Bus Fare',
        'Train Fare',
        'Cab Fare',
        'Food',
        'Lodging',
        'Telephone',
        'Internet',
        'Client Entertainment',
        'Consumables',
        'Tolls',
        'Car Rental',
        'Fuel',
        'parking',
        'Others'
    ];

    // currencies
    vm.currencyData = ['USD', 'INR', 'GBP','JPY','KWD','KGS','MOP','MYR'];




    vm.createClaimLine = function() {
        vm.claimFormData.claimLines.push(vm.lineData);
        vm.lineData = {};
        vm.lineData.localCurrency='INR';
        vm.lineData.currency='INR';
    };

    vm.removeClaimLine = function(pos) {
        vm.claimFormData.claimLines.splice(pos, 1);
    };

    vm.createDuplicateLine = function(record) {
        vm.claimFormData.claimLines.push(record);
    };

    // submit to actual claim collection
    vm.submitClaimData = function() {

        vm.claimFormData.isSubmitted = true;


        if (vm.claimFormData.id) {
            // first create the claim record and get the result into temporary id variable
            vm.claimFormData.$save().$promise.then(function(data) {
                $location.path('/claims/' + vm.claimFormData.id + '/view');
                alert('Claim submitted!');
            });


        } else {
            // first create the claim record and get the result into temporary id variable
            Claim.create(vm.claimFormData).$promise.then(function(data) {
                console.log("data = " + JSON.stringify(data));
                $location.path('/claims/' + data.id + '/view');
                alert('Claim submited!');
            });

        }

    };

    // save to claim without submit
    vm.saveClaimData = function() {
        if (vm.claimFormData.id) {
            // first create the claim record and get the result into temporary id variable
            vm.claimFormData.$save().$promise.then(function(data) {
                console.log("data = " + JSON.stringify(data));
                alert('Claim saved!');
                vm.claimFormData.id = data.id;
                $location.path('/claims/' + data.id + '/edit');
            });
        } else {
            // first create the claim record and get the result into temporary id variable
            Claim.create(vm.claimFormData).$promise.then(function(data) {
                console.log("data = " + JSON.stringify(data));
                $location.path('/claims/' + data.id + '/edit');
                alert('Claim saved!');
            });


        }

    };

    // pagination
    vm.filteredClaimsData = [];

    vm.currentPage = 1;
    vm.numPerPage = 10;
    vm.itemsPerPage = 10; 


    $scope.$watch('ClaimCtrl.claimFormData.claimLines + ClaimCtrl.currentPage + ClaimCtrl.numPerPage', function() {
        var begin = ((vm.currentPage - 1) * vm.numPerPage);
        var end = begin + vm.numPerPage;
        vm.claimFormData.filteredClaimLinesData = vm.claimFormData.claimLines.slice(begin, end);
    });

    vm.getTotalItemsCount = function() {
        return vm.claimFormData.claimLines.length;
    };


    vm.pageChanged = function() {
        console.log('Page changed to: ' + vm.currentPage);
    };


}]);