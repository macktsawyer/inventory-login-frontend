import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import NavBar from './NavBar.js';
import '../Styles/About.scss';

const About = () => {
  let token = localStorage.getItem('tokens');

  return (
    <>
        <NavBar />
        <div>
            About
        </div>
        <footer className="footerBar">
          {token === 'null'  
          
          ?

          <div>
            <Link to='/Login'><Button variant="text"><strong>Login</strong></Button></Link>
            <Link to='/Register'><Button variant="text"><strong>Register</strong></Button></Link>
          </div>

          :

          <div>
            <Link to='/Admin'><Button variant="text"><strong>Dashboard</strong></Button></Link>
            <Link to='/Logout'><Button variant="text"><strong>Logout</strong></Button></Link>
          </div>
          }

        </footer>
    </>
  )
}

export default About