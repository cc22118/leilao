import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import ProductConnection, { Product } from "../../services/product"
import "./style.css"
import ClienteConnection, { Cliente } from "../../services/cliente"
import validateToken from "../../services/token"

export default function Criador() {
  const { id } = useParams()
  
  const [produtos, setProdutos] = useState<Array<Product>>([])
  const [criador, setCriador] = useState<Cliente | false>()

  async function handleDados() {
    await ClienteConnection.BuscarPorId(parseInt(id!!))
    .then(async (e) => {
      if(!e.ok) setCriador(false)
      else setCriador(await e.json())
    })
    .catch(e => {})

    await ProductConnection.getByIdCriador(id!!)
      .then(async (e) => {
        setProdutos(await e.json())
      })
      .catch(e => {})
  }

  useEffect(() => {
    if(!validateToken())
      window.location.href = "/login"
    handleDados()
  }, [])

  return criador? (
    <>
      <header id="criador">
        <div className="criador">
          <img src={criador.urlAvatar} alt="" />
          <p>{criador.nome}</p>
        </div>
        <br />
        <div className="info">
          <p>{produtos.length} obras</p>
        </div>
      </header>
      <main className="listProdutos">
        {
          produtos.map((p, key) => (
            <Link to={"/produto/"+p.id} key={key} id="product">
              <img src={p.urlFoto} alt={p.nome} />
              <span>Mínimo: R$ {p.valorMinimo.toFixed(2)}</span>
            </Link>
          ))
        }
      </main>
    </>
  ) : criador === false? (
    <>
      <h1>Erro 404</h1>
      <p>Criador não existe</p>
    </>
  ) : (<>carregando...</>)
}