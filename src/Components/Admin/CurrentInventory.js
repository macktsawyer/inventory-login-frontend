import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Image } from 'cloudinary-react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import '../../Styles/CurrentInventory.scss';
import axios from 'axios';


const CurrentInventory = (props) => {
    const [ loading, setLoading ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);
    const [ expandedItem, setExpandedItem ] = useState('');
    const [ editingItem, setEditingItem ] = useState('');
    const [ isEditingActive, setIsEditingActive ] = useState(false);
    const [ newItemEditedValue, setNewItemEditedValue ] = useState({
        newItemName: '',
        newItemDesc: '',
        newItemPrice: '',
        newItemID: ''
    });
    const [ itemInfo, setItemInfo ] = useState([]);

    const truncateDesc = (text) => {
        if (text) {
            if (text.length > 45) { // If text is too long will shorten it and end the string with ...
                return text.substring(0, 44) + '...';
              } else {
                return text;
              }
        }
      }
    
    const handleEditLogoClick = (_id, e, i) => {
        e.preventDefault();
        setEditingItem(i); // Selects which item is being edited
        setIsEditingActive(_id); // Checks if editing is active to 'un-hide' 
        setNewItemEditedValue({
            newItemName: i.item,
            newItemDesc: i.description, // Assigns values to input fields and will pass to backend.
            newItemPrice: i.price,
            newItemID: i._id
        })
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

    const handleEditOnChange = (e) => {
        const value = e.target.value;
        setNewItemEditedValue({
            ...newItemEditedValue,
            [e.target.name]: value
        })
    }

    const handleEditSubmitForm = async (e) => {
        e.preventDefault();
        const newEditItem = {
            item_name: newItemEditedValue.newItemName,
            item_desc: newItemEditedValue.newItemDesc,
            item_price: newItemEditedValue.newItemPrice,
            item_id: newItemEditedValue.newItemID
        }
        try {
            await axios.post('http://localhost:3001/inv//updateInventory', newEditItem).then((response) => {
              setItemInfo(prev => [...prev, response.data])
            })
          } catch (error) {
            console.error(error)
          }
        // Close Edit Form On Submit
    }

    useEffect(() => {
        setItemInfo(props.itemList)
        console.log(isActive)
    }, [isActive, props.itemList])

    return (
        <div className="currentInventoryMain">
            <Paper elevation={5} className="inventoryShowcase">
                {loading && <CircularProgress />}
                <br />
                <strong>Inventory</strong>
                <Grid container spacing={2}>
                    {itemInfo && !loading && itemInfo.map((i) => {
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
                                handleEditLogoClick(i._id, e, i)
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
                            <div className="editContentDiv">
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
                                <form 
                                className="editItemForm"
                                onSubmit={handleEditSubmitForm}>
                                    <TextField 
                                    id="standard-basic" 
                                    label="Name" 
                                    variant="standard"
                                    required={true}
                                    name="newItemName"
                                    value={newItemEditedValue.newItemName ?? ''}
                                    onChange={handleEditOnChange}
                                    className="editField" />

                                    <TextField
                                    id="standard-basic-flexible"
                                    label="Description"
                                    variant="standard"
                                    multiline
                                    maxRows={6}
                                    required={true}
                                    name="newItemDesc"
                                    value={newItemEditedValue.newItemDesc ?? ''}
                                    onChange={handleEditOnChange}
                                    className="editField" />

                                    <TextField 
                                    id="standard-basic" 
                                    label="Price" 
                                    variant="standard"
                                    required={true}
                                    name="newItemPrice"
                                    value={newItemEditedValue.newItemPrice ?? ''}
                                    onChange={handleEditOnChange}
                                    className="editField" />

                                    <Button
                                    className="editSubmit" 
                                    type="submit"
                                    style={{marginTop: "15px"}}>Edit Inventory</Button>
                                </form>
                            </div>
                        </div>
                    </Card>
                }
            </Paper> 
        </div>
    )
    } 

    export default CurrentInventory