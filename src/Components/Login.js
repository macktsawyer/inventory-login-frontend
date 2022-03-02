import React, { useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Services/authContext';
import '../Styles/Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  let Navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  async function loginAttempt(e) {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
    const data = await response.json()

    if (data) {
      setAuthTokens(data.token);
      setIsLoggedIn(true);
      alert('Log in successful')
      Navigate('/Admin')
    } else {
      setIsError(true)
    }

  }

  if (isLoggedIn) {
    <Navigate to='/dashboard' />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAttempt(e);
  }

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value)
  }

  return (
    <div className="fullWindow">
      <form onSubmit={handleSubmit} className="loginBox">
        <div className="inputField">
          <Input placeholder="Username" onChange={handleUsername} fullWidth label="Username" />
        </div>
        <div className="inputField">
          <Input placeholder="Password" 
          onChange={handlePassword}
          onMouseDown={handleMouseDownPassword} 
          fullWidth label="Password"
          type={showPassword ? "text" : "password"}
          endAdornment={
              <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              </InputAdornment>
          }  />
        </div>
        <Button type="submit" onClick={handleSubmit}>Login</Button>
        <Link className="goBack" to='/'><Button>Go Back</Button></Link>
        { isError && <error>The username or Password provided were incorrect</error>}
      </form>
    </div>
  )
}

export default Login