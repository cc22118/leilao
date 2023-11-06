// a cada requisição ele printa no console o tempo que demorou para ser processada juntamente com seus identificadores de request
module.exports = (req, _res, next) => {
  console.time(req.ip+" - "+req.method+"@"+req.originalUrl)
  next()
  console.timeEnd(req.ip+" - "+req.method+"@"+req.originalUrl)
}