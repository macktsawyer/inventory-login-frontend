import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import AuthContext from '../Services/authContext';
import { Link } from 'react-router-dom';
import '../Styles/NavBar.scss';

const NavBar = () => {

  const { loggedIn } = useContext(AuthContext);

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