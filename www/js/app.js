(function () {
    'use strict';

    angular
        .module('atrapa')
        .config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        '$ionicConfigProvider'
    ];

    function config(
        $stateProvider,
        $urlRouterProvider,
        $ionicConfigProvider
    ) {

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/layout/views/layout.html',
                controller: 'LayoutController'
            })

            .state('app.home', {
                url: '/home',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home/views/home.html',
                        controller: 'HomeController'
                    }
                }
            })

            .state('app.reconoce', {
                url: '/reconoce',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/reconoce/views/reconoce.html',
                        controller: 'ReconoceController'
                    }
                }
            })

<<<<<<< HEAD
            .state('app.resultado', {
                url: '/resultado/:taxonomia/:grupo/:color',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/reconoce/views/resultado.html',
                        controller: 'ResultadoController'
                    }
                }
            })

            .state('app.animal', {
                url: '/animal/:id',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/reconoce/views/animal.html',
                        controller: 'AnimalController'
=======
            .state('app.protege', {
                url: '/protege',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/protege/views/protege.html',
                        controller: 'ProtegeController'
>>>>>>> 045236a45dab1d3aa05d6d016f3b2481bf4f1963
                    }
                }
            })

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go("app.home");
        });

        $ionicConfigProvider.backButton.text('Atrás').icon('ion-chevron-left');
        $ionicConfigProvider.navBar.alignTitle("center");
        $ionicConfigProvider.tabs.position("bottom");
        $ionicConfigProvider.tabs.style("standard");
    }
})();
