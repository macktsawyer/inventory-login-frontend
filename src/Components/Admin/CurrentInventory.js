import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Image } from 'cloudinary-react';
import '../../Styles/CurrentInventory.scss';

const CurrentInventory = () => {
  const [ itemInfo, setItemInfo ] = useState([]);

  const loadInfo = async () => {
    try {
      const res = await fetch('http://localhost:3001/inv/getInventory');
      const data = await res.json();
      setItemInfo(data.information)
    } catch (error) {
      console.error(error)
    }
  }

  const truncateDesc = (text) => {
    if (text.length > 45) {
      return text.substring(0, 44) + '...';
    } else {
      return text;
    }
  }

  useEffect(() => {
    loadInfo();
  },[])

  console.log(itemInfo)

  return (
    <div className="currentInventoryMain">
        <Paper elevation={5} className="inventoryShowcase">
            <strong>Inventory</strong>
            <Grid container spacing={3}>
              {itemInfo && itemInfo.map((i) => {
                return (
                  <Grid item >
                    <Card 
                    className="itemCard"
                    elevation={5}>
                      <Image 
                      cloudName="disgd9pk6"
                      className="itemImage"
                      publicId={i.publicId} 
                      height="150"
                      crop="scale"
                      />
                      <ul className="itemList">
                        <li><strong>{i.item}</strong></li>
                        <li>{truncateDesc(i.description)}</li>
                        <li><strong>{i.price}</strong></li>
                      </ul>
                    </Card>
                  </Grid>
                  )
              })}
            </Grid>
        </Paper>
    </div>
  )
}

export default CurrentInventory