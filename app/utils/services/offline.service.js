(function() {
    'use strict';

    angular
    .module('atrapa')
    .factory('Offline', Offline);

    Offline.$inject = [
        '$log',
        '$http',
        '$state'
    ];

    function Offline(
        $log,
        $http,
        $state
    ) {

        if (window.localStorage['offline']) {
            var _status = window.localStorage['offline'];
        }
        var setOffline = function (status) {
            _status = status;
            window.localStorage['offline'] = _status;

            if (status != "") {
                return true;
            } else {
                return false;
            }
        }

        return {
            setStatus: setStatus,
            isOffline: function () {
                return _status ? true : false;
            },
            removeOffline: function () {
                window.localStorage.removeItem("offline");
                _status = null;
            }
        }
    }
})();
