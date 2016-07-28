angular.module('claimEditCtrlModule', []).controller('ClaimEditController', ['$scope', '$location', '$routeParams', 'Claim', function($scope, $location, $routeParams, Claim) {

    var vm = this;

    // set the view mode to "edit"
    vm.viewMode = 'edit';

    vm.claimFormData = {};

    vm.claimFormData.claimLines = [];
    vm.claimFormData.filteredClaimLinesData = [];
    vm.lineData = {};

    vm.expenseTypeData = [
        'Air Fare',
        'Bus Fare',
        'Train Fare',
        'Cab Fare',
        'Food',
        'Accomodation',
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
    vm.currencyData = ['USD', 'INR', 'GBP'];
    vm.lineData.localCurrency='INR';
    vm.lineData.currency='INR';


    $scope.$watch('ClaimCtrl.lineData.localCurrency +ClaimCtrl.lineData.currency',function(){
        if(vm.lineData.localCurrency==vm.lineData.currency){
            vm.lineData.exchangeRate=1;

        } else{
            vm.lineData.exchangeRate="";
        }
    } );

    function getClaimDetails() {
        Claim.findById({
            id: $routeParams.claim_id
        }).$promise.then(function(data) {
            
            vm.claimFormData = data;

            // redirect to view, if it's not editable
            if (data.status === 'Approved' || data.status==='Complete') {
                $location.path('/claims/' + $routeParams.claim_id + '/view');
            }

        });  
    }

    getClaimDetails();


    vm.createClaimLine = function() {
        vm.claimFormData.claimLines.push(vm.lineData);
        vm.lineData = {};
        vm.lineData.localCurrency='INR';
        vm.lineData.currency='INR';
    };

    vm.createDuplicateLine = function(record) {
        vm.claimFormData.claimLines.push(record);
    };

    vm.removeClaimLine = function(pos) {
        vm.claimFormData.claimLines.splice(pos, 1);
    };

    vm.saveClaimData = function() {
        console.log("claimFormData = " + JSON.stringify(vm.claimFormData));
        vm.claimFormData.$save().$promise.then(function(data) {
            alert('Claim updated!');
        });
        
        alert('Claim updated!');
    };

    $scope.$watch('ClaimCtrl.lineData.amount', function(newValue, oldValue) {
        vm.lineData.total = vm.lineData.amount * vm.lineData.exchangeRate;

    });
    $scope.$watch('ClaimCtrl.lineData.exchangeRate', function(newValue, oldValue) {
        vm.lineData.total = vm.lineData.amount * vm.lineData.exchangeRate;

    });

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