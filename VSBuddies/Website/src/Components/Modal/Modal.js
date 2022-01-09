import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import "./Modal.css";

export default function MODAL(){

    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        backgroundColor:"#181A1B",
        color:"white",
        boxShadow: 24,
        p: 4,
        fontFamily: "Poppins"
    };

    return (
        <div className="modal">
            <Modal open={open} onClose={handleClose}
            closeAfterTransition BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500,}}>
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="modal-text">Looks like you haven't filled all your details.<br/>
                            Go to your profile  
                            <AccountCircleIcon color="primary" fontSize="large" />  
                            and edit your details.
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}