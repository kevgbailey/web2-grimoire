import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About/About'
import Home from './components/Home/Home'
import PageNotFound from './components/PageNotFound/PageNotFound'
import GameForm from './components/Game/GameForm/GameForm'

function App() {

  return (
    <>
    <Router>
    <NavBar />
    <Routes>
      <Route path="/about" element={<About/>} />
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<PageNotFound/>} />
      <Route path="/play" element = {<GameForm/>} />
    </Routes>
    </Router>
    </>
  )
}

export default App
