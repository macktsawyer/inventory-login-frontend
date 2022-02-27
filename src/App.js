import './App.scss';
import Login from './Components/Login';
import Home from './Components/Home';
import Inventory from './Components/Inventory';
import About from './Components/About';
import Admin from './Components/Admin/Admin';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './Services/authContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Inventory' element={<Inventory />} />
          <Route path='/About' element={<About />} />
          <Route path='/' element={<Home />} />

          <Route path='/Admin' element={<Admin />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
