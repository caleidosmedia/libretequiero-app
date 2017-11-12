(function() {
    'use strict';

    angular
    .module('atrapa')
    .factory('ReconoceService', ReconoceService);

    ReconoceService.$inject = [
        '$log',
        '$http',
        'apiUrl',
        '$q'
    ];

    function ReconoceService(
        $log,
        $http,
        apiUrl,
        $q
    ) {
        var service = {
            search: search,
            searchID: searchID
        };

        return service;

        function searchID(id) {
            return $http({
                url: apiUrl+'animales/'+id,
                method: 'GET'
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

        function search(taxonomia, grupo, color, color_secundario) {
            if (color === null) {
                var data = {
                    taxonomia: taxonomia,
                    grupo: grupo
                };
            } else if(color_secundario === null) {
                var data = {
                    taxonomia: taxonomia,
                    grupo: grupo,
                    color: color
                };
            } else {
                var data = {
                    taxonomia: taxonomia,
                    grupo: grupo,
                    color: color,
                    color_secundario: color_secundario
                };
            }

            return $http({
                url: apiUrl+"animales/search",
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
