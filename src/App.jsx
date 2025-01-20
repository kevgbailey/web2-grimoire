import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About/About'
import Home from './components/Home/Home'
import PageNotFound from './components/PageNotFound/PageNotFound'

function App() {

  return (
    <>
    <Router>
    <NavBar />
    <Routes>
      <Route path="/about" element={<About/>} />
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </Router>
    </>
  )
}

export default App
