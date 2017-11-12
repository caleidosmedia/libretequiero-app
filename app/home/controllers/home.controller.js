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


