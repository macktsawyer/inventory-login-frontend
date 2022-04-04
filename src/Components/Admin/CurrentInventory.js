import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Image } from 'cloudinary-react';
import CircularProgress from '@mui/material/CircularProgress';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import EditIcon from '@mui/icons-material/Edit';
import '../../Styles/CurrentInventory.scss';
let userName = localStorage.getItem('user');
let token = localStorage.getItem('tokens');

const CurrentInventory = () => {
  const [ itemInfo, setItemInfo ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const truncateDesc = (text) => {
    if (text.length > 45) {
      return text.substring(0, 44) + '...';
    } else {
      return text;
    }
  }

  const handleEdit = (id, e) => {
    e.preventDefault();
    console.log(`Editing inventory ${id}`)
  }


  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      console.log(`Deleted inventory item ${id}`)
      await fetch('http://localhost:3001/inv/deleteInventory', {
        method: 'POST',
        body: JSON.stringify({
          item_id: id,
          userName: userName,
          password: token,
        }),
        headers: {'Content-Type': 'application/json'}
      });
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loadInfo = async () => {
      try {
        setLoading(true)
        const res = await fetch('http://localhost:3001/inv/getInventory', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setItemInfo(data.information);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    }
    loadInfo();
  },[])

  return (
    <div className="currentInventoryMain">
        <Paper elevation={5} className="inventoryShowcase">
            {loading && <CircularProgress />}
            <br />
            <strong>Inventory</strong>
            <Grid container spacing={2}>
              {itemInfo && !loading && itemInfo.map((i) => {
                return (
                  <Grid item >
                    <Card 
                    className="itemCard"
                    elevation={5}>
                      <div className="cardButtons">
                        <div className="editIcon">
                          <button
                          className="editButton" 
                          onClick={(e) => {
                            handleEdit(i._id, e)
                          }} ><EditIcon /></button>
                        </div>
                        <div className="deleteIcon">
                          <button 
                          className="deleteButton"
                          onClick={(e) => {
                            handleDelete(i.id, e)
                          }}><HighlightOffOutlinedIcon sx={{color: "red"}} /></button>
                        </div>
                      </div>
                      {i.publicId ? <Image 
                      cloudName="disgd9pk6"
                      className="itemImage"
                      publicId={i.publicId} 
                      crop="scale"
                      /> 
                      : 
                      <CircularProgress />
                      }
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