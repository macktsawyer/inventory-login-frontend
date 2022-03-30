import React, { useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/PasswordChange.scss';

const PasswordChange = () => {
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ newPasswordConf, setNewPasswordConf ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isError, setIsError ] = useState(false);
    let Navigate = useNavigate();
    let user = localStorage.getItem('user') === 'null' ? false : true;
    let userName = localStorage.getItem('user');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ensure the person is an auth user
        if (user) {
            // Ensure the new password is confirmed
            if (newPassword === newPasswordConf) {
                // Ensure new password isn't same as old password
                if (newPassword !== currentPassword) {
                    console.log(newPassword, currentPassword, userName)
                    fetch('http://localhost:3001/user/changePassword', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: userName,
                            oldPassword: currentPassword,
                            newPassword: newPassword
                        }),
                      }).then(() => {
                          console.log('Sucess')
                          alert('Password changed successfully')
                          Navigate('/Admin')
                      }).catch((err) => {
                          // Catch if 'old password' isn't actually the old password
                          console.error(err)
                      })
                } else (
                    setIsError('Your password is not unique enough')
                )
            } else {
                setIsError('Password and password confirmation do not match');
            }
        } else {
            Navigate('/');
        }
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
        <h4>Hello {userName}! Looking to change your password?</h4>
        <div className="inputField">
          <Input placeholder="Current Password" 
          onChange={handleCurrentChange}
          fullWidth label="Password"
          type={showPassword ? "text" : "password"}
          required
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
          required
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
          required
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
        <Link className="goBack" to='/Admin'><Button>Go Back</Button></Link>
        <br/>
        { isError && <error>{isError}</error>}
      </form>
    </div>
  )
}

export default PasswordChange