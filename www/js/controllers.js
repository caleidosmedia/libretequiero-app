(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('ExploraController', ExploraController);

    ExploraController.$inject = [
        '$scope',
        '$state',
        'ExploraService',
        'Offline',
        'apiUrl'
    ];

    function ExploraController(
        $scope,
        $state,
        ExploraService,
        Offline,
        apiUrl
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

        $scope.animalImage = function(animal) {
            if(animal.image_url == null) {
                return 'img/transparent.png';
            }

            var imageName = animal.scientific_name.toString().replace(' ', '_');
            return apiUrl + 'storage/animals/' + imageName + '.jpg';
        }

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
    .controller('LayoutController', LayoutController);

    LayoutController.$inject = [
        '$scope',
        '$state',
        '$rootScope',
        'Offline',
        '$ionicLoading',
        'ExploraService',
        '$ionicPopup'
    ];

    function LayoutController(
        $scope,
        $state,
        $rootScope,
        Offline,
        $ionicLoading,
        ExploraService,
        $ionicPopup
    ) {
        $scope.goState = function (page) {
            $state.go(page);
        };

        if (Offline.isOffline()) {
            $scope.status = false;
            $scope.statusName = "Offline";
        } else {
            $scope.status = true;
            $scope.statusName = "Online";
        }

        $scope.offlineToggle = function (status) {
            if (status) {
                Offline.removeOffline();
                $scope.statusName = "Online";
            } else {
                $ionicLoading.show({
                    template:"cargando...",
                    noBackdrop: true
                });

                ExploraService.list(false).then( function (data) {
                    Offline.setData(data);
                    $ionicLoading.hide();

                    /*var currentRequest = 0;
                    makeNextRequest();

                    function makeNextRequest() {
                        var url = data.data[currentRequest].image_url;
                        var nameImage = data.data[currentRequest].scientific_name.split(' ').join('_');
                        var targetPath = cordova.file.documentsDirectory + nameImage+ ".jpg";
                        var trustHosts = true;
                        var options = {};

                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                            .then(function(result) {
                                currentRequest++;
                                if (currentRequest < data.data.length) {
                                    makeNextRequest();
                                } else {
                                    $ionicLoading.hide();
                                }
                            }, function(err) {

                            }, function (progress) {

                            });
                    }*/
                }).catch( function (error) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'No se pudo encontrar animales'
                    });
                });
                Offline.setStatus(1);
                $scope.statusName = "Offline";
            }
        };
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
            color:null,
            color_secundario: null,
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

                if (filter == 'color' && $scope.filtros.grupo == 'loros-grandes-y-guacamayos' && value != 'amarillo') {
                    $scope.setQuestion(4);
                }
                else if (filter == 'color') {
                    $state.go('app.resultado', {
                        taxonomia: $scope.filtros.taxonomia,
                        grupo: $scope.filtros.grupo,
                        color: $scope.filtros.color
                    });
                }

                if (filter == 'color_secundario') {
                    $state.go('app.resultado', {
                        taxonomia: $scope.filtros.taxonomia,
                        grupo: $scope.filtros.grupo,
                        color: $scope.filtros.color,
                        color_secundario: $scope.filtros.color_secundario
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


