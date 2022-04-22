import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Image } from 'cloudinary-react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import '../../Styles/CurrentInventory.scss';


const CurrentInventory = (props) => {
    const [ loading, setLoading ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);
    const [ expandedItem, setExpandedItem ] = useState('');
    const [ editingItem, setEditingItem ] = useState('');
    const [ isEditingActive, setIsEditingActive ] = useState(false);

    const truncateDesc = (text) => {
        if (text) {
            if (text.length > 45) {
                return text.substring(0, 44) + '...';
              } else {
                return text;
              }
        }
      }
    
    const handleEdit = (_id, e, i) => {
        e.preventDefault();
        setEditingItem(i);
        setIsEditingActive(_id);
        console.log(i)
    }

    const deleteClick = (_id, id, e) => {
        setLoading(true);
        props.deleteItem(_id, id, e)
        setLoading(false);
    }

    const imagePopup = (e, _id, itemInfo) => {
        e.preventDefault();
        setIsActive(_id);
        setExpandedItem(itemInfo);
    }

    useEffect(() => {
        console.log(isActive)
    }, [isActive])

    return (
        <div className="currentInventoryMain">
            <Paper elevation={5} className="inventoryShowcase">
                {loading && <CircularProgress />}
                <br />
                <strong>Inventory</strong>
                <Grid container spacing={2}>
                    {props.itemList && !loading && props.itemList.map((i) => {
                    return (
                        <>
                        <Grid item key={i._id}>
                        <Card 
                        className="itemCard"
                        elevation={5}>
                            <div className="cardButtons">
                            <div className="editIcon">
                                <button
                                className="editButton" 
                                onClick={(e) => {
                                handleEdit(i._id, e, i)
                                }} ><EditIcon /></button>
                            </div>
                            <div key={i._id} className="deleteIcon">
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
                            onClick={(e) => {imagePopup(e, i._id, i)}}
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
                        </>
                        )
                    })}
                </Grid>
            </Paper>
            <Paper key={expandedItem.id} className={"expandedView " + (isActive === expandedItem._id ? 'active' : 'hidden')}>
                {
                    <Card key={expandedItem._id} className="expandedCard" elevation={5}>
                        <div key={expandedItem._id} className={`${isActive === expandedItem._id ? 'active' : 'hidden'}`}>
                            <Image
                            cloudName="disgd9pk6"
                            className="expandedItemImage"
                            publicId={expandedItem.publicId} 
                            crop="scale"
                            />
                            <button 
                            className="closeButton"
                            onClick={(e) => {
                            e.preventDefault();
                            setIsActive('');
                            }}><CloseIcon sx={{color: "red"}} /></button>       
                        </div>
                    </Card>
                }
            </Paper>
            <Paper className={'expandedEditView ' + (isEditingActive === editingItem._id ? 'active' : 'hidden')}>
                {
                    <Card className="expandedEditCard" elevation={5}>
                        <div className='hidden'>
                            <Image
                            cloudName="disgd9pk6"
                            className="editingItemImage"
                            publicId={editingItem.publicId} 
                            crop="scale"
                            />
                            <button 
                            className="closeButton"
                            onClick={(e) => {
                            e.preventDefault();
                            setIsEditingActive('');
                            }}><CloseIcon sx={{color: "red"}} /></button>
                            <form className="editItemForm">
                                <TextField 
                                id="standard-basic" 
                                label="Name" 
                                variant="standard"
                                required={true}
                                value={editingItem.item}
                                className="inputField" />

                                <TextField
                                id="standard-basic-flexible"
                                label="Description"
                                variant="standard"
                                multiline
                                maxRows={6}
                                required={true}
                                value={editingItem.description}
                                className="inputField" />

                                <TextField 
                                id="standard-basic" 
                                label="Price" 
                                variant="standard"
                                required={true}
                                value={editingItem.price}
                                className="inputField" />

                                <input 
                                type="file"
                                multiple
                                accept="image/*"
                                label="Images" 
                                className="inputField"
                                style={{marginTop: "15px"}}
                                // value={fileInput} 
                                />

                            </form>
                        </div>
                    </Card>
                }
            </Paper> 
        </div>
    )
    } // Might want to create a new component for update inventory? Need to consider the styling as the 'expanded view' was a pain in the ass

    export default CurrentInventory