import React, { useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import '../Styles/Login.scss';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

    if (data.username) {
      alert('Login Successful')
      window.location.href = '/Admin';
    } else {
      alert('Please check your username and password')
    }
    console.log(data)
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
      </form>
    </div>
  )
}

export default Login