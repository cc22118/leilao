const express = require("express")
const logadoMiddleware = require("../middleware/logado")
const Produto = require("../database/dba/produto")
const ProdutoDBQ = require("../database/dbq/produto")
const LeilaoDBQ = require("../database/dbq/leilao")
const Leilao = require("../database/dba/leilao")

const produtoRoutes = express.Router()

produtoRoutes.get("/list/all", async (req, res) => {
  return res.status(200).json(await ProdutoDBQ.buscarTodos())
})

produtoRoutes.get("/list", async (req, res) => {
  const { id_vendedor } = req.query

  const produtos = await ProdutoDBQ.buscarTodos()

  if(!produtos)
    return res.status(400).json({ error: "erro ao buscar produtos" })
  return res.status(200).json(produtos.filter(produto => (id_vendedor && produto.id_vendedor === id_vendedor)))
})

//------------[ Middlewares de login ]------------//

produtoRoutes.use(logadoMiddleware)

//---------------[ Somente Logado ]---------------//

produtoRoutes.post("/", async (req, res) => {
    const { nome, descricao, urlFoto, valorMinimo } = req.body

    if(req.user.cargo !== "admin" || req.user.cargo !== "vendedor")
      return res.status(403).json({ error: "você não possui autorização" })

    if(!nome || !descricao || !urlFoto || !valorMinimo)
      return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })

    const produto = ProdutoDBQ.criar(new Produto(0, nome, req.user.id, descricao, urlFoto, valorMinimo))
    if(!produto)
        return res.status(400).json({ error: "erro ao criar lance" })
    return res.status(201).json({ message: "lance criado com sucesso" })
})

produtoRoutes.post("/:id/auction", async (req, res) => {
  const { id } = req.params

  if(req.user.cargo !== "admin" || req.user.cargo !== "vendedor")
    return res.status(403).json({ error: "você não possui autorização" })

  if(!id)
    return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })

  const produto = await ProdutoDBQ.buscarPorId(id)

  if(!produto)
    return res.status(400).json({ error: "produto não encontrado" })

  if(produto.id_vendedor !== req.user.id)
    return res.status(403).json({ error: "você não possui autorização" })

  if(!await LeilaoDBQ.criar(Leilao(0, id, new Date(), new Date())))
    return res.status(400).json({ error: "erro ao criar leilão" })
  return res.status(201).json({ message: "leilão criado com sucesso" })
})

produtoRoutes.post("/:id/auction/end", async (req, res) => {
  const { id } = req.params

  if(req.user.cargo !== "admin" || req.user.cargo !== "vendedor")
    return res.status(403).json({ error: "você não possui autorização" })

  if(!id)
    return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })
  
  const produto = await ProdutoDBQ.buscarPorId(id)

  if(!produto)
    return res.status(400).json({ error: "produto não encontrado" })

  if(produto.id_vendedor !== req.user.id)
    return res.status(403).json({ error: "você não possui autorização" })

  const leilao = await LeilaoDBQ.buscarPorIdProduto(id)

  if(!leilao)
    return res.status(400).json({ error: "leilão não encontrado" })

  if(!await LeilaoDBQ.atualizar(leilao.id, {
    ...leilao,
    dataFim: new Date()
  }))
    return res.status(400).json({ error: "erro ao finalizar leilão" })

  return res.status(200).json({ message: "leilão finalizado com sucesso" })
})

produtoRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params

    if(req.user.cargo !== "admin" || req.user.cargo !== "vendedor")
      return res.status(403).json({ error: "você não possui autorização" })

    if(!id)
        return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })

    const produto = await ProdutoDBQ.buscarPorId(id)
    if(!produto)
        return res.status(400).json({ error: "produto não encontrado" })

    const produtoDeletado = await ProdutoDBQ.deletar(id)
    if(!produtoDeletado)
        return res.status(400).json({ error: "erro ao deletar produto" })
    return res.status(200).json({ message: "produto deletado com sucesso" })
})

produtoRoutes.put("/:id", async (req, res) => {
    const { id } = req.params
    const { nome, descricao, urlFoto, valorMinimo } = req.body

    if(req.user.cargo !== "admin" || req.user.cargo !== "vendedor")
      return res.status(403).json({ error: "você não possui autorização" })

    if(!id)
      return res.status(400).json({ error: "parâmetros incorretos ou tipos inválidos" })
    
    const produto = await ProdutoDBQ.buscarPorId(id)
    if(!produto)
      return res.status(400).json({ error: "produto não encontrado" })
    
    if(!await ProdutoDBQ.atualizar(id, {
      nome: nome || produto.nome,
      descricao: descricao || produto.descricao,
      urlFoto: urlFoto || produto.urlFoto,
      valorMinimo: valorMinimo || produto.valorMinimo
    }))
      return res.status(400).json({ error: "erro ao atualizar produto" })
    return res.status(200).json({ message: "produto atualizado com sucesso" }) 
})

module.exports = produtoRoutes