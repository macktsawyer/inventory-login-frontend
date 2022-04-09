import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import EditIcon from '@mui/icons-material/Edit';
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
  const [ recentFile, setRecentFile ] = useState({
    recentName: '',
    recentDesc: '',
    recentPrice: ''
  })
  const user = localStorage.getItem('user');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Maybe create a temp state(recentFiles) to hold latest upload item, default null (conditional render !null && (latestUpload)). State will empty upon refresh and item will show like normal from api call

  const uploadImage = async (base64EncodedImage) => {
    setLoading(true);
    const newItem = {
      image_data: base64EncodedImage,
      item_name: itemName,
      item_desc: itemDesc,
      item_price: itemPrice,
    }
    axios.post('http://localhost:3001/inv/newInventory', newItem).then(loadInfo()).catch(e => console.log(e));
    setRecentFile({
      recentName: itemName,
      recentDesc: itemDesc,
      recentPrice: itemPrice
    })
    console.log(recentFile)
    await sleep(2000);
    await loadInfo();
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

  const truncateDesc = (text) => {
    if (text.length > 45) {
      return text.substring(0, 44) + '...';
    } else {
      return text;
    }
  }

  const handleEdit = (id, e) => {
    e.preventDefault();
    console.log(`Editing inventory ${id}`)
  }

  const handleDelete = async (_id, id, e) => {
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
    setLoading(true);
    axios.get('http://localhost:3001/inv/getInventory').then((response) => {
      setItemInfo(response.data.information);
      console.log(response.data.information)
    });
    setLoading(false);
  }

  useEffect(() => {
    loadInfo();
  },[])

  return (
    <div className="inventoryMaster">
      <div>{user}'s Inventory Admin</div>
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
          className="inventorySubmit" 
          type="submit"
          style={{marginTop: "15px"}}>Add Inventory</Button>
        </form>
        {errorMessage && <div>{errorMessage}</div>}
      </Box>
        <div className="currentInventoryMain">
          <Paper elevation={5} className="inventoryShowcase">
              {loading && <CircularProgress />}
              <br />
              <strong>Inventory</strong>
              <Grid container spacing={2}>
                {itemInfo && !loading && itemInfo.map((i) => {
                  return (
                    <Grid item >
                      <Card 
                      className="itemCard"
                      elevation={5}>
                        <div className="cardButtons">
                          <div className="editIcon">
                            <button
                            className="editButton" 
                            onClick={(e) => {
                              handleEdit(i._id, e)
                            }} ><EditIcon /></button>
                          </div>
                          <div className="deleteIcon">
                            <button 
                            className="deleteButton"
                            onClick={(e) => {
                              handleDelete(i._id, i.id, e)
                            }}><HighlightOffOutlinedIcon sx={{color: "red"}} /></button>
                          </div>
                        </div>
                        {i.publicId ? <Image 
                        cloudName="disgd9pk6"
                        className="itemImage"
                        publicId={i.publicId} 
                        crop="scale"
                        /> 
                        : 
                        <CircularProgress />
                        }
                        <ul className="itemList">
                          <li><strong>{i.item}</strong></li>
                          <li>{truncateDesc(i.description)}</li>
                          <li><strong>{i.price}</strong></li>
                        </ul>
                      </Card>
                    </Grid>
                    )
                })}
                {recentFile && 
                <Card
                className="itemCard"
                elevation={5}>
                    <ul className="itemList">
                      <li><strong>{recentFile.itemName}</strong></li>
                      <li>{recentFile.itemDesc}</li>
                    <li><strong>{recentFile.itemPrice}</strong></li>
                  </ul>
                </Card>}
              </Grid>
          </Paper>
      </div>
    </div>
  )
}

export default InventoryAdmin