import React from 'react';
import Paper from '@mui/material/Paper';
import '../../Styles/CurrentInventory.scss';

const CurrentInventory = () => {
  return (
    <div className="currentInventoryMain">
        <Paper elevation={5} className="inventoryShowcase">
            <strong>Inventory</strong>
        </Paper>
    </div>
  )
}

export default CurrentInventory