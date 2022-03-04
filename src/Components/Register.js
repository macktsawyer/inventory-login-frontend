import React, { useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Services/authContext';
import '../Styles/Register.scss';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistered, setRegistered] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setAuthTokens } = useAuth();
    let Navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
      };
    
    async function registrationAttempt(e) {
        e.preventDefault();

        if (password === passwordConf) {
            const response = await fetch('http://localhost:3001/user/register', {
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
                setRegistered(true);
                alert('Registration successful')
                Navigate('/Login')
              } else {
                setIsError(true)
                setErrorMessage(data)
                console.log(data)
              }
        } else {
            setErrorMessage('Passwords do not match')
        }
      }
    
    if (isRegistered) {
        <Navigate to='/Login' />
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        registrationAttempt(e);
    }
    
    const handleUsername = (e) => {
        e.preventDefault();
        setUsername(e.target.value)
    }
    
    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    const handlePasswordConf = (e) => {
        e.preventDefault();
        setPasswordConf(e.target.value)
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
          fullWidth label="Password"
          type={showPassword ? "text" : "password"}
          endAdornment={
              <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              </InputAdornment>
          }  />
        </div>
        <div className="inputField">
          <Input placeholder="Confirm Password" 
          onChange={handlePasswordConf}
          fullWidth label="Password"
          type={showPassword ? "text" : "password"}
          endAdornment={
              <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              </InputAdornment>
          }  />
        </div>
        <Button type="submit" onClick={handleSubmit}>Register</Button>
        <Link className="goBack" to='/'><Button>Go Back</Button></Link>
        <br/>
        <Link className="LoginAccount" to='/Login'><Button size="small">Already have an account?</Button></Link>
        { isError && <error>{errorMessage}</error>}
      </form>
    </div>
  )
}

export default Register