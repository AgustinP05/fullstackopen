// archivo para conexion a mongo

const mongoose = require('mongoose')// Driver que nos va a ayudar a conectarnos de manera mas facil a la base de datos y nos permite crear schemas de manera mas intuitiva

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

// Si el entorno de desarrollo (NODE_ENV) es test, se utiliza el string para test, sino el otro
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

// conexion a mongoDB
mongoose.connect(connectionString)
  . then(() => console.log('Database connected'))
  . catch(err => console.error(err))

process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
