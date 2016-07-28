angular.module('claimListCtrlModule', []).controller('ClaimListController', ['Claim', '$scope', '$location', function(Claim, $scope, $location) {
    
    var vm = this;

    vm.processing = true;
    vm.claimsDataFound = false;

    vm.claimsData = [];
    function getClaimList() {
        Claim.query().$promise.then(function(data) {
            vm.claimsData = data;
            vm.claimsDataFound = true;

        });

        vm.processing = false;
    }

    getClaimList();

    vm.delete = function(id) {
        
        Claim.deleteById({
            id: id
        }).$promise.then(function(data) {
            alert("claim deleted!");
            getClaimList();
        });
        
    };

    vm.viewClaim = function(claim_id) {
        console.log("claim_id = " + claim_id);
        $location.path('/claims/' + claim_id + '/view');
    };

    vm.editClaim = function(claim_id) {
        console.log("claim_id = " + claim_id);
        $location.path('/claims/' + claim_id + '/edit');
    };

    // pagination
    vm.filteredClaimsData = [];

    vm.currentPage = 1;
    vm.numPerPage = 10;
    vm.itemsPerPage = 10; 


    $scope.$watch('ClaimCtrl.claimsData + ClaimCtrl.currentPage + ClaimCtrl.numPerPage', function() {
        var begin = ((vm.currentPage - 1) * vm.numPerPage);
        var end = begin + vm.numPerPage;
        vm.filteredClaimsData = vm.claimsData.slice(begin, end);
    });

    vm.getTotalItemsCount = function() {
        return vm.claimsData.length;
    };


    vm.pageChanged = function() {
        console.log('Page changed to: ' + vm.currentPage);
    };


    // Export to CSV
    vm.csvData = [];
    function populateCsvData() {


        if (vm.claimsData.length == 0) {
            alert("Nothing to export!");
            return;
        }  

        // prepare data to export
        for(var i=0; i<vm.claimsData.length; i++) {
            vm.csvData.push({
                'Claim ID': vm.claimsData[i].id,
                'Purpose': vm.claimsData[i].purpose,
                'Date': vm.claimsData[i].date,
                'Status': vm.claimsData[i].status
            });
        }

    };

    vm.getCsvData = function() {
        populateCsvData();
        return vm.csvData;
    };

    vm.getCsvHeaderData = function() {
        return ['Claim ID', 'Purpose', 'Date', 'Status'];  
    };


    
}]);