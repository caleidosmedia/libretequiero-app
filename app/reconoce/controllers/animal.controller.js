(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('AnimalController', AnimalController);

    AnimalController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'ReconoceService',
        'Sound'
    ];

    function AnimalController(
        $scope,
        $state,
        $stateParams,
        ReconoceService,
        Sound
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

        $scope.playSound = function () {
            if (window.cordova) {
                Sound.play($scope.animals.scientific_name, $scope.animals.scientific_name+'.mp3',false);
            }
        };

        ReconoceService
            .searchID($stateParams.id)
            .then( function (data) {
                console.log(data);
                $scope.animals = data;
                if (window.cordova) {
                    Sound.play(data.scientific_name, data.scientific_name+'.mp3',false);
                }
            }).catch( function (error) {

            });
    }
})();


