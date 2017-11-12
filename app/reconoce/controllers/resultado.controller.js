(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ResultadoController', ResultadoController);

    ResultadoController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'ReconoceService',
        'Sound'
    ];

    function ResultadoController(
        $scope,
        $state,
        $stateParams,
        ReconoceService,
        Sound
    ) {
        $scope.animals = [];
        $scope.detail = false;
        $scope.filtros = {
            taxonomia: $stateParams.taxonomia,
            grupo: $stateParams.grupo,
            color: $stateParams.color,
            color_secundario: $stateParams.color_secundario
        };


        $scope.viewDetail = function () {
            return $scope.detail;
        };

        $scope.toggleDetail = function() {
            $scope.detail = !$scope.detail;
        };

        $scope.goTo = function (page) {
            $state.go(page);
        };


        $scope.goAnimal = function (n) {
            $state.go('app.animal', {
                id: n
            });
        };

        $scope.playSound = function () {
            if (window.cordova) {
                Sound.play($scope.animals[0].scientific_name, $scope.animals[0].scientific_name+'.mp3',false);
            }
        };

        ReconoceService
            .search($stateParams.taxonomia, $stateParams.grupo, $stateParams.color, $stateParams.color_secundario)
            .then( function (data) {
                console.log(data);
                $scope.animals = data;

                if ($scope.animals.length <= 1) {
                    if (window.cordova) {
                        Sound.play(data[0].scientific_name, data[0].scientific_name+'.mp3',false);
                    }
                }

            }).catch( function (error) {

            });
    }
})();


