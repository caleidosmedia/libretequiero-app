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


