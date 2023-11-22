import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import ProductConnection, { Product } from "../../services/product"
import "./style.css"
import LanceConnection from "../../services/lance"
import validateToken from "../../services/token"

export default function Produto() {
  const { id } = useParams()
  
  const [produto, setProduto] = 
  useState<(Product & {
    id_criador: number
    nome_criador: string
    avatar_criador: string
    primeiro_lance?: number
    ultimo_lance?: number
  }) | false>()

  async function handleProduto() {
    await ProductConnection.getById(parseInt(id!!))
      .then(async (e) => {
        if(!e.ok) return setProduto(false)
        setProduto(await e.json())
      })
      .catch(e => {
        setProduto(false);
      })
  }

  useEffect(() => {
    // validar token
    if(!validateToken())
      window.location.href = "/login"

    handleProduto()
  }, [])

  return produto ? (
    <main id="produto">
      <Link to={"/criador/"+produto.id_criador} className="criador">
        <img src={produto.avatar_criador} alt="" />
        <p>{produto.nome_criador}</p>
      </Link>
      <img src={produto.urlFoto} alt={produto.nome} />
      <div>
        <h1>{produto.nome}</h1>
        <h2>{produto.descricao}</h2>
        <p>{produto.valorMinimo}</p>
      </div>
    </main>
  ) : produto === false? (
    <>
      <h1>Erro 404</h1>
      <p>Produto não encontrado</p>
    </>
  ) : (
    <>Carregando...</>
  )
}