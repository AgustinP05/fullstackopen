const supertest = require('supertest') // Lo importamos para poder usar esa libreria
const { app, server } = require('../server.js') // Importamos el api app que utilizabamos para hacer put, post, get, delete. Ya que queremos testear los endpoints //Tambien importamos server para cerrarlo cuando se terminen todos los test
const mongoose = require('mongoose')

const api = supertest(app)// Le hacemos supertest a la api

// La funcion que se evalua dentro del test siempre tiene que ser asincrona porque tiene que esperar a que se termine de ejecutar la api y las funciones que hace
test('games are returned as json', async () => {
  await api
    .get('/games')
    .expect(200)
    .expect('Content-Type', /application\/json/)// Esperamos tambien que sea un json. Lo del segundo parametro es una expresion regular regex
})

// Cerramos  la coneccion con la base de datos y del servidor luego de realizar todos los test para que no quede abierto
afterAll(() => {
  mongoose.connection.disconnect()
  server.close()
})
