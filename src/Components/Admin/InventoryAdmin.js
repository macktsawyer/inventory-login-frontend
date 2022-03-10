import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import '../../Styles/InventoryAdmin.scss'

const InventoryAdmin = () => {

  const uploadImage = (files) => {
    console.log(files)
  }

  return (
    <>
      <div>InventoryAdmin</div>
      <Box className="newItemFormBox">
        <form className="newItemForm">
          <TextField 
          id="standard-basic" 
          label="Name" 
          variant="standard"
          className="inputField" />

          <TextField
          id="standard-basic-flexible"
          label="Description"
          variant="standard"
          multiline
          maxRows={6} 
          className="inputField" />

          <TextField 
          id="standard-basic" 
          label="Price" 
          variant="standard" 
          className="inputField" />

          <TextField 
          id="standard-basic"
          type="file"
          accept="image/*"
          label="Images" 
          variant="standard"
          className="inputField"
          onChange={(event) => {
            uploadImage(event.target.files)
          }} />

          <Button>Add Inventory</Button>
        </form>
      </Box>
    </>
  )
}

export default InventoryAdmin