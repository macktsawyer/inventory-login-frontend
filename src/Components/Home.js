import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import NavBar from './NavBar.js';
import '../Styles/Home.scss';

const Home = () => {
  let token = localStorage.getItem('tokens')

  return (
    <>
        <NavBar />
        <section>
            <div>Home</div>
            <h3>Welcome</h3>
        </section>
        <section>
          <Paper>
            <Card>
              Hello there
            </Card>
          </Paper>
        </section>
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

export default Home