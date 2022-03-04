import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../../Styles/Admin.scss';
import InventoryAdmin from './InventoryAdmin';
import CurrentInventory from './CurrentInventory';

const Admin = () => {

  return (
    <>
      <Link className="homeButton" to='/'><Button variant="text"><strong>Home</strong></Button></Link>
      <InventoryAdmin />
      <CurrentInventory />
      <footer className="footerBar">
          <Link to='/Logout'><Button variant="text"><strong>Logout</strong></Button></Link>
      </footer>
    </>
  )
}

export default Admin