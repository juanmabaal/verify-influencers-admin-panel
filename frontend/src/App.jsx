import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
    </Router>
  )
}

export default App
