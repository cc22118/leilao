import { useState } from "react";
import { Link } from "react-router-dom";
import ClienteConnection from "../services/cliente";

export default function Login() {

  const [email, setEmail] = useState<string>("")
  const [senha, setSenha] = useState<string>("")

  return (
    <main id="color">
      <h1>Email</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <br />
      <br />
      <br />
      <h1>Senha</h1>
      <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
      <br />
      <br />
      <br />
      <br />
      <button className="center" onClick={() => {
        ClienteConnection.Login({ email, senha }).then(async (e) => {
          if (!e.ok) return alert("Email ou senha incorretos")
          localStorage.setItem("token", await e.json().then(e => e.token))
          window.location.href = "/"
        })
        .catch(e => {
          alert("Erro ao fazer login, tente novamente mais tarde")
        })
      }}>Entrar</button>
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <br />
      <p className="center fit">Não tem uma conta? <Link to="/cadastrar-se">Cadastre-se aqui!</Link></p>
    </main>
  )
}