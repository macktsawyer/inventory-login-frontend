import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../Styles/Admin.scss';

const Admin = () => {
  return (
    <>
        <div>Admin</div>
        <footer className="footerBar">
            <Link to='/Login'><Button variant="text"><strong>Login</strong></Button></Link>
        </footer>
    </>
  )
}

export default Admin