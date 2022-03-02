import './App.scss';
import React, { useState } from 'react';
import Login from './Components/Login';
import Home from './Components/Home';
import Inventory from './Components/Inventory';
import About from './Components/About';
import Admin from './Components/Admin/Admin';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './Services/authContext';

function App() {

  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
      localStorage.setItem('tokens', JSON.stringify(data));
      setAuthTokens(data);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Inventory' element={<Inventory />} />
          <Route path='/About' element={<About />} />
          <Route path='/' element={<Home />} />
          
          <Route path='/Admin' element={<Admin />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
