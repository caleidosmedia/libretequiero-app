(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('AnimalController', AnimalController);

    AnimalController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'ReconoceService'
    ];

    function AnimalController(
        $scope,
        $state,
        $stateParams,
        ReconoceService
    ) {
        $scope.animals = [];
        $scope.detail = false;
        $scope.animalID = $stateParams.id;

        $scope.viewDetail = function () {
            return $scope.detail;
        };

        $scope.toggleDetail = function() {
            $scope.detail = !$scope.detail;
        };

        $scope.goTo = function (page) {
            $state.go(page);
        };

        ReconoceService
            .searchID($stateParams.id)
            .then( function (data) {
                console.log(data);
                $scope.animals = data;
            }).catch( function (error) {

            });
    }
})();


