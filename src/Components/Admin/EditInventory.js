import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import '../../Styles/EditInventory.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

let token = localStorage.getItem('tokens');

const EditInventory = () => {
    const location = useLocation();
    const [ editingItem, setEditingItem ] = useState({            
        editItemName: location.state.newItemName,
        editItemDesc: location.state.newItemDesc,
        editItemPrice: location.state.newItemPrice,
        editItemID: location.state.newItemID,
        editItemPub: location.state.newItemPub });
    let Navigate = useNavigate();

    const handleEditOnChange = (e) => {
        const value = e.target.value;
        setEditingItem({
            ...editingItem,
            [e.target.name]: value
        })
    }

    const handleEditSubmitForm = async (e) => {
        e.preventDefault();
        const newEditItem = {
            item_name: editingItem.editItemName,
            item_desc: editingItem.editItemDesc,
            item_price: editingItem.editItemPrice,
            item_id: editingItem.editItemID,
        }
        let res;
        try {
            await axios.put('http://localhost:3001/inv/updateInventory', newEditItem).then((response) => {
                res = response.status;
            })
          } catch (error) {
            console.error(error)
          }
        if (res === 200) {
            Navigate('/Admin')
        }
    }

  return (
    <>
        <Link className="homeButton" to='/'><button variant="text"><strong>Home</strong></button></Link> 
        <div className="editMainContent">
            <div>EditInventory</div>

            <div className="editFormPaper">
                <div className="editFormCard">
                    <Image 
                        cloudName="disgd9pk6"
                        className="editItemImage"
                        publicId={ editingItem.editItemPub} 
                        crop="scale"
                        /> 
                    <form onSubmit={handleEditSubmitForm} className="editItemForm">
                        <TextField 
                        id="standard-basic" 
                        label="Name" 
                        variant="standard"
                        required={true}
                        name="editItemName"
                        value={ editingItem.editItemName}
                        onChange={handleEditOnChange}
                        className="inputField" />

                        <TextField
                        id="standard-basic-flexible"
                        label="Description"
                        variant="standard"
                        multiline
                        maxRows={6}
                        required={true}
                        name="editItemDesc"
                        value={ editingItem.editItemDesc}
                        onChange={handleEditOnChange}
                        className="inputField" />

                        <TextField 
                        id="standard-basic" 
                        label="Price" 
                        variant="standard"
                        required={true}
                        name="editItemPrice"
                        value={ editingItem.editItemPrice}
                        onChange={handleEditOnChange}
                        className="inputField" />


                        <button
                        className="editSubmitButton" 
                        type="submit"
                        style={{marginTop: "15px"}}>Confirm Edit</button>
                    </form>
                    <button
                        className="editSubmitButton" 
                        onClick={(() => {
                            Navigate('/Admin')
                        })}
                        style={{marginTop: "15px"}}>Go Back</button>
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

export default EditInventory