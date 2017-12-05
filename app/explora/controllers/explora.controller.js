(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ExploraController', ExploraController);

    ExploraController.$inject = [
        '$scope',
        '$state',
        'ExploraService',
        '$rootScope',
        'Offline',
        'apiUrl'
    ];

    function ExploraController(
        $scope,
        $state,
        ExploraService,
        $rootScope,
        Offline,
        apiUrl
    ) {

        $scope.currentPage = 1;
        $scope.animals = [];
        $scope.offline = Offline.isOffline();

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


