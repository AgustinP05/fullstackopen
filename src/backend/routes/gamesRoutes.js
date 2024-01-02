// Todas las rutas express(backend) asociadas a la coleccion games

const express = require('express')

const appGames = express() // Iniciamos la aplicacion express

// Modelos de las colecciones de la db
const Game = require('../models/Game.js')// Llamamos el modelo 'games' que vamos a usar manipular// Dentro de Game estará el objeto que contiene la coleccion 'games'

//
// Cuando se haga un GET en la ruta '/games' Busca todos los juegos de la lista
appGames.get('/', (req, res, next) => {
  Game.find({}).then((games) => {
    res.json(games)
  }).catch(err => next(err))
})

// Cuando se haga un GET en la ruta '/games', le podemos pasar un id}
// Este lo vamos a utilizar para buscar un objeto por ID
appGames.get('/:id', (req, res, next) => {
  const { id } = req.params // Aquí tomamos el texto _id de la url

  Game.findById(id).then((game) => {
    return game ? res.json(game) : res.status(404).end() // Recordar que es .json porque es un objeto
  }).catch((err) => {
    next(err)
  })

  // const game = games.filter(game => game.id.$oid === id)// Recorremos la lista hasta encontrar el elemento con la misma _id
  // console.log(game)
})

// Para actualizar un objeto de la lista
appGames.put('/:id', (req, res, next) => {
  const { id } = req.params // Aquí tomamos el texto _id de la url
  const game = req.body // Aquí tomamos el texto del objeto del rest
  const PLATFORMliststring = process.env.PLATFORM // los dotenv vienen en string
  const PLATFORMlistsarray = JSON.parse(PLATFORMliststring)// pasamos la lista de string a array

  const newGameInfo = { // Declaracion del constructor del objeto
    name: game.name,
    price: game.price,
    platform: game.platform
  }

  if (newGameInfo.platform.every(platform => PLATFORMlistsarray.includes(platform))) {
    Game.findByIdAndUpdate(id, newGameInfo, { new: true })// La id se actualizará con el newGameInfo//el new:true es para que el resultado updatedGame nos devuelva el nuevo resultado modificado, sino nos devuelve el objeto original encontrado por ID
      .then((updatedGame) => {
        res.status(200).json({
          'NEW VERSION': updatedGame
        }).end()
      })
      .catch((err) => {
        next(err)
      })
  } else {
    res.status(400).send({ error: 'Platform used is malformed' })
  }
})

// Para borrar un objeto de la lista
appGames.delete('/:id', (req, res, next) => {
  const { id } = req.params // Aquí tomamos el texto _id de la url
  console.log(id)

  Game.findByIdAndDelete(id)
    .then((deletedGame) => {
      res.status(204).end() // Enviamos 204 (No Content) porque el recurso se eliminó con éxito
    })
    .catch((err) => {
      next(err)
    })
})

appGames.post('/', (req, res, next) => {
  const game = req.body // Aquí tomamos el texto del rest
  const PLATFORMliststring = process.env.PLATFORM // los dotenv vienen en string
  const PLATFORMlistsarray = JSON.parse(PLATFORMliststring)// pasamos la lista de string a array

  const newGame = new Game({ // Declaracion del constructor del objeto
    name: game.name,
    price: game.price,
    platform: game.platform
  })

  if (newGame.platform.every(platform => PLATFORMlistsarray.includes(platform))) { // Verificamos si las plataformas asignadas son correctas
    // // Guardamos el objeto en la bd
    newGame.save()
      . then(savedGame => {
        console.log(savedGame)
        res.json(savedGame).end()
        // mongoose.connection.close()
      })
      . catch(err => {
        next(err)
      })
  } else {
    res.status(400).json({
      error: 'platform used is malformed'
    }).end()
  }

  // games = [...games, newGame] // Agregamos el nuevo juego a la lista //Para listas locales

  console.log(newGame)

  res.status(201).json(newGame) // Recordar que es .json porque es un objeto//Enviamos el nuevo objeto como json
})

module.exports = appGames
