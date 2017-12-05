(function() {
    'use strict';

    angular
    .module('atrapa')
    .factory('ExploraService', ExploraService);

    ExploraService.$inject = [
        '$log',
        '$http',
        'apiUrl',
        '$q'
    ];

    function ExploraService(
        $log,
        $http,
        apiUrl,
        $q
    ) {
        var service = {
            list: list,
        };

        return service;

        function list(page) {


            if (page === false) {
                var data = {
                    paginate: false
                };
            } else {
                var data = {
                    page: page
                };
            }

            return $http({
                url: apiUrl+"animales",
                method: 'GET',
                params: data
            })
            .then(infoSuccess)
            .catch(infoFailed);

            function infoSuccess(response) {
                return response.data;
            }

            function infoFailed(error) {
                return $q.reject(error);
            }
        }
    }
})();
