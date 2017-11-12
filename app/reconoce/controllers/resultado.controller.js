(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ResultadoController', ResultadoController);

    ResultadoController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'ReconoceService'
    ];

    function ResultadoController(
        $scope,
        $state,
        $stateParams,
        ReconoceService
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

        ReconoceService
            .search($stateParams.taxonomia, $stateParams.grupo, $stateParams.color, $stateParams.color_secundario)
            .then( function (data) {
                console.log(data);
                $scope.animals = data;
            }).catch( function (error) {

            });
    }
})();


