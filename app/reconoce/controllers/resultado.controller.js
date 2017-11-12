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
            var nameSound = $scope.animals[0].scientific_name;
                nameSound = nameSound.toLowerCase();
                nameSound = nameSound.replace(" ", "-");
                console.log(nameSound);
            if (window.cordova) {
                Sound.play(nameSound, nameSound+'.mp3',false);
            }
        };

        ReconoceService
            .search($stateParams.taxonomia, $stateParams.grupo, $stateParams.color, $stateParams.color_secundario)
            .then( function (data) {
                console.log(data);
                $scope.animals = data;
                var nameSound = $scope.animals[0].scientific_name;
                    nameSound = nameSound.toLowerCase();
                    nameSound = nameSound.replace(" ", "-");

                if ($scope.animals.length <= 1) {
                    if (window.cordova) {
                        Sound.play(nameSound, nameSound+'.mp3',false);
                    }
                }

            }).catch( function (error) {

            });
    }
})();


