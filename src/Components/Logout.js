import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Services/authContext';
import '../Styles/Logout.scss';

const Logout = () => {
  const { setAuthTokens, setUserValue, userValue } = useAuth();
  let Navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setAuthTokens(null);
    setUserValue('');
    alert('Logout successful')
    Navigate('/');
  };

  return (
    <div className="fullWindow">
        <Paper className="logoutWindow" elevation={5}>
            <div className="contentDiv">
                <h4>Are you sure you want to log out {userValue}?</h4>
                <Button onClick={handleLogout}>Logout</Button>
                <Link className="goBack" to='/'><Button>Go Back</Button></Link>
            </div>
        </Paper>
    </div>
  )
}

export default Logout