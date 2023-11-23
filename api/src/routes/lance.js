const express = require("express")
const Lance = require("../database/dba/lance")
const LanceDBQ = require("../database/dbq/lance")
const logadoMiddleware = require("../middleware/logado")

const lanceRoutes = express.Router()

lanceRoutes.get("/:id_leilao/last", async (req, res) => {
  const { id_leilao } = req.params

  if(!id_leilao)
    return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })

  const lance = await LanceDBQ.buscarUltimoLance(id_leilao)
  if(!lances)
    return res.status(400).json({ error: "erro ao buscar lances" })
  return res.status(200).json(lance)
})

lanceRoutes.get("/:id_leilao/first", async (req, res) => {
  const { id_leilao } = req.params

  if(!id_leilao)
    return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })

  const lance = await LanceDBQ.buscarPrimeiroLance(id_leilao)
  if(!lances)
    return res.status(400).json({ error: "erro ao buscar lances" })
  return res.status(200).json(lance)
})

lanceRoutes.get("/:id_leilao/list", async (req, res) => {
  const { id_leilao } = req.params

  if(!id_leilao)
    return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })

  const lances = await LanceDBQ.buscarTodosDe(id_leilao)
  if(!lances)
    return res.status(400).json({ error: "erro ao buscar lances" })
  return res.status(200).json(lances)
})

//------------[ Middlewares de login ]------------//

lanceRoutes.use(logadoMiddleware)

//---------------[ Somente Logado ]---------------//

lanceRoutes.post("/", async (req, res) => {
    const { valor, idLeilao } = req.body
    if(!valor || !idLeilao)
        return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })

    const data = new Date()

    const lance = await LanceDBQ.criar(new Lance(idLeilao, req.user.id, valor, `${data.getDay()}-${data.getMonth()}-${data.getFullYear()}`))
    if(!lance)
        return res.status(400).json({ error: "erro ao criar lance" })
    return res.status(201).json({ message: "lance criado com sucesso" })
})

lanceRoutes.get("/list/all", async (req, res) => {
    if(req.user.cargo !== "admin")
        return res.status(403).json({ error: "você não possui autorização" })
    return res.status(200).json(await LanceDBQ.buscarTodos())
})

module.exports = lanceRoutes