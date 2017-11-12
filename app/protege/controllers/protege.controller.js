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

        $scope.denuncia = {}

       
    }
})();


