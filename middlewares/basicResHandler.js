// var logger = require('../lib/logger')

function serverError(res, ex){
  const sc = 500
  logger.error(`${sc} - Exception, ${res.req.method} - ${res.req.originalUrl}`, ex)
  res.status(sc).send({msg: 'Sorry, something went wrong!'})
}

function clientError(res, msg){
  const sc = 400
  logger.warn(`${sc} - Client error, ${res.req.method} - ${res.req.originalUrl}`, msg)
  res.status(sc).send({msg})
}

function unauthorised(res, msg){
  const sc = 401
  logger.warn(`${sc} - Unauthorised, ${res.req.method} - ${res.req.originalUrl}`)
  res.status(sc).send({msg})
}

function success(res, obj){
  const sc = 200
  logger.verbose(`${sc} - Success, ${res.req.method} - ${res.req.originalUrl}`)
  res.status(sc).send(obj)
}

function notFound(res, msg){
  const sc = 404
  logger.verbose(`${sc} - NotFound, ${res.req.method} - ${res.req.originalUrl}`)
  res.status(sc).send({msg})
}

module.exports = {
  serverError,
  clientError,
  unauthorised,
  success,
  notFound
}
