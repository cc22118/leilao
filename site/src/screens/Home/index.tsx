import { useEffect, useState } from "react"
import "./style.css"
import ProductConnection, { Product, ProductAuction } from "../../services/product"
import { Link } from "react-router-dom"
import validateToken from "../../services/token"

export default function Home() {
  const [products, setProducts] = useState<Array<ProductAuction>>([])
  const [filtered, setFiltered] = useState<Array<ProductAuction>>([])
  const [search, setSearch] = useState<string>("")

  async function handleProducts() {
    await ProductConnection.getAll()
      .then(async (response) => {
        setProducts(await response.json())
      })
      .catch((_err) => {
        alert("Erro ao buscar produtos, tente novamente mais tarde.")
      })
  }

  useEffect(() => {
    if(!validateToken())
      window.location.href = "/login"
    handleProducts()
  }, [])

  useEffect(() => {
    if (search.length > 0) {
      setFiltered(
        products.filter((product) => 
          product.nome.toLowerCase().includes(search.toLowerCase()) ||
          product.descricao.toLowerCase().includes(search.toLowerCase()) ||
          product.valorMinimo.toString().includes(search.toLowerCase())
        )
      )
    } else {
      setFiltered(products)
    }
  }, [search, products])

  function deslogar() {
    localStorage.removeItem("token")
    document.location.replace("/login")
    console.log("deslogado")
  }

  return (
    <>
      <header id="menu">
        <div className="search center">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button
            onClick={() => setSearch("")}
            disabled={search.length === 0}
          >
            Limpar Busca
          </button>
        </div>
        <div className="user">
          <img src="https://publicdomainvectors.org/tn_img/abstract-user-flat-4.webp" alt="avatar" />
          <ul className="flutuante">
            <li onClick={() =>     document.location.replace("/profile")}>Ver Dados</li>
            <li onClick={deslogar}>Sair</li>
          </ul>
        </div>
      </header>
      <br />
      <hr className="p9 center" />
      <br />
      <main className="listProdutos">
        {
          filtered.map((product, key) => (
            <Link to={"/produto/"+product.idLeilao} key={key} id="product">
              <img src={product.urlFoto} alt={product.nome} />
              <span>Mínimo: R$ {product.valorMinimo.toFixed(2)}</span>
            </Link>
          ))
        }
      </main>
    </>
  )
}