import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About/About'
import Home from './components/Home/Home'
import PageNotFound from './components/PageNotFound/PageNotFound'
import GameForm from './components/Game/GameForm/GameForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  return (
    <>
    <Router>
    <NavBar />
    <div className="body-content">
      <Routes>
        <Route path="/about" element={<About/>} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/play" element = {<GameForm/>} />
      </Routes>
    </div>
    </Router>
    </>
  )
}

export default App