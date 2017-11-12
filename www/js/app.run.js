(function() {
    'use strict';

    angular
    .module('atrapa', ['ionic', 'ngMap', 'ngCordova'])
    .factory('Sound', Sound)
    .run(run);

    run.$inject = [
        '$ionicPlatform',
        '$rootScope',
        '$state',
        '$ionicPopup'
    ];

    function Sound() {
        var myMedias = {};
        var myMedia;
        var currentAudio;
        var play = function (index,audio,loop) {
            if(currentAudio!=undefined)
                window.plugins.NativeAudio.stop(currentAudio);
            currentAudio = index;
            if(loop)
                window.plugins.NativeAudio.loop(index);
            else
                window.plugins.NativeAudio.play(index);
        }
        return {
            play: play
        }
    }

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
                window.plugins.NativeAudio.preloadSimple('amazona-amazonica', 'audios/amazona-amazonica.mp3');
                window.plugins.NativeAudio.preloadSimple('amazona-farinosa', 'audios/amazona-farinosa.mp3');
                window.plugins.NativeAudio.preloadSimple('amazona-festiva', 'audios/amazona-festiva.mp3');
                window.plugins.NativeAudio.preloadSimple('amazona-mercenarius', 'audios/amazona-mercenarius.mp3');
                window.plugins.NativeAudio.preloadSimple('ara-ararauna', 'audios/ara-ararauna.mp3');
                window.plugins.NativeAudio.preloadSimple('ara-chloropterus', 'audios/ara-chloropterus.mp3');
                window.plugins.NativeAudio.preloadSimple('ara-militaris-militaris', 'audios/ara-militaris-militaris.mp3');
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }
})();
