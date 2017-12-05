(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ExploraController', ExploraController);

    ExploraController.$inject = [
        '$scope',
        '$state',
        'ExploraService',
        'Offline'
    ];

    function ExploraController(
        $scope,
        $state,
        ExploraService,
        Offline
    ) {

        $scope.currentPage = 1;
        $scope.animals = [];
        $scope.offline = Offline.isOffline();

        function loadAnimals(page) {
            if (Offline.isOffline()) {
                var animals = Offline.getData();

                if (page*5 >= animals.length) {
                    for (var i = page*5-5; i < animals.length; i++) {
                        $scope.animals.push(animals[i]);
                    }
                } else {
                    for (var i = page*5-5; i < page*5; i++) {
                        $scope.animals.push(animals[i]);
                    }
                }

            } else {
                ExploraService.list(page).then( function (data) {
                    angular.forEach(data.data, function(animal, key) {
                        $scope.animals.push(animal);
                    });
                }).catch( function (error) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'No se pudo encontrar animales'
                    });
                });
            }
        }

        loadAnimals($scope.currentPage);

        $scope.loadMore = function() {
            $scope.currentPage = $scope.currentPage + 1;
            loadAnimals($scope.currentPage);
        }

        $scope.goAnimal = function (n) {
            $state.go('app.animal', {
                id: n
            });
        };

    }
})();


