import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../Styles/NavBar.scss';

const NavBar = () => {
  return (
    <>
        <ul className="navBar">
            <Link to='/'><Button variant="text"><strong>Home</strong></Button></Link>
            <Link to='/About'><Button variant="text"><strong>About</strong></Button></Link>
            <Link to='/Inventory'><Button variant="text"><strong>Inventory</strong></Button></Link>
        </ul>
    </>
  )
}

export default NavBar