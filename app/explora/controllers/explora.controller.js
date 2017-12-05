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
        '$rootScope',
    ];

    function ExploraController(
        $scope,
        $state,
        apiUrl,
        ExploraService,
        $rootScope
    ) {

        $scope.currentPage = 1;

        function loadAnimals(page) {
            var animalClass = [];
            if($rootScope.filterMammalia == true) {
                animalClass.push('MAMMALIA');
            }

            if($rootScope.filterAmphibia == true) {
                animalClass.push('AMPHIBIA');
            }

            if($rootScope.filterAves == true) {
                animalClass.push('AVES');
            }

            if($rootScope.filterReptilia == true) {
                animalClass.push('REPTILIA');
            }

            ExploraService.list(page, animalClass.toString()).then( function (data) {
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

        $rootScope.reloadAnimalsExplore = function() {
            $scope.animals = [];
            $scope.currentPage = 1;
            loadAnimals($scope.currentPage);
        }

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


