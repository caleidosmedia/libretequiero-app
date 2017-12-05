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
        var setStatus = function (status) {
            _status = status;
            window.localStorage['offline'] = _status;

            if (status != "") {
                return true;
            } else {
                return false;
            }
        }

        var setData = function (data) {
            window.localStorage['data_animals'] = JSON.stringify(data);
        };

        var getData = function () {
            return JSON.parse(window.localStorage['data_animals']);
        };

        return {
            setData: setData,
            getData: getData,
            setStatus: setStatus,
            isOffline: function () {
                return _status ? true : false;
            },
            removeOffline: function () {
                window.localStorage.removeItem("offline");
                window.localStorage.removeItem("data_animals");
                _status = null;
            }
        }
    }
})();
