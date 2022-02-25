import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../../Styles/Admin.scss';
import InventoryAdmin from './InventoryAdmin';

const Admin = () => {
  return (
    <>
        <div>Admin</div>
        <InventoryAdmin />
        <footer className="footerBar">
            <Link to='/'><Button variant="text"><strong>Logout</strong></Button></Link>
        </footer>
    </>
  )
}

export default Admin