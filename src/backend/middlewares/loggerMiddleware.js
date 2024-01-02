const logger = (req, res, next) => { // El use y el no ponerle una ruta definida como '/games' significa que todos los pedidos (Post, put, delete, etc.) van a pasar por aquí
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log('-------')
  next()// Continuar a la siguiente solicitud de cualquier path
}

module.exports = logger
