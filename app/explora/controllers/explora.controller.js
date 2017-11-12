(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ExploraController', ExploraController);

    ExploraController.$inject = [
        '$scope',
        '$state',
        'ExploraService',
    ];

    function ExploraController(
        $scope,
        $state,
        ExploraService
    ) {

        $scope.currentPage = 1;
        
        function loadAnimals(page) {

            ExploraService.list(page).then( function (data) {
                $scope.animales = data.data;
            }).catch( function (error) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'No se pudo encontrar animales'
                });
            });
        }

        loadAnimals($scope.currentPage);

        $scope.animales = {};

    }
})();


