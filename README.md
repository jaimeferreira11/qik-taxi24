<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 # Taxi24
 Taxi24 es una nueva startup que quiere revolucionar la industria del transporte proporcionando una solución de marca blanca

## Description

Prueba tecnica de QIK



## Ejecutar en desarrollo


### Prerequisitos

- Nodejs
- Nestjs CLI
- Docker engine


### Ejecución
1. Clonar el repositorio
2. Instalar las dependencias.
bash
```
yarn install
```

3. Instalar Nest CLI
bash
```
npm i -g @nestjs/cli
```

4. Leventar el docker de la base de datos
bash
```
docker-compose up -d
```

5. Clonar el archivo ```.env.template``` y renombrar la copia a  ```.env``` y modificar las variables de entorno, si requiere.



6. Instalacion de las dependencias

```bash
$ yarn install
```

7. Ejecutar la aplicación

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Documentación de APIs

__Swagger__

[http://localhost:3000/api/api-docs#/](http://localhost:3000/api/api-docs#/)

## Como probar

Una vez realizados los pasos anteriores, insertar datos de prueba en la base de Mongo, invocando el API:

POST
```
http://localhost:3000/api/v1/seed/mongo
```

__Que realiza la inserciones de:__
- 30 Conductores, la cantidad se puede modificar en el archivo `.env` (CANT_DRIVERS_DUMMY)
- 10 Pasajeros, la cantidad se puede modificar en el archivo `.env` (CANT_PASSENGERS_DUMMY)
- 10 Viajes con estado en progreso.

<br>

__Obs:__ Los conductores y los pasajeros se crean con una ubicacion geografica dentro de los 10km a la redonda de una ubicación central definidad en el archivo `.env` (CENTER_CORDINATES_LAT y CENTER_CORDINATES_LNG)

Ahora estás listo para probar las APIs. Revisar la documentacion de las [api-docs](http://localhost:3000/api/api-docs#/)


## Stack utilizado
* NestJs
* MongoDB
* Docker

### Librerías
* Mongoose


## Autor

Jaime Ferreira [@jaimeferreira11](www.linkedin.com/in/jaimeferreira11)



