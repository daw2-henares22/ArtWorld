import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Home } from './views/Home'
import { Sculptures } from './views/Sculptures'
import { Paintings } from './views/Paintings'

export default function App() {

  return (
    <div className="">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sculptures' element={<Sculptures/>}/>
        <Route path='/paintings' element={<Paintings/>}/>
      </Routes>
    </div>
  )
}