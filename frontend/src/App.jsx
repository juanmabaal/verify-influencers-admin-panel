import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Layout from './components/Layout';
import './App.css'

function App() {

  return (
    <Router>
      {/* <Layout> */}
        {/* <NavBar /> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      {/* </Layout> */}
    </Router>
  )
}

export default App
