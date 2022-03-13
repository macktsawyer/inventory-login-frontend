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
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post to Cloudinary
    console.log(e.target.value)
    // Post to MongoDB
  }

  return (
    <>
      <div>InventoryAdmin</div>
      <Box className="newItemFormBox">
        <form onSubmit={handleSubmit} className="newItemForm">
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

          <input 
          type="file"
          multiple
          accept="image/*"
          label="Images" 
          className="inputField"
          style={{marginTop: "15px"}}
          value={fileInput}
          onChange={uploadImage} />

          <Button 
          type="submit"
          style={{marginTop: "15px"}}>Add Inventory</Button>
        </form>
        {previewSource && <img src={previewSource} style={{height: "150px"}} alt="Chosen files" />}
      </Box>
    </>
  )
}

export default InventoryAdmin