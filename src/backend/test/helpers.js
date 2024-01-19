// Archivo utilizado para dejar los archivos test mas limpios y factorizados
const { app } = require('../server.js') // Importamos el api app que utilizabamos para hacer put, post, get, delete. Ya que queremos testear los endpoints //Tambien importamos server para cerrarlo cuando se terminen todos los test

const supertest = require('supertest') // Lo importamos para poder usar esa libreria
const api = supertest(app)// Le hacemos supertest a la api de la app
// Lista de juegos para pruebas
const initialGames = [

  {

    name: 'Achilles',
    price: 25,
    platform: ['PC']
  },
  {

    name: 'Breathedge',
    price: 35,
    platform: ['PC']
  },
  {

    name: 'Portal 2',
    price: 15,
    platform: ['PC']
  }

]

const getAllGames = async () => {
  const response = await api.get('/games')
  return {
    gameList: response.body.map((game) => game)
  }
}

const getAllGamePrices = async () => {
  const response = await api.get('/games')
  return {
    prices: response.body.map((game) => game.price)
  }// Hacemos que prices sea un array que contenga todos los precios
}

const getAllGameNames = async () => {
  const response = await api.get('/games')
  return {
    names: response.body.map((game) => game.name) // Tomamos todos los nombres de la lista
  }// Hacemos que prices sea un array que contenga todos los precios
}

module.exports = {
  initialGames,
  api,
  getAllGamePrices,
  getAllGameNames,
  getAllGames
}
