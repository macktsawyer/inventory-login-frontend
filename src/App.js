import './App.scss';
import React, { useState } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Logout from './Components/Logout';
import Home from './Components/Home';
import Inventory from './Components/Inventory';
import About from './Components/About';
import Admin from './Components/Admin/Admin';
import PasswordChange from './Components/Admin/PasswordChange';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './Services/authContext';
import ProtectedRoute from './Services/ProtectedRoutes';
import EditInventory from './Components/Admin/EditInventory';

function App() {
  const [ userValue, setUserValue ] = useState();
  const [ authTokens, setAuthTokens ] = useState();

  const setTokens = (data) => {
      localStorage.setItem('tokens', JSON.stringify(data));
      setAuthTokens(data);
  }

  const setUser = (username) => {
    localStorage.setItem('user', username);
    setUserValue(username);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens, userValue, setUserValue: setUser}}>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Inventory' element={<Inventory />} />
          <Route path='/About' element={<About />} />
          <Route path='/' element={<Home />} />
          <Route exact element={<ProtectedRoute />} >
            <Route path='/Admin' element={<Admin />} />
            <Route path='/Logout' element={<Logout />} />
            <Route path='/PasswordChange' element={<PasswordChange />} />
            <Route path='/EditInventory' element={<EditInventory />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
