// Los models son para crear el objeto que se utilizará en la db y vamos a usar mongoose para que sea mas sencillo

const { Schema, model } = require('mongoose')

// Esquema de Game
const gameSchema = Schema({
  name: String,
  price: Number,
  platform: Array
})

// Indicamos como queremos devolver el json
gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Game = model('Game', gameSchema)// Recordar que Mongoose toma el 'Game' y lo trasforma a 'games' para la coleccion de la bd// el gameSchema es el schema que va a tener esta coleccion

module.exports = Game
