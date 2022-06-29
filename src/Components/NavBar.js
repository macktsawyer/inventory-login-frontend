import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NavBar.scss';

const NavBar = () => {
  return (
    <>
        <ul className="navBar">
            <Link to='/'><button variant="text"><strong>Home</strong></button></Link>
            <strong style={{color: "blue"}}>•</strong>
            <Link to='/About'><button variant="text"><strong>About</strong></button></Link>
            <strong style={{color: "blue"}}>•</strong>
            <Link to='/Inventory'><button variant="text"><strong>Inventory</strong></button></Link>
        </ul>
    </>
  )
}

export default NavBar