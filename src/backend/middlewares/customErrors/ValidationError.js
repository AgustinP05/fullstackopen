// Tipo de error utilizado cuando el usuario pone mal un dato
class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
  }
}
module.exports = ValidationError
