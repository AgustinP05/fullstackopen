module.exports = (error, req, res, next) => {
  console.error(error)
  console.log(error.name)

  const errorStatusMapping = {
    CastError: 400,
    ValidationError: 400

  }

  const statusCode = errorStatusMapping[error.name] || 500

  res.status(statusCode).end()
}
