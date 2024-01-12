'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { useSession } from "next-auth/react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface UserProfle {
    username: string;
    image: File | null;
}

const ModalChangePassword = (props: any) => {
    const { open, handleClose } = props;
    const { data: session } = useSession();
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Profile
                        </Typography>
                        <CloseIcon sx={{ cursor: 'pointer' }}
                            onClick={() => handleClose()} />
                    </Box>
                    <h1>Pro max</h1>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalChangePassword;