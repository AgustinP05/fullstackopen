const { server } = require('../server.js') // Importamos el api app que utilizabamos para hacer put, post, get, delete. Ya que queremos testear los endpoints //Tambien importamos server para cerrarlo cuando se terminen todos los test
const Game = require('../models/Game.js')
const mongoose = require('mongoose')

const { initialGames, api, getAllGamePrices, getAllGameNames, getAllGames } = require('./helpers.js')

// Antes de cada test
beforeEach(async () => {
  await Game.deleteMany({})// Borramos todos los documentos que habria en la coleccion por las dudas

  // // Agregamos los documentos de prueba
  // const game1 = new Game(initialGames[0])
  // await game1.save()

  // const game2 = new Game(initialGames[1])
  // await game2.save()

  // const game3 = new Game(initialGames[2])
  // await game3.save()

  // // Paralelo
  // const gameObjects = initialGames.map((game) => new Game(game))
  // const promises = gameObjects.map((game) => game.save())
  // await Promise.all(promises) //Devuelve una promesa cuando todas las promesas en el parametro hayan sido concluidas con exito

  // Secuencial //Es mejor for en este caso en lugar de foreach ya que podria hacerlos en desorden. Es decir con for es mas controlado
  for (const game of initialGames) {
    const gameObject = new Game(game)
    await gameObject.save()
  }
})

describe('GET /games', () => {
  // La funcion que se evalua dentro del test siempre tiene que ser asincrona porque tiene que esperar a que se termine de ejecutar la api y las funciones que hace
  test('games are returned as json', async () => {
    await api
      .get('/games')// Esta response tendra en su body el array con los juegos obtenidos en esa ruta games
      .expect(200)// Siempre al enviar,eliminar o hacer algo con informacion tenemos que esperar un status
      .expect('Content-Type', /application\/json/)// Esperamos tambien que sea un json. Lo del segundo parametro es una expresion regular regex
  })

  test('there are three games', async () => {
    const response = await api.get('/games')
    expect(response.body).toHaveLength(initialGames.length)
  })

  test('game with price 35', async () => {
    const { prices } = await getAllGamePrices()
    expect(prices).toContain(35)
  })
})

describe('POST /games/:id', () => {
  test('game added succesfully', async () => {
    const newGame = {
      id: 4,
      name: 'Fallout',
      price: 30,
      platform: ['PC']
    }
    await api.post('/games')
      .send(newGame)// Funcion de supertest para enviar informacion a la bd
      .expect(201)// Siempre por las dudas. Depende el numero por el caso
      .expect('Content-Type', /application\/json/)// Siempre por las dudas

    // Nos aseguramos que se ha añadido el nuevo documento
    const response = await api.get('/games') // Tomamos toda la informacion que viene en esa ruta
    expect(response.body).toHaveLength(initialGames.length + 1) // verificamos que ahora la lista de la bd tiene un documento mas que la la lista initialGames

    const { names } = await getAllGameNames() // Tomamos todos los nombres de la lista
    expect(names).toContain('Fallout') // Verificamos que en la lista de juegos hay uno que se llama así
  })

  test('game without name is not added', async () => {
    const newGame = {
      id: 5,
      // name: 'Fallout',
      price: 30,
      platform: ['PC']
    }
    await api.post('/games')
      .send(newGame)
      .expect(400)

    // La nota no se deberia haber añadido
    const response = await api.get('/games')
    expect(response.body).toHaveLength(initialGames.length) // verificamos la lista de la bd tenga la misma cantidad que la lista initialGames ya que no se debería de haber agregado nada
  })
})

describe('DELETE /games/:id', () => {
  test('a note can be deleted', async () => {
    const { gameList: firstResponse } = await getAllGames() // Llamamos a gameList de getAllGames y le ponemos el apodo de firstResponse para luego volverlo a llamar actualizado con el apodo de secondResponse
    console.log(firstResponse[0])
    const gameToDelete = firstResponse[0]

    await api
      .delete(`/games/${gameToDelete.id}`)
      .expect(204)

    const { gameList: secondResponse } = await getAllGames()// Volvemos a llamar a la lista actualizada para ver si tiene un objeto menos que antes
    console.log(secondResponse)
    expect(secondResponse).toHaveLength(initialGames.length - 1)
    expect(secondResponse).not.toContain(gameToDelete)
  })

  test('a note that dont exist cant be deleted', async () => {
    await api
      .delete('/games/1234')
      .expect(400)

    const { gameList } = await getAllGames()
    expect(gameList).toHaveLength(initialGames.length)
  })
})

// Cerramos  la coneccion con la base de datos y del servidor luego de realizar todos los test para que no quede abierto
afterAll(() => {
  mongoose.connection.close()
  server.close()
})
