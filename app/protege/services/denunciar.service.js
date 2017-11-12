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
