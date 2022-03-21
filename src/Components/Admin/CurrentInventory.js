import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Image } from 'cloudinary-react';
import '../../Styles/CurrentInventory.scss';

const CurrentInventory = () => {
  const [ imageIDs, setImageIDs ] = useState();
  const [ itemInfo, setItemInfo ] = useState({
    id: '',
    item: '',
    desc: '',
    price: '',
    image: ''
  });

  const loadImages = async () => {
    try {
      const res = await fetch('http://localhost:3001/inv/getInventory');
      const data = await res.json();
      setImageIDs(data.publicIds);
      setItemInfo({
        ...itemInfo, 
        id: data.information.id,
        item: data.information.item,
        desc: data.information.description,
        price: data.information.price,
        image: data.information.image
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadImages();
  },[])

  return (
    <div className="currentInventoryMain">
        <Paper elevation={5} className="inventoryShowcase">
            <strong>Inventory</strong>
            <Grid container spacing={3}>
              {imageIDs && imageIDs.map((i) => {
                return (
                  <Grid item >
                    <Card >
                      <Image 
                      cloudName="disgd9pk6"
                      publicId={i} 
                      height="150"
                      crop="scale"
                      />
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