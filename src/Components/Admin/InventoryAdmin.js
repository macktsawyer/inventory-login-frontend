import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../../Styles/InventoryAdmin.scss'

const InventoryAdmin = () => {
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
          label="Images" 
          variant="standard"
          className="inputField" />

          <Button>Add Inventory</Button>
        </form>
      </Box>
    </>
  )
}

export default InventoryAdmin