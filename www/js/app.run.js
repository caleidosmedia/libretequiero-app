(function() {
    'use strict';

    angular
    .module('atrapa', ['ionic', 'ngMap', 'ngCordova'])
    .run(run);

    run.$inject = [
        '$ionicPlatform',
        '$rootScope',
        '$state',
        '$ionicPopup'
    ];

    function run(
        $ionicPlatform,
        $rootScope,
        $state,
        $ionicPopup
    ) {

        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }
})();
