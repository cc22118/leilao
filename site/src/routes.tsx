import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Login from './screens/Login'
import Cadastro from './screens/Cadastro'
import Home from './screens/Home'
import Produto from './screens/Produto'
import Criador from './screens/Criador'
import Profile from './screens/Profile'

export default function Router() {
  return (
    <BrowserRouter>
      <Link to="/">
      <img className='logo' src="/logo.png" alt="aaa" />
      </Link>
      <Routes>
        <Route path='/login' Component={Login} />
        <Route path='/cadastrar-se' Component={Cadastro} />
        <Route path='/' Component={Home} />
        <Route path='/profile' Component={Profile} />
        <Route path='/produto/:id' Component={Produto} />
        <Route path='/criador/:id' Component={Criador} />
        <Route path='/*' element={<h1 className='center fit text-error'>Essa página não existe, <Link to="/">volte para a tela inicial</Link></h1>} />
      </Routes>
    </BrowserRouter>
  )
}