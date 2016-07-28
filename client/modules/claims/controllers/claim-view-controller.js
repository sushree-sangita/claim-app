'use strict';

angular.module('claimViewCtrlModule', []).controller('ClaimViewController', ['Claim', '$routeParams', '$location', '$scope', function(Claim, $routeParams, $location, $scope) {

    var vm = this;

    vm.viewMode = 'view';

    vm.claimFormData = {};
    vm.claimFormData.claimLines = [];
    vm.claimFormData.filteredClaimLinesData = [];

    function getSingleClaimData() {
        Claim.findById({
            id: $routeParams.claim_id
        }).$promise.then(function(data) {
            vm.claimFormData = data;
        });  
    }

    getSingleClaimData();


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