const express = require("express")
const Cliente = require("../database/dba/cliente")
const ClienteDBQ = require("../database/dbq/cliente")
const logadoMiddleware = require("../middleware/logado")
const clienteRoutes = express.Router()

//---------------[ Somente Deslogado ]---------------//

clienteRoutes.get("/login", async (req, res) => {
    const { email, senha } = req.body
    if(Cliente.validaEmail(email) && Cliente.validaSenha(senha))
        res.status(401).json({ error: "parâmetros incorretos ou tipos inválidos" })

    const jwt = await ClienteDBQ.logar(email, senha)
    if(!jwt)
        return res.status(401).json({ error: "email ou senha incorretos" })
    return res.status(200).json({ message: "logado com sucesso", token: jwt })
})

clienteRoutes.post("/", async (req, res) => {
    const { cargo, nome, email, endereco, senha, urlAvatar } = req.body
    if(Cliente.validaCargo(cargo) && Cliente.validaNome(nome) && Cliente.validaEmail(email) && Cliente.validaEndereco(endereco) && Cliente.validaSenha(senha) && (!urlAvatar || Cliente.validaUrlAvatar(urlAvatar)))
        res.status(401).json({ error: "parâmetros incorretos ou tipos inválidos" })

    const cliente = new Cliente(0, cargo, nome, email, endereco, senha, urlAvatar)
    if(!await ClienteDBQ.criar(cliente))
        return res.status(401).json({ error: "erro ao criar cliente", message: "não pode existir contas diferentes com o mesmo email" })
    return res.status(201).json({ message: "cliente criado com sucesso" })
})

//------------[ Middlewares de login ]------------//

clienteRoutes.use(logadoMiddleware)

//---------------[ Somente Logado ]---------------//

clienteRoutes.get("/all", async (req, res) => {
    if(req.user.cargo !== "admin")
        return res.status(403).json({ error: "você não possui autorização" })
    return res.status(200).json(await ClienteDBQ.buscarTodos())
})

clienteRoutes.get("/info", async (req, res) => {
    return res.status(200).json(req.user)
})

clienteRoutes.get("/:id", async (req, res) => {
    const { id } = req.params
    if(req.user.cargo !== "admin" && req.user.id != id)
        return res.status(403).json({ error: "você não possui autorização" })
    if(Cliente.validaId(id))
        return res.status(400).json({ error: "id inválido" })

    const cliente = await ClienteDBQ.buscarId(id)

    if(!cliente)
        return res.status(404).json({ error: "cliente não encontrado" })
    
    return res.status(200).json(cliente)
})

clienteRoutes.put("/:id", (req, res) => {
    const { id } = req.params
    const { cargo, nome, email, endereco, senha, urlAvatar } = req.body
    if(req.user.cargo !== "admin" || req.user.id != id)
        res.status(403).json({ error: "você não possui autorização" })
    if(Cliente.validaId(id) && Cliente.validaCargo(cargo) && Cliente.validaNome(nome) && Cliente.validaEmail(email) && Cliente.validaEndereco(endereco) && Cliente.validaSenha(senha) && (!urlAvatar || Cliente.validaUrlAvatar(urlAvatar)))
        res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })
})

clienteRoutes.delete("/:id", (req, res) => {
    const { id } = req.params
    if(req.user.cargo !== "admin" && req.user.id != id)
        res.status(403).json({ error: "você não possui autorização" })
    if(Cliente.validaId(id))
        res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })
})

module.exports = clienteRoutes