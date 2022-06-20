import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Admin.scss';
import InventoryAdmin from './InventoryAdmin';

const Admin = () => {
  
  return (
    <>
      <Link className="homeButton" to='/'><button variant="text"><strong>Home</strong></button></Link>
      <InventoryAdmin />
      <footer className="footerBar">
          <Link to='/Logout'><button variant="text"><strong>Logout</strong></button></Link>
          <strong style={{color: "blue"}}>•</strong>
          <Link to='/PasswordChange'><button><strong>Change Password</strong></button></Link>
      </footer>
    </>
  )
}

export default Admin