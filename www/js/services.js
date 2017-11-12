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
            
            var data = {
                page: page,
            };

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

(function() {
    'use strict';

    angular
    .module('atrapa')
    .factory('DenunciarService', DenunciarService);

    DenunciarService.$inject = [
        '$log',
        '$http',
        'apiUrl',
        '$q'
    ];

    function DenunciarService(
        $log,
        $http,
        apiUrl,
        $q
    ) {

        var service = {
            denunciar: denunciar
        };

        return service;

        function denunciar(denuncia) {
            var url = apiUrl + 'protege/denunciar';
            console.log(url);

            var data = {
                "direccion": denuncia.direccion,
                "coordenadas": denuncia.coordenadas,
                "tipo_locacion": denuncia.tipo_locacion,
                "clase": denuncia.clase,
                "grupo": denuncia.grupo,
                "estado": denuncia.estado,
                "almacenamiento": denuncia.almacenamiento,
                "descripcion": denuncia.descripcion,
                "imagen": denuncia.imagen
            }

            return $http({
                url: url,
                method: 'POST',
                data: data,
            })
            .then(requestSuccess)
            .catch(requestFailed);

            function requestSuccess(response) {
                return response.data;
            }

            function requestFailed(error) {
                return $q.reject(error);
            }
        }

    }
})();

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

        function search(taxonomia, grupo, color) {
            if (color === null) {
                var data = {
                    taxonomia: taxonomia,
                    grupo: grupo
                };
            } else {
                var data = {
                    taxonomia: taxonomia,
                    grupo: grupo,
                    color: color
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
