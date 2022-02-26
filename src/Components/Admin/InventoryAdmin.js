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
          <Button>Add Inventory</Button>
          <TextField 
          id="outlined-basic" 
          label="Name" 
          variant="outlined" />

          <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={6} />

          <TextField 
          id="outlined-basic" 
          label="Price" 
          variant="outlined" />

          <TextField 
          id="outlined-basic" 
          label="Outlined" 
          variant="outlined" />
        </form>
      </Box>
    </>
  )
}

export default InventoryAdmin