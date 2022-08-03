import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <div className="itemPaper">
              <div className="gridContainer">
                {itemInfo && itemInfo.map((i) => {
                  return (
                  <Grid item key={i.id}>
                    <div className="itemCard">
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
                    </div>
                  </Grid>
                  )
                })}
              </div>
            </div>
        </div>

        <footer className="footerBar">
          {token === 'null'  
          
          ?

          <div>
            <Link to='/Login'><button variant="text"><strong>Login</strong></button></Link>
            <Link to='/Register'><button variant="text"><strong>Register</strong></button></Link>
          </div>

          :

          <div>
            <Link to='/Admin'><button variant="text"><strong>Dashboard</strong></button></Link>
            <Link to='/Logout'><button variant="text"><strong>Logout</strong></button></Link>
          </div>
          }

        </footer>
    </>
  )
}

export default Inventory