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

        // Se utiliza $rootscope para pasar filtros entre menu y vista. Se deberia cambiar a un factory service.
        $scope.applyFilter = function() {
            console.log($rootScope.filterMammalia);
            console.log('aplicar filtros');
            $rootScope.reloadAnimalsExplore();
        }

        $scope.filter = function(filter) {
            if(filter == 'filterMammalia') {
                $rootScope.filterMammalia = !$rootScope.filterMammalia;
            }

            if(filter == 'filterAmphibia') {
                $rootScope.filterAmphibia = !$rootScope.filterAmphibia;
            }

            if(filter == 'filterReptilia') {
                $rootScope.filterReptilia = !$rootScope.filterReptilia;
            }
            
            if(filter == 'filterAves') {
                $rootScope.filterAves = !$rootScope.filterAves;
            }

            if(filter == 'filterCR') {
                $rootScope.filterCR = !$rootScope.filterCR;
            }

            if(filter == 'filterEN') {
                $rootScope.filterEN = !$rootScope.filterEN;
            }

            if(filter == 'filterVU') {
                $rootScope.filterVU = !$rootScope.filterVU;
            }

            if(filter == 'filterNT') {
                $rootScope.filterNT = !$rootScope.filterNT;
            }

            if(filter == 'filterDD') {
                $rootScope.filterDD = !$rootScope.filterDD;
            }

            $rootScope.reloadAnimalsExplore();
        }

        $rootScope.filterMammalia = true;
        $rootScope.filterAmphibia = true;
        $rootScope.filterAves = true;
        $rootScope.filterReptilia = true;
        $rootScope.filterCR = true;
        $rootScope.filterEN = true;
        $rootScope.filterVU = true;
        $rootScope.filterNT = true;
        $rootScope.filterDD = true;


        // Modo offline
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


