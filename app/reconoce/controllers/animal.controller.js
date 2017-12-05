(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('AnimalController', AnimalController);

    AnimalController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'apiUrl',
        'ReconoceService',
        'Sound',
        'Offline',
        '$filter'
    ];

    function AnimalController(
        $scope,
        $state,
        $stateParams,
        apiUrl,
        ReconoceService,
        Sound,
        Offline,
        $filter
    ) {
        $scope.animals = [];
        $scope.detail = false;
        $scope.animalID = $stateParams.id;
        $scope.offline = Offline.isOffline();

        $scope.viewDetail = function () {
            return $scope.detail;
        };

        $scope.toggleDetail = function() {
            $scope.detail = !$scope.detail;
        };

        $scope.goTo = function (page) {
            $state.go(page);
        };

        $scope.playSound = function () {
            var nameSound = $scope.animals.scientific_name;
                nameSound = nameSound.toLowerCase();
                nameSound = nameSound.replace(" ", "-");
            if (window.cordova) {
                Sound.play(nameSound, nameSound+'.mp3',false);
            }
        };

        $scope.animalImage = function(animal) {
            if(animal.image_url == null) {
                return 'img/transparent.png';
            }

            var imageName = animal.scientific_name.toString().replace(' ', '_');
            if (Offline.isOffline()) {
                return 'img/animales/' + imageName + '.jpg';
            } else {
                return apiUrl + 'storage/animals/' + imageName + '.jpg';
            }
        }



        if (Offline.isOffline()) {
            var animals = Offline.getData();
            var found = $filter('filter')(animals, {"id": parseInt($stateParams.id)}, true);

            $scope.animals = found[0];

            console.log($scope.animals);
            var nameSound = $scope.animals.scientific_name;
                nameSound = nameSound.toLowerCase();
                nameSound = nameSound.replace(" ", "-");
            if (window.cordova) {
                Sound.play(nameSound, nameSound+'.mp3',false);
            }
        } else {
            ReconoceService
            .searchID($stateParams.id)
            .then( function (data) {
                $scope.animals = data;
                var nameSound = $scope.animals.scientific_name;
                    nameSound = nameSound.toLowerCase();
                    nameSound = nameSound.replace(" ", "-");
                if (window.cordova) {
                    Sound.play(nameSound, nameSound+'.mp3',false);
                }
            }).catch( function (error) {

            });
        }

    }
})();


