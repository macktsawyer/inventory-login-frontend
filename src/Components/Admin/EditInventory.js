import React from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Card from '@mui/material/Card';
// import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../../Styles/EditInventory.scss';
import axios from 'axios';

let token = localStorage.getItem('tokens')

const EditInventory = ({itemProps}) => {

    // const handleEditOnChange = (e) => {
    //     const value = e.target.value;
    //     setNewItemEditedValue({
    //         ...newItemEditedValue,
    //         [e.target.name]: value
    //     })
    // }

    const handleEditSubmitForm = async (e) => {
        e.preventDefault();
        const newEditItem = {
            item_name: itemProps.newItemName,
            item_desc: itemProps.newItemDesc,
            item_price: itemProps.newItemPrice,
            item_id: itemProps.newItemID
        }
        try {
            await axios.put('http://localhost:3001/inv/updateInventory', newEditItem).then((response) => {
            //   setItemInfo(response.data)
            })
          } catch (error) {
            console.error(error)
          }
    }

console.log(itemProps)

  return (
    <>
        <Link className="homeButton" to='/'><Button variant="text"><strong>Home</strong></Button></Link> 
        <div className="editMainContent">
            <div>EditInventory</div>
            <p> lorem ipsum</p>
            <p>{itemProps}</p>
        </div>


        <footer className="footerBar">
          {token === 'null'  
          
          ?

          <div>
            <Link to='/Login'><Button variant="text"><strong>Login</strong></Button></Link>
            <Link to='/Register'><Button variant="text"><strong>Register</strong></Button></Link>
          </div>

          :

          <div>
            <Link to='/Admin'><Button variant="text"><strong>Dashboard</strong></Button></Link>
            <Link to='/Logout'><Button variant="text"><strong>Logout</strong></Button></Link>
          </div>
          }

        </footer>
    </>
)
}

export default EditInventory