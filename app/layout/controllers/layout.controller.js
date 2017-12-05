(function() {
    'use strict';

    angular
    .module('atrapa')
    .controller('LayoutController', LayoutController);

    LayoutController.$inject = [
        '$scope',
        '$state',
        '$rootScope'
    ];

    function LayoutController(
        $scope,
        $state,
        $rootScope
    ) {
        $scope.goState = function (page) {
            $state.go(page);
        };
    }
})();


