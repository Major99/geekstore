import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SigninComponent from './signin'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export default function TransitionsModal({ fullWidth, closeDrawer, size }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const drawerOff = (fuckOff) => {
    if(closeDrawer){
      return closeDrawer(fuckOff)
    }
  }
  return (
    <div>
    <Button variant="contained" size={size} onClick={handleOpen} color="primary" className=" header-signin-btn" fullWidth={fullWidth}>Sign In</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableEnforceFocus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
             <SigninComponent success={drawerOff}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
