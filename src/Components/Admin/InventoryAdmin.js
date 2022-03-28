import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../Services/authContext';
import '../../Styles/InventoryAdmin.scss'

const InventoryAdmin = () => {
  const [ fileInput, setFileInput] = useState('');
  const [ selectedFile, setSelectedFile] = useState('');
  const [ previewSource, setPreviewSource ] = useState();
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ itemName, setItemName ] = useState('');
  const [ itemDesc, setItemDesc ] = useState('');
  const [ itemPrice, setItemPrice ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const { userValue } = useAuth();

  const uploadImage = async (base64EncodedImage) => {
    try {
      setLoading(true);
      await fetch('http://localhost:3001/inv/newInventory', {
        method: 'POST',
        body: JSON.stringify({
          image_data: base64EncodedImage,
          item_name: itemName,
          item_desc: itemDesc,
          item_price: itemPrice,
        }),
        headers: {'Content-Type': 'application/json'}
      })
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInput(e.target.value);
  }
  
  const handleFileNameChange = (e) => {
    e.preventDefault();
    setItemName(e.target.value);
  }

  const handleFileDescChange = (e) => {
    e.preventDefault();
    setItemDesc(e.target.value);
  }

  const handleFilePriceChange = (e) => {
    e.preventDefault();
    setItemPrice(e.target.value);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    };
  }

  const handleSubmit = () => {
    if(!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result)
    };
    reader.onerror = () => {
      console.error('Something went wrong with file submission');
      setErrorMessage('Error With Submit Feature');
    }
  }

  return (
    <div className="inventoryMaster">
      <div>{userValue}'s Inventory Admin</div>
      <Box className="newItemFormBox">
        <form onSubmit={handleSubmit} className="newItemForm">
          <TextField 
          id="standard-basic" 
          label="Name" 
          variant="standard"
          required={true}
          value={itemName}
          onChange={handleFileNameChange}
          className="inputField" />

          <TextField
          id="standard-basic-flexible"
          label="Description"
          variant="standard"
          multiline
          maxRows={6}
          required={true}
          value={itemDesc}
          onChange={handleFileDescChange}
          className="inputField" />

          <TextField 
          id="standard-basic" 
          label="Price" 
          variant="standard"
          required={true}
          value={itemPrice}
          onChange={handleFilePriceChange}
          className="inputField" />

          <input 
          type="file"
          multiple
          accept="image/*"
          label="Images" 
          className="inputField"
          style={{marginTop: "15px"}}
          value={fileInput}
          onChange={handleFileInputChange} />

          {loading === true && <CircularProgress />}

          <br />

          {previewSource && <img src={previewSource} style={{height: "150px", marginTop:"15px"}} alt="Chosen files" />}

          <br />

          <Button 
          type="submit"
          style={{marginTop: "15px"}}>Add Inventory</Button>
        </form>
        {errorMessage && <div>{errorMessage}</div>}
      </Box>
    </div>
  )
}

export default InventoryAdmin