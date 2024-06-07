import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Home } from './views/Home'
import { Sculptures } from './views/Sculptures'
import { Paintings } from './views/Paintings'
import { Login } from './components/Login'
import { SignUp } from './components/SignUp'
import { Footer } from './components/Footer'
import { useEffect, useState } from 'react'

export default function App() {

  const [token, setToken] = useState(false)

  useEffect(() => {
    const savedToken = sessionStorage.getItem('token')
    if (savedToken) {
      setToken(JSON.parse(savedToken))
    }
  }, [])

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token))
    } else {
      sessionStorage.removeItem('token')
    }
  }, [token])

  return (
    <div className="dark:bg-blue-gray-900 min-h-screen">
      <Header token={token} setToken={setToken}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sculptures' element={<Sculptures/>}/>
        <Route path='/paintings' element={<Paintings/>}/>
        <Route path='/login' element={<Login setToken={setToken}/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}