import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import '../../Styles/InventoryAdmin.scss'

const InventoryAdmin = () => {
  const [ fileInput, setFileInput] = useState('');
  const [ selectedFile, setSelectedFile] = useState('');
  const [ previewSource, setPreviewSource ] = useState();


  const uploadImage = (e) => {
    const file = e.target.files[0];
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
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
          value={fileInput}
          onChange={uploadImage} />

          <Button>Add Inventory</Button>
        </form>
        {previewSource && (
          <img src={previewSource} style={{height: "250px"}} alt="Chosen files" />
        )}
      </Box>
    </>
  )
}

export default InventoryAdmin