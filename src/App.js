import './App.scss';
import Login from './Components/Login';
import Home from './Components/Home';
import Inventory from './Components/Inventory';
import About from './Components/About';
import Admin from './Components/Admin/Admin';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/Inventory' element={<Inventory />} />
        <Route path='/About' element={<About />} />
        <Route path='/' element={<Home />} />

        <Route path='/Admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
