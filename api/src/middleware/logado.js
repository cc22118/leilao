const TokenAdmin = require("../utils/token")
module.exports = (req, res, next) => {
  if(!req.headers.authorization)
    return res.status(401).json({ error: "token não informado" })
  const contents = req.headers.authorization.split(" ")
  if(contents[0] !== "Bearer")
    return res.status(401).json({ error: "token mal formatado" })
  if(!contents[1])
    return res.status(401).json({ error: "token não informado" })
  TokenAdmin.validar(contents[1], (err, decoded) => {
    if(err)
      return res.status(401).json({ error: "token inválido" })
    req.user = decoded

    next()
  })
}