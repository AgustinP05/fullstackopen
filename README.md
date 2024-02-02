Ejercitacion de los contenidos de fullstackopen.
Es creado utilizando Next.js, Tailwind, Node, base de datos MongoDB con express, ademas de mongoose.

Next.js (React) para crear toda la pagina, tanto las vistas como el enrutamiento

Tailwind para los estilos

Base de datos MongoDB para almacenar los productos.
Express es un framework de node para crear el servidor (en backend).
Mongoose es una libreria que sirve para configurar la conexion con la bd

Para el arcvhico .env hay que instalar npm install dotenv. Lo importamos y activamos con require('dotenv').config()

Axios para conectar la base de datos (en frontend)

middlewares interceptan la peticion que pasa por la API para que sea mas seguro. Cors permite recibir solicitudes de un dominio diferente al de la pagina cargada . Usamos cors gracias a npm install cors -E

Vamos a usar Jest para tests unitarios (evaluan una cosa en concreto). Lo instalamos con npm install jest -D porque es una dependencia de desarrollo. Recordar que Jest esta pensado para trabajar por defecto en el lado del cliente, y yo lo quiero usar en node, entonces hay que aclararlo en las dependencias con

"jest":{
    "testEnvironment":"node"
  }
Ademas, Eslint se va a quejar porque no reconoce las funciones de jest. Por lo tanto tenemos que agregar en el eslintCongif de package.json lo el env jest true como muestro aquí

"eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json",
    "env":{
      "jest": true
    }
  }
Tambien en el package.json he agregado el escript test para jest

"test":"jest --verbose --silent --detectOpenHandles" así se puede hacer npm run test para testear. El verbose es para que me explique varias cosas. El silent para que no me muestre los console log de las cosas que quiero testear. eldetectOpenHandles es para ver las conecciones que quedaron abiertas al finalizar el test y este ultimo se puede borrar luego de probar una vez que las conecciones se cierren.

Para usar variables de entorno en windows hay que intalar npm install cross-env y modificar lo siguiente en package.json.

"scripts": {
    "dev": "cross-env NODE_ENV=development next dev",
    "build": "next build",
    "start": "cross-env NODE_ENV=production next start",
    "lint": "next lint",
    "test": "cross-env NODE_ENV=test jest --verbose --silent --detectOpenHandles"
  }
Para hacer test de integracion (testean mas de una funcion) para testear los endpoints del servidor, vamos a usar el npm install supertest -D

El proyecto se inicia gracias al npm run dev. El backend se inicia gracias al node src\backend\server.js que lo he modificado para usar npm run server.

"server":"cross-env NODE_ENV=development node src/backend/server.js"

‌

Podemos hacer un script para testear que se mantenga verificando cada vez que guardamos para evitar hacer npm run test a cada rato.

"test:watch": "cross-env NODE_ENV=test jest --verbose --silent --watch"

o tambien resumido "test:watch": "npm run test -- --watch"

y correrlo con npm run test:watch

Para encriptar la contraseña del usuario voy a usar el npm install bcrypt
