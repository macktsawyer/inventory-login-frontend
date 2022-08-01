import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Image } from 'cloudinary-react';
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
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('tokens');
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
        if (user && token) {props.deleteItem(e, _id, id)};
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
            <div className={"inventoryShowcase " + (deleteVisible === true ? 'hidden' : 'active')}>
                {loading && <div><strong>Loading...</strong></div>}
                <br />
                <strong>Inventory</strong>
                <div className="gridContainer">
                    {itemInfo && !loading && itemInfo.map((i) => {
                    return (
                        <>
                        <div className="gridContainer" key={i._id}>
                            <div 
                            className="itemCard">
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
                                        deleteClick(i._id, e, i)}}><div className="closeX">x</div></button>
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
                                <div><strong>Loading...</strong></div>
                                }
                                <ul className="itemList">
                                <li><strong>{i.item}</strong></li>
                                <li>{truncateDesc(i.description)}</li>
                                <li><strong>{i.price}</strong></li> 
                                </ul>
                            </div>
                        </div>
                        </>
                        )
                    })}
                </div>
            </div>
            <div key={expandedItem.id} className={"expandedView " + (isActive === expandedItem._id ? 'active' : 'hidden')}>
                {
                    <div key={expandedItem._id} className="expandedCard" elevation={5}>
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
                            }}><div className="closeX">x</div></button> 
                            <h5>{expandedItem.item}</h5>
                            <ul>
                                <li style={{listStyle: "none"}}>{expandedItem.description}</li>
                                <li style={{listStyle: "none"}}>{expandedItem.price}</li> 
                            </ul>
                        </div>
                    </div>
                }
            </div>
            <div className={"deleteWarning " + (deleteVisible === true ? 'active' : 'hidden')}>
                <div className="deleteCard">
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
                    <button onClick={(e) => {
                            e.preventDefault();
                            deleteConfirmed(e, deleteItem._id, deleteItem.id)}}>Confirm Delete</button>
                    <button onClick={(e) => {
                            e.preventDefault();
                            setDeleteVisible(false);;
                            }}>Cancel</button>
                </div>
            </div>
            <div className={"blindingBackground " + (deleteVisible === true ? 'active' : 'hidden')}>
            </div>
        </div>
    )
    } 

    export default CurrentInventory