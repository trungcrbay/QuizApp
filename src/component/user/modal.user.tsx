'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { useSession, signIn, signOut } from "next-auth/react";
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation'

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

    const [editUsername, setEditUsername] = React.useState<boolean>(false)
    const [username, setUsername] = React.useState("");
    const [accessToken, setAccessToken] = React.useState("");
    const [image, setImage] = React.useState<File | null>(null);
    const [isChangePass, setIsChangePass] = React.useState<boolean>(false);
    const router = useRouter()

    React.useEffect(() => {
        setUsername(session?.user.email);
        setImage(session?.user.image);
        setAccessToken(session.access_token);
    }, [])

    const onChangeUsername = () => {


    }


    const handleDataChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            //@ts-ignore
            setImage(URL.createObjectURL(event.target.files[0]))
        }
    }

    const postUpdateProfile = async ({ username, image }: IUserProfile) => {
        const formData = new FormData();
        formData.append("username", username);
        //@ts-ignore
        formData.append("userImage", image);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //ts-ignore
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });

        const data = await res.json();

    };

    const handleUpdateProfile = async () => {
        await postUpdateProfile({ username, image })
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#000' }}>
                            Profile
                        </Typography>
                        <CloseIcon sx={{ cursor: 'pointer' }}
                            onClick={() => handleClose()} />
                    </Box>
                    {editUsername === false ?
                        <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', gap: '5px', color: '#000' }}>
                            Email: {username}
                            <EditIcon onClick={() => setEditUsername(true)} style={{ cursor: 'pointer' }} />
                        </Typography>
                        : <Box sx={{ display: 'flex', gap: '5px' }}>
                            <Input value={username} onChange={(e) => {
                                setUsername(e.target.value);
                            }} />
                            <Button variant="contained"
                                onClick={() => {
                                    setEditUsername(false)
                                }}
                                style={{ height: '30px' }}
                            >OK</Button>
                        </Box>}
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', gap: '5px', color: '#000' }}>
                        Role: {session?.role}
                    </Typography>
                    <Button variant="contained"
                        onClick={() => {
                            setEditUsername(false);
                            setIsChangePass(true);
                            router.push('/password')
                        }}
                        style={{ height: '30px', marginTop: '20px' }}
                    >Password</Button>

                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        {image ? <img
                            src={`data:image/jpeg;base64, ${image}`} /> 
                        : <img
                        src={'no-image.jpg'} style={{width:'100%'}}/> 
                        }
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Button variant="contained" sx={{ height: '30px' }}>
                            <label htmlFor='uploadImg' style={{ display: 'flex', gap: '5px' }}>
                                <CloudUploadIcon />
                                Upload
                            </label>
                        </Button>

                        <input type='file' id='uploadImg' style={{ display: 'none' }} onChange={handleDataChange} />
                        <Button style={{ height: '30px' }} variant="contained" onClick={() => {
                            onChangeUsername()
                            handleUpdateProfile()
                        }}>Update</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalProfile;