(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('LayoutController', LayoutController);

    LayoutController.$inject = [
        '$scope',
        '$state',
        '$rootScope',
    ];

    function LayoutController(
        $scope,
        $state,
        $rootScope
    ) {
        $scope.goState = function (page) {
            $state.go(page);
        };

        // Se utiliza $rootscope para pasar filtros entre menu y vista. Se deberia cambiar a un factory service.
        $scope.applyFilter = function() {
            console.log($rootScope.filterMammalia);
            console.log('aplicar filtros');
            $rootScope.reloadAnimalsExplore();
        }

        $scope.filter = function(filter) {
            if(filter == 'filterMammalia') {
                $rootScope.filterMammalia = !$rootScope.filterMammalia;
            }

            if(filter == 'filterAmphibia') {
                $rootScope.filterAmphibia = !$rootScope.filterAmphibia;
            }
            
            if(filter == 'filterAves') {
                $rootScope.filterAves = !$rootScope.filterAves;
            }

            if(filter == 'filterReptilia') {
                $rootScope.filterReptilia = !$rootScope.filterReptilia;
            }

            $rootScope.reloadAnimalsExplore();
        }

        $rootScope.filterMammalia = true;
        $rootScope.filterAmphibia = true;
        $rootScope.filterAves = true;
        $rootScope.filterReptilia = true;
    }
})();


