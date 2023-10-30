const express = require("express")
const Cliente = require("../database/dba/cliente")
const logadoMiddleware = require("../middleware/logado")
const indentificarMiddleware = require("../middleware/identificar")
const clienteRoutes = express.Router()

clienteRoutes.get("/login", (req, res) => {
    const { email, senha } = req.body
    if(req.body.length !== 2)
        res.status(401).json({ error: "não estão sendo passados os 6 parâmetros" })
    if(Cliente.validaEmail(email) && Cliente.validaSenha(senha))
        res.status(401).json({ error: "parâmetros incorretos ou tipos inválidos" })
})

clienteRoutes.post("/", (req, res) => {
    const { cargo, nome, email, endereco, senha, urlAvatar } = req.body
    if(req.body.length !== 6)
        res.status(401).json({ error: "não estão sendo passados os 6 parâmetros" })
    if(Cliente.validaCargo(cargo) && Cliente.validaNome(nome) && Cliente.validaEmail(email) && Cliente.validaEndereco(endereco) && Cliente.validaSenha(senha) && (!urlAvatar || Cliente.validaUrlAvatar(urlAvatar)))
        res.status(401).json({ error: "parâmetros incorretos ou tipos inválidos" })
})

//------------[ Middlewares de login ]------------//

clienteRoutes.use(logadoMiddleware)
clienteRoutes.use(indentificarMiddleware)

//---------------[ Somente Logado ]---------------//

clienteRoutes.get("/all", (req, res) => {
    if(req.user.cargo !== "admin")
        res.status(403).json({ error: "você não possui autorização" })
})

clienteRoutes.get("/:id", (req, res) => {
    const { id } = req.params
    if(req.user.cargo !== "admin" && req.user.id !== id)
        res.status(403).json({ error: "você não possui autorização" })
    if(Cliente.validaId(id))
        res.status(400).json({ error: "id inválido" })
})

clienteRoutes.put("/:id", (req, res) => {
    const { id } = req.params
    const { cargo, nome, email, endereco, senha, urlAvatar } = req.body
    if(req.user.cargo !== "admin" && req.user.id !== id)
        res.status(403).json({ error: "você não possui autorização" })
    if(req.body.length !== 6)
        res.status(400).json({ error: "não estão sendo passados os 6 parâmetros" })
    if(Cliente.validaId(id) && Cliente.validaCargo(cargo) && Cliente.validaNome(nome) && Cliente.validaEmail(email) && Cliente.validaEndereco(endereco) && Cliente.validaSenha(senha) && (!urlAvatar || Cliente.validaUrlAvatar(urlAvatar)))
        res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })
})

clienteRoutes.delete("/:id", (req, res) => {
    const { id } = req.params
    if(req.user.cargo !== "admin" && req.user.id !== id)
        res.status(403).json({ error: "você não possui autorização" })
    if(Cliente.validaId(id))
        res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })
})

module.exports = clienteRoutes