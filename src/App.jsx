import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './components/About/About'
import Home from './components/Home/Home'

function App() {

  return (
    <>
    <Router>
    <NavBar />
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/" component={Home} />
    </Switch>
    </Router>
    </>
  )
}

export default App
