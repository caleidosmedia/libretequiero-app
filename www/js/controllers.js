(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ExploraController', ExploraController);

    ExploraController.$inject = [
        '$scope',
        '$state'
    ];

    function ExploraController(
        $scope,
        $state
    ) {

    }
})();



(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('HomeController', HomeController);

    HomeController.$inject = [
        '$scope',
        '$state'
    ];

    function HomeController(
        $scope,
        $state
    ) {

    }
})();



(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('LayoutController', LayoutController);

    LayoutController.$inject = [
        '$scope',
        '$state'
    ];

    function LayoutController(
        $scope,
        $state
    ) {
        $scope.goState = function (page) {
            $state.go(page);
        };
    }
})();



(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ProtegeController', ProtegeController);

    ProtegeController.$inject = [
        '$scope',
        '$state',
        '$ionicModal',
        '$ionicLoading',
        '$ionicPopup',
        '$timeout',
        'NgMap',
        '$cordovaCamera',
        'DenunciarService',
    ];

    function ProtegeController(
        $scope,
        $state,
        $ionicModal,
        $ionicLoading,
        $ionicPopup,
        $timeout,
        NgMap,
        $cordovaCamera,
        DenunciarService
    ) {

        var directionsService = new google.maps.DirectionsService();
        function fx(latLng) {
            var request = {
                origin:latLng,
                destination:latLng,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    $scope.denuncia.direccion = response.routes[0].summary;
                }
            });
        }

        $ionicModal.fromTemplateUrl('templates/protege/views/success.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalSuccess = modal;
        });

        $scope.openSuccessForm = function() {
            $scope.modalSuccess.show();
        };
        $scope.closeSuccessForm = function() {
            $scope.modalSuccess.hide();
            $state.go("app.home");
        };

        $ionicModal.fromTemplateUrl('templates/protege/views/map.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalMap = modal;
        });

        $scope.openMap = function() {
            $scope.modalMap.show();

        };

        $scope.$on('modal.shown', function() {
            NgMap.getMap().then(function(map) {
                $scope.map = map;
                $scope.map.markers[0].setPosition(new google.maps.LatLng($scope.location[0], $scope.location[1]));
                $scope.map.setCenter({lat: $scope.location[0], lng: $scope.location[1]});
                $scope.map.setZoom(18);
            });
        });

        $scope.closeMap = function() {
            $scope.modalMap.hide();
        };

        $scope.onSearch = function () {
            console.log(this.getPlace());
        };

        $scope.addMarker = function (event) {
            $scope.map.markers[0].setPosition(event.latLng);
            $scope.location = [
                event.latLng.lat(),
                event.latLng.lng()
            ];
           fx(event.latLng);
        };

        navigator.geolocation.getCurrentPosition( function (position) {
            $scope.location = [
                position.coords.latitude,
                position.coords.longitude
            ];
        });


        $scope.denunciar = function(denuncia) {
            var data = {
                "direccion": denuncia.direccion,
                "coordenadas": $scope.location[0]+","+$scope.location[1],
                "tipo_locacion": denuncia.tipo_locacion,
                "clase": denuncia.clase,
                "grupo": denuncia.grupo,
                "estado": denuncia.estado,
                "almacenamiento": denuncia.almacenamiento,
                "descripcion": denuncia.comentarios,
                "imagen": $scope.denuncia.imagen,
            }
            console.log(data);

            $ionicLoading.show({
                templateUrl:"templates/protege/views/process.html",
                noBackdrop: true
            });

            DenunciarService.denunciar(data).then( function (data) {
                    console.log(data);

                    $timeout(function(){
                        $ionicLoading.hide();
                        $scope.denuncia = {};
                        $scope.denunciar = {
                            id: data.denuncia.id
                        };
                        $scope.openSuccessForm();
                    },3000);
                }).catch( function (error) {
                    console.log(error);
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'No se pudo crear denuncia'
                    });
                });
        };

        $scope.opciones = [
            { "value": "upload", "text": "Librería de fotos" },
            { "value": "take", "text": "Tomar foto" }
        ];

        $scope.pictureAction = function() {
            if ($scope.denuncia.typePicture.value == "take") {
                $scope.denuncia.imgURI = null;
                takePicture();
            } else if ($scope.denuncia.typePicture.value == "upload") {
                $scope.denuncia.imgURI = null;
                uploadPicture();
            }
        };

        function takePicture() {
          var options = {
                quality : 75,
                destinationType : Camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.CAMERA,
                allowEdit : false,
                targetWidth: 1280,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.denuncia.imgURI =  'data:image/jpeg;base64,' + imageData;
                $scope.denuncia.imagen = imageData;
            });
        }

        function uploadPicture() {
          var options = {
                quality : 75,
                destinationType : Camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
                allowEdit : false,
                targetWidth: 1280,
                encodingType: Camera.EncodingType.JPEG
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.denuncia.imgURI =  'data:image/jpeg;base64,' + imageData;
                $scope.denuncia.imagen = imageData;
            });
        }   

        $scope.grupos = {
            'anfibio': {
                'ranas': 'Ranas',
            },
            'aves': {
                'loros-grandes-y-guacamayos': 'Loros grandes y guacamayos',
                'loros-medianos-y-pequenos': 'Loros medianos y pequeños',
                'rapaces': 'Gavilanes y Halcones',
            },
            'reptil': {
                'caimanes': 'Caimanes',
                'tortugas-de-rio': 'Tortugas de río',
                'tortugas-terrestres': 'Tortugas terrestres'
            },
            'mamifero': {
                'coaties': 'Coaties',
                'felinos-menores': 'Felinos Menores',
                'perezosos': 'Perezosos',
                'primates-pequenos': 'Primates Pequeños',
                'primtes-grandes-y-medianos': 'Primates Grandes y Medianos'
            }
        };

        $scope.cambioClase = function () {
            var clase = $scope.denuncia.clase;
            $scope.grupo = $scope.grupos[clase];
        };

        $scope.denuncia = {}

        $scope.grupo = {}

       
    }
})();



(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('AnimalController', AnimalController);

    AnimalController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'ReconoceService'
    ];

    function AnimalController(
        $scope,
        $state,
        $stateParams,
        ReconoceService
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

        ReconoceService
            .searchID($stateParams.id)
            .then( function (data) {
                console.log(data);
                $scope.animals = data;
            }).catch( function (error) {

            });
    }
})();



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



(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ResultadoController', ResultadoController);

    ResultadoController.$inject = [
        '$scope',
        '$state',
        '$stateParams',
        'ReconoceService'
    ];

    function ResultadoController(
        $scope,
        $state,
        $stateParams,
        ReconoceService
    ) {
        $scope.animals = [];
        $scope.detail = false;
        $scope.filtros = {
            taxonomia: $stateParams.taxonomia,
            grupo: $stateParams.grupo,
            color: $stateParams.color
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

        ReconoceService
            .search($stateParams.taxonomia, $stateParams.grupo, $stateParams.color)
            .then( function (data) {
                console.log(data);
                $scope.animals = data;
            }).catch( function (error) {

            });
    }
})();


