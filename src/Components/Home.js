import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import NavBar from './NavBar.js';
import '../Styles/Home.scss';

const Home = () => {
  return (
    <>
        <NavBar />
        <section>
            <div>Home</div>
        </section>
        <footer className="footerBar">
            <Link to='/Login'><Button variant="text"><strong>Login</strong></Button></Link>
        </footer>
    </>
  )
}

export default Home