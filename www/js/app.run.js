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

    Sound.$inject = [
        'baseUrl'
    ];

    function Sound(
        baseUrl
    ) {
        var myMedias = {};
        var myMedia;
        var currentAudio;
        var play1 = function (index,audio,loop) {
           myMedia = new Media(baseUrl+'audios/'+audio,mediaSuccess,mediaError,mediaStatus);
           myMedias[index] = myMedia;
           console.log(currentAudio);
           if(currentAudio!=undefined)
                myMedias[currentAudio].pause();
            currentAudio = index;
            myMedias[index].play();
            function mediaSuccess(data) {
                console.log('mediaSuccess',data);
            }
            function mediaError(e) {
                console.log('mediaError', e);
            }
            function mediaStatus(status) {
                if(status === Media.MEDIA_STOPPED && loop) {
                    myMedia.seekTo(0);
                    myMedia.play();
                }
                console.log('status', JSON.stringify(arguments));
            }
        }
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
            play: play,
            play1: play1
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
