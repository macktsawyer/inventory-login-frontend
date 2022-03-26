import React, { useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Services/authContext';
import '../../Styles/PasswordChange.scss';

const PasswordChange = () => {
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ newPasswordConf, setNewPasswordConf ] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    let Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Success')
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
      
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleCurrentChange = (e) => {
        e.preventDefault();
        setCurrentPassword(e.target.value);
    };

    const handleNewChange = (e) => {
        e.preventDefault();
        setNewPassword(e.target.value);
    }

    const handleNewConfChange = (e) => {
        e.preventDefault();
        setNewPasswordConf(e.target.value);
    }

  return (
    <div className="fullWindow">
      <form onSubmit={handleSubmit} className="changePasswordBox">
        <div className="inputField">
          <Input placeholder="Current Password" 
          onChange={handleCurrentChange}
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
          <Input placeholder="New Password"
          onChange={handleNewChange}
          fullWidth label="Password"
          type={showPassword ? "text" : "password"}
          endAdornment={
              <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              </InputAdornment>
          }  />
        </div>
        <div className="inputField">
          <Input placeholder="Confirm New Password"
          onChange={handleNewConfChange}
          fullWidth label="Password"
          type={showPassword ? "text" : "password"}
          endAdornment={
              <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              </InputAdornment>
          }  />
        </div>
        <Button type="submit" onSubmit={handleSubmit}>Submit</Button>
        <strong style={{color: "blue"}}>•</strong>
        <Link className="goBack" to='/'><Button>Go Back</Button></Link>
        <br/>
        { isError && <error>The current password was incorrect or new passwords provided don't match</error>}
      </form>
    </div>
  )
}

export default PasswordChange