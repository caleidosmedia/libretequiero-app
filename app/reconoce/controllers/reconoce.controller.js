(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ReconoceController', ReconoceController);

    ReconoceController.$inject = [
        '$scope',
        '$state',
        '$timeout'
    ];

    function ReconoceController(
        $scope,
        $state,
        $timeout
    ) {
        $scope.pregunta = 1;

        $scope.filtros = {
            taxonomia: null,
            grupo:null,
            color:null
        };

        $scope.customBack = function () {
            if ($scope.pregunta === 1) {
                $state.go("app.home");
            } else {
                $scope.pregunta = $scope.pregunta-1;
            }
        };

        $scope.isQuestion = function (n) {
            if ($scope.pregunta == n) {
                return true;
            } else {
                return false;
            }
        };

        $scope.setQuestion = function (n) {
            $scope.pregunta = n;
        };

        $scope.isFilter = function (filter, value) {
            if ($scope.filtros[filter] == value) {
                return true;
            } else {
                return false;
            }
        };

        $scope.setFilter = function (filter, value) {
            $scope.filtros[filter] = value;

            $timeout(function () {
                if (filter == 'taxonomia') {
                    $scope.setQuestion(2);
                }

                if (filter == 'grupo' && $scope.filtros.taxonomia == 'aves') {
                    $scope.setQuestion(3);
                } else if (filter == 'grupo' && $scope.filtros.taxonomia != 'aves') {
                    $state.go('app.resultado', {
                        taxonomia:$scope.filtros.taxonomia,
                        grupo:$scope.filtros.grupo,
                        color: $scope.filtros.color
                    });
                }

                if (filter == 'color') {
                    $state.go('app.resultado', {
                        taxonomia: $scope.filtros.taxonomia,
                        grupo: $scope.filtros.grupo,
                        color: $scope.filtros.color
                    });
                }
            }, 500);
        };
    }
})();


