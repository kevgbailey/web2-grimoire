import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'; // Import Footer
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About/About';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PageNotFound from './components/PageNotFound/PageNotFound';
import GameForm from './components/Game/GameForm/GameForm';
import Grimoire from './components/Grimoire/Grimoire'; // Import Grimoire
import GameHistory from './components/GameHistory/GameHistory'; // Import GameHistory
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-tooltip/dist/react-tooltip.css'

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <NavBar />
          <div className="body-content">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/play" element={<GameForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/grimoire" element={<Grimoire />} />
              <Route path="/history" element={<GameHistory />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </DndProvider>
    </>
  );
}

export default App;