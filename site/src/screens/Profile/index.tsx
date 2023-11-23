import { useEffect, useState } from "react"
import ClienteConnection, { Cliente } from "../../services/cliente"
import "./style.css"

export default function Profile() {
  
  const [user, setUser] = useState<Cliente>()

  async function handleDados() {
    await ClienteConnection.info(localStorage.getItem('token')!!)
      .then(async (res) => {
        await ClienteConnection.BuscarPorId(await res.json().then(r => r.id))
          .then(async (r) => {
            setUser(await r.json())
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if(localStorage.getItem('token') == null)
      window.location.href = '/login'

    handleDados()
  }, [])


  function change(dados: any) {
    setUser({
      ...user,
      ...dados,
    })
  }

  return (
    <main id="profile">
      <h2>Nome:</h2>
      <input type="text" value={user?.nome} onChange={(e) => change({ nome: e.target.value })} />
      <br />
      <br />
      <h2>Email:</h2>
      <input type="email" value={user?.email} onChange={(e) => change({ email: e.target.value })} />
      <br />
      <br />
      <h2>Endereço:</h2>
      <input type="text" value={user?.endereco} onChange={(e) => change({ endereco: e.target.value })} />
      <br />
      <br />
      <h2>Senha:</h2>
      <input type="password" value={user?.senha} onChange={(e) => change({ senha: e.target.value })} />
      <br />
      <br />
      <h2>Url Foto:</h2>
      <input type="url" value={user?.urlAvatar} onChange={(e) => change({ urlAvatar: e.target.value })} />
      <br />
      <br />
      <img src={user?.urlAvatar} alt={user?.nome} />
      <br />
      <br />
      <button disabled={user === undefined} onClick={async () => await ClienteConnection.Atualizar(user!!.id, user!!, localStorage.getItem("token")!!)
        .then(e => {
          console.log(e)
          if(e.ok)
            alert("Atualizado com sucesso")
          else
            alert("Erro ao atualizar, tente novamente")
        })
        .catch(err => alert("Erro ao atualizar, tente novamente"))
      }>
        Salvar
      </button>
      <br />
      <br />
      <br />
      <button disabled={user === undefined} onClick={async () => 
        ClienteConnection.Deletar(user!!.id, localStorage.getItem("token")!!)
          .then(e => {
            if(e.ok) {
              alert("Deletado com sucesso")
              localStorage.removeItem("token")
              window.location.href = "/"
            } else {
              alert("Erro ao deletar, tente novamente")
            }
          })
          .catch(err => alert("Erro ao deletar, tente novamente"))
      }>
        Deletar Conta
      </button>
    </main>
  )
}