import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import ProductConnection, { Product, ProductAuction } from "../../services/product"
import "./style.css"
import LanceConnection, { Lance } from "../../services/lance"
import validateToken from "../../services/token"

export default function Produto() {
  const { id } = useParams()
  
  const [produto, setProduto] = 
  useState<(ProductAuction & {
    idLeilao: number
    id_criador: number
    nome_criador: string
    avatar_criador: string
  }) | false>()

  const [lances, setLances] = useState<Array<Lance>>([])

  const [valor, setValor] = useState<number>(0)

  async function handleDados() {
    await ProductConnection.getByIdLeilao(parseInt(id!!))
      .then(async (l) => {
        if(!l.ok) return setProduto(false)
        const leilao = await l.json()
        await ProductConnection.getById(leilao.idProduto)
        .then(async (e) => {
          if(!e.ok) return setProduto(false)
          setProduto({
            ...leilao,
            ...await e.json()
          })
        })
        .catch(e => {
          setProduto(false);
        })
      })
      .catch(e => {
        setProduto(false);
      })

    setLances(await LanceConnection.BuscarLances(parseInt(id!!)))
  }

  function convertDate(date: string) {
    return new Date(date);
  }

  useEffect(() => {
    setLances(lances.sort((a, b) => a.valor - b.valor))
  }, [lances])

  useEffect(() => {
    if(!validateToken())
      window.location.href = "/login"

      handleDados()
  }, [])

  return produto ? (
    <>
    <div id="produto">
      <Link to={"/criador/"+produto.id_criador} className="criador">
        <img src={produto.avatar_criador} alt="" />
        <p>{produto.nome_criador}</p>
      </Link>
      <div className="info">
      <img src={produto.urlFoto} alt={produto.nome} />
      <div>
        <h1>{produto.nome}</h1>
        <h2>{produto.descricao}</h2>
        <p>Valor mínimo de R$ {produto.valorMinimo}</p>
      </div>
      </div>
    </div>
      <div className="center lances">
        <h2>Abre para lances em: {convertDate(produto.dataInicio).toLocaleDateString()}</h2>
        <h2>Fecha para lances em: {convertDate(produto.dataFim).toLocaleDateString()}</h2>
        <h2>Valor mínimo de R$ {produto.valorMinimo}</h2>
        <br />
        <br />
        <br />
        <h1>Lances</h1>
        <br />
        <table>
            <tr>
              <th>Valor</th>
              <th>Data</th>
            </tr>
            {lances.map(e => (
              <tr>
                <td>R$ {e.valor.toFixed(2)}</td>
                <td>{convertDate(e.atualizadoEm).toLocaleDateString()} {convertDate(e.atualizadoEm).toLocaleTimeString()}</td>
              </tr>
            ))}
        </table>
        <br />
        <input type="number" value={valor} onChange={e => setValor(parseInt(e.target.value))} />
        <br />
        <br />
        <button onClick={async () => {
          await LanceConnection.Criar({
            idLeilao: produto.idLeilao,
            valor
          }, localStorage.getItem("token")!!)
            .then(e => {
              if(!e) return alert("Erro ao dar lance")
              setValor(0)
            }).catch(e => {
              alert("Erro ao dar lance")
              setValor(0)
            })
          handleDados()
        }}>Dar lance</button>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  ) : produto === false? (
    <>
      <h1>Erro 404</h1>
      <p>Produto não encontrado</p>
    </>
  ) : (
    <>Carregando...</>
  )
}