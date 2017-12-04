# Libre te quiero

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

Libre te quiero es una aplicación para reconocer la fauna silvestre peruana y realizar denuncias de tráfico ilegal.

Este repositorio corresponde a la aplicación. El repositorio del backend y la api está ubicado en https://github.com/caleidosmedia/libretequiero-api.

# Screenshots
![Home](http://caleidos.pe/libre-te-quiero/home.jpg) ![Reconoce](http://caleidos.pe/libre-te-quiero/reconoce.png)


### Instalación

El proyecto utiliza [Ionic](https://ionicframework.com/)

Para realizar la instalación, luego de clonar el repositorio, se debe ingresar a la carpeta e instalar las dependencias via npm:

```sh
$ npm install -g cordova ionic
$ npm install
```

Para compilar los assets se debe utilizar el siguiente comando de gulp:  
```sh
$ gulp build
```

Renombrar el archivo www/js/app.constant.example.js a www/js/app.constant.js y apuntar el parametro apiUrl donde se encuentre montado la api del proyecto.

Para ver el proyecto en modo desarrollo utilizar los siguientes comando:
```sh
$ ionic serve
```
```sh
$ gulp watch
```

Licencia
----
[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)