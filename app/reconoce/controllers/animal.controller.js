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
        'Sound'
    ];

    function AnimalController(
        $scope,
        $state,
        $stateParams,
        apiUrl,
        ReconoceService,
        Sound
    ) {
        $scope.animals = [];
        $scope.detail = false;
        $scope.animalID = $stateParams.id;

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
            return apiUrl + 'storage/animals/' + imageName + '.jpg';
        }

        ReconoceService
            .searchID($stateParams.id)
            .then( function (data) {
                console.log(data);
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
})();


