import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Image } from 'cloudinary-react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';


const CurrentInventory = (props) => {
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

    const deleteClick = (_id, id, e) => {
        setLoading(true);
        props.deleteItem(_id, id, e)
        setLoading(false);
    }

    return (
        <div className="currentInventoryMain">
            <Paper elevation={5} className="inventoryShowcase">
                {loading && <CircularProgress />}
                <br />
                <strong>Inventory</strong>
                <Grid container spacing={2}>
                    {props.itemList && !loading && props.itemList.map((i) => {
                    return (
                        <Grid item key={i._id}>
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
                                deleteClick(i._id, i.id, e)
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