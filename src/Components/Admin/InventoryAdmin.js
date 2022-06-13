import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import CurrentInventory from './CurrentInventory';
import axios from 'axios';
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
  const [ itemInfo, setItemInfo ] = useState([]);
  const user = localStorage.getItem('user');

  // Maybe create a temp state(recentFiles) to hold latest upload item, default null (conditional render !null && (latestUpload)). State will empty upon refresh and item will show like normal from api call

  const uploadImage = async (base64EncodedImage) => {
    setLoading(true);
    const newItem = {
      image_data: base64EncodedImage,
      item_name: itemName,
      item_desc: itemDesc,
      item_price: itemPrice,
    }
    try {
      await axios.post('http://localhost:3001/inv/newInventory', newItem).then((response) => {
        setItemInfo(prev => [...prev, response.data])
      })
    } catch (error) {
      console.error(error)
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    setItemName('');
    setItemDesc('');
    setItemPrice('');
    setPreviewSource();
    setFileInput('');
    setSelectedFile('');
  }

  const handleDelete = async (e, _id, id) => {
    e.preventDefault();
    setLoading(true);
    console.log(`Deleted inventory item ${id}`)
    axios.delete(`http://localhost:3001/inv/deleteInventory/${_id}`);
    
    axios.post('http://localhost:3001/inv/deleteImage', {
      itemID: id
    });
    loadInfo();
    setLoading(false);
  }

  const loadInfo = async () => {
    try {
      await axios.get('http://localhost:3001/inv/getInventory').then((response) => {
        setItemInfo(response.data.information);
      });
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadInfo();
  },[])

  return (
    <div className="inventoryMaster">
      <div>{user}'s Inventory Admin</div>
      <div className="newItemFormBox">
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

          <button
          className="inventorySubmit" 
          type="submit"
          style={{marginTop: "15px"}}>Add Inventory</button>
        </form>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
        < CurrentInventory itemList={itemInfo} deleteItem={handleDelete} />
    </div>
  )
}

export default InventoryAdmin