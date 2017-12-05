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
        'Sound',
        'Offline',
        '$filter',
        'apiUrl'
    ];

    function ResultadoController(
        $scope,
        $state,
        $stateParams,
        ReconoceService,
        Sound,
        Offline,
        $filter,
        apiUrl
    ) {
        $scope.animals = [];
        $scope.detail = false;
        $scope.offline = Offline.isOffline();
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

        $scope.animalImage = function(animal) {
            if(animal.image_url == null) {
                return 'img/transparent.png';
            }

            var imageName = animal.scientific_name.toString().replace(' ', '_');
            return apiUrl + 'storage/animals/' + imageName + '.jpg';
        }

        if (Offline.isOffline()) {
            var animals = Offline.getData();
            var found = $filter('filter')(animals, {
                class: ($stateParams.taxonomia == "") ? null : $stateParams.taxonomia.toUpperCase(),
                color_secundario: ($stateParams.color_secundario == "") ? null : $stateParams.color_secundario,
                grupo: ($stateParams.grupo == "") ? null : $stateParams.grupo,
                color: ($stateParams.color == "") ? null : $stateParams.color
            }, true);

            $scope.animals = found;
            console.log(found);
            var nameSound = $scope.animals[0].scientific_name;
                nameSound = nameSound.toLowerCase();
                nameSound = nameSound.replace(" ", "-");

            if ($scope.animals.length <= 1) {
                if (window.cordova) {
                    Sound.play(nameSound, nameSound+'.mp3',false);
                }
            }
        } else {
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
    }
})();


