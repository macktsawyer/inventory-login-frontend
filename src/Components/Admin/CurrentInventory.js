import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Image } from 'cloudinary-react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import '../../Styles/CurrentInventory.scss';
import { useNavigate } from 'react-router-dom';

const CurrentInventory = (props) => {
    const [ loading, setLoading ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);
    const [ expandedItem, setExpandedItem ] = useState('');
    const [ itemInfo, setItemInfo ] = useState([]);
    const [ deleteVisible, setDeleteVisible ] = useState(false);
    const [ deleteItem, setDeleteItem ] = useState([]);
    let Navigate = useNavigate();


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
        console.log(i)
        Navigate('/EditInventory', {state: 
        {newItemName: i.item,
         newItemDesc: i.description, // Assigns values to input fields and will pass to backend.
         newItemPrice: i.price,
         newItemID: i._id, 
         newItemPub: i.publicId }});
    }

    const deleteClick = (e, _id, i) => {
        setLoading(true);
        setDeleteVisible(true);
        setDeleteItem(i);
        setLoading(false);
    }

    const deleteConfirmed = (e, _id, id) => {
        setLoading(true);
        props.deleteItem(e, _id, id);
        setDeleteVisible(false);
        setDeleteItem([]);
        setLoading(false);
    }

    const imagePopup = (e, _id, itemInfo) => {
        e.preventDefault();
        setIsActive(_id);
        setExpandedItem(itemInfo);
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
                                    deleteClick(i._id, e, i)}}><HighlightOffOutlinedIcon sx={{color: "red"}} /></button>
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
                        // Need to display information with expanded view still
                    </Card>
                }
            </Paper>
            <Paper elevation={5} className={"deleteWarning " + (deleteVisible === true ? 'active' : 'hidden')}>
                <Card elevation={5} className="deleteCard">
                    <h4>{deleteItem.item}</h4>
                    <Image 
                        cloudName="disgd9pk6"
                        className="itemImage"
                        style={{width: 100}}
                        publicId={deleteItem.publicId} 
                        crop="scale"
                        /> 
                    <ul className="deleteItemList">
                        <li>{deleteItem.description}</li>
                        <li>{deleteItem.price}</li>
                    </ul>
                    <Button onClick={(e) => {
                            e.preventDefault();
                            deleteConfirmed(e, deleteItem._id, deleteItem.id)}}>Confirm Delete</Button>
                    <Button onClick={(e) => {
                            e.preventDefault();
                            setDeleteVisible(false);;
                            }}>Cancel</Button>
                </Card>
            </Paper>
            <div className={"blindingBackground " + (deleteVisible === true ? 'active' : 'hidden')}>

            </div>
        </div>
    )
    } 

    export default CurrentInventory