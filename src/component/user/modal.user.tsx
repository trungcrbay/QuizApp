'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { useSession, signIn, signOut } from "next-auth/react";
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';

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

const ModalProfile = (props: any) => {
    const { open, handleClose } = props;
    const { data: session } = useSession();
    console.log("session:: ", session)
    const [editUsername, setEditUsername] = React.useState<boolean>(false)
    const [username,setUsername] = React.useState(null);
    React.useEffect(() => {
        setUsername(session?.user.username)
    },[session?.user])
    const onChangeUsername = (e : any) => {
        setUsername(e.target.value)
        console.log("set username: ", username);
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Profile
                    </Typography>
                    {editUsername === false ?
                        <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', gap: '5px' }}>
                            Email: {session?.user.email}
                            <EditIcon onClick={() => setEditUsername(true)} style={{cursor:'pointer'}}/>
                        </Typography>
                        : <Box sx={{display:'flex',gap:'5px'}}>
                            <Input value={username} onChange={(e) => onChangeUsername(e.target.value)}/>
                            <Button variant="contained" 
                            onClick={() => setEditUsername(false)}
                            style={{height:'30px'}}
                            >OK</Button>
                        </Box>}
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', gap: '5px' }}>
                        Role: {session?.role}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={`data:image/jpeg;base64, ${session?.user.image}`} />
                    </Typography>
                    <Button variant="contained">Update</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalProfile;