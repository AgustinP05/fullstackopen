// Hay que activar la conexion con el servidor con node src\backend\server.js
/// / Punto de entrada para servidor node.js
require('dotenv').config() // Para leer el archivo .env

require('./db/mongo.js')// Conexion a bd mongo

const express = require('express')// importar express

const app = express() // Iniciamos la aplicacion
const cors = require('cors')// middleware para evitar el bloqueo de Cross-origin resource sharing, es decir evitar el bloqueo que se hace cuando un dns distinto se cruce y envie recursos a nuestra pagina

app.use(express.json()) // MiddleWare Para tomar el body de la solicitud HTTP y convertirlo a json para utilizarlo. Con esto podemos utilizar el body en el codigo
// const connectionString = 'mongodb+srv://agustinperea5:imAOGySggQSFQKFi@cluster0.y6fnpsr.mongodb.net/?retryWrites=true&w=majority'
app.use(cors())// activamos cors

// Importamos las funciones HTTP de las rutas
const appGames = require('./routes/gamesRoutes.js')

// MiddleWare verificar path inicial
const logger = require('./middlewares/loggerMiddleware.js')// importamos middleware path inicial
const notFound = require('./middlewares/notFound.js')
const handleError = require('./middlewares/handleError.js')
/// ////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(logger)

// routes:
app.use('/games', appGames)// Cuando se hagan pedidos a /games/...
//

// middleware que se activa si hay un error
app.use(notFound)
app.use(handleError)

/// configuracion de puerto //El servidor funcionará en el peurto 3001 mientras que el front funciona en el 3000
const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => { // el app.listen devuelve el servidor que se ha creado
  console.log(`Server running on port ${PORT}`)
})

module.exports = {
  app,
  server
}
