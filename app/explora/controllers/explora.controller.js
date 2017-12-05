(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ExploraController', ExploraController);

    ExploraController.$inject = [
        '$scope',
        '$state',
        'apiUrl',
        'ExploraService',
    ];

    function ExploraController(
        $scope,
        $state,
        apiUrl,
        ExploraService
    ) {

        $scope.currentPage = 1;

        function loadAnimals(page) {

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

        loadAnimals($scope.currentPage);

        $scope.loadMore = function() {
            $scope.currentPage = $scope.currentPage + 1;
            loadAnimals($scope.currentPage);
        }

        $scope.animals = [];

        $scope.goAnimal = function (n) {
            $state.go('app.animal', {
                id: n
            });
        };

        $scope.animalImage = function(animal) {
            if(animal.image_url == null) {
                return 'img/transparent.png';
            }

            var imageName = animal.scientific_name.toString().replace(' ', '_');
            return apiUrl + 'storage/animals/' + imageName + '.jpg';
        }

    }
})();


