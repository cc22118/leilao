import { useState } from "react";
import { Link } from "react-router-dom";
import ClienteConnection from "../services/cliente";

export default function Cadastro() {

  const [nome, setNome] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [senha, setSenha] = useState<string>("")
  const [endereco, setEndereco] = useState<string>("")
  

  return(
    <main id="color">
      <h1>Nome</h1>
      <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
      <br />
      <br />
      <br />
      <h1>Email</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <br />
      <br />
      <br />
      <h1>Endereço</h1>
      <input type="text" value={senha} onChange={e => setSenha(e.target.value)} required />
      <br />
      <br />
      <br />
      <h1>Senha</h1>
      <input type="password" value={endereco} onChange={e => setEndereco(e.target.value)} required />
      <br />
      <br />
      <br />
      <button className="center" onClick={() => {
        ClienteConnection.Criar({ nome, email, senha, urlAvatar: null, endereco, cargo: "cliente" })
          .then(async (e) => {
            if (!e.ok) return alert("Erro ao cadastrar, tente novamente mais tarde")
            window.location.href = "/login"
          }).catch(e => {
            alert("Erro ao cadastrar, tente novamente mais tarde")
          })
      }}>Cadastrar</button>
      <br />
      <hr />
      <br />
      <p className="center fit">Já tem uma conta? <Link to="/login">Entre aqui!</Link></p>
    </main>
    )
}