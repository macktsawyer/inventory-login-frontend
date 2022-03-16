import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Image } from 'cloudinary-react';
import '../../Styles/CurrentInventory.scss';

const CurrentInventory = () => {
  const [ imageIDs, setImageIDs] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch('http://localhost:3001/inv/getInventory');
      const data = await res.json();
      setImageIDs(data);
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
            {imageIDs && imageIDs.map((imageId, index) => {
              return (
              <Image 
              key={index}
              cloudName="disgd9pk6"
              publicId={imageId} 
              width="150"
              crop="scale"
              />
                )
            })}
        </Paper>
    </div>
  )
}

export default CurrentInventory