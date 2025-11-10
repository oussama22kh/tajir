import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const Discount = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="contained" color="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Modal heading</DialogTitle>
          <DialogContent>
            Woohoo, you are reading this text in a modal!
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Close
            </Button>
            <Button onClick={handleClose} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  
}

export default Discount
