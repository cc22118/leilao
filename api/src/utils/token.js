const jwt = require('jsonwebtoken')
module.exports = TokenAdmin = {
  gerar: (dados) => {
    // token expira em 2 Dias
    return jwt.sign(dados, process.env.SECRET, { expiresIn: "2D" })
  },
  validar: (token, callback) => {
    jwt.verify(token, process.env.SECRET, callback)
  }
}