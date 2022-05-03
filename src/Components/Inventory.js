import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Image } from 'cloudinary-react';
import NavBar from './NavBar.js';
import '../Styles/Inventory.scss';
import axios from 'axios';

const Inventory = () => {
  const [ itemInfo, setItemInfo ] = useState([]);
  let token = localStorage.getItem('tokens');

  const loadInfo = async () => {
    try {
      await axios.get('http://localhost:3001/inv/getInventory').then((response) => {
        setItemInfo(response.data.information);
      });
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadInfo();
  },[])

  return (
    <>
        <NavBar />

        <div className="mainContent">
            Inventory
            <Paper className="itemPaper">
              <Grid container spacing={2}>
                {itemInfo && itemInfo.map((i) => {
                  return (
                  <Grid item key={i.id}>
                    <Card className="itemCard" elevation={5}>
                      {<Image 
                        cloudName="disgd9pk6"
                        className="itemImage"
                        publicId={i.publicId} 
                        crop="scale"
                        />}
                      <ul>
                        <li className="itemList">{i.item}</li>
                        <li className="itemList">{i.description}</li>
                        <li className="itemList">{i.price}</li>
                      </ul>
                    </Card>
                  </Grid>
                  )
                })}
              </Grid>
            </Paper>
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

export default Inventory