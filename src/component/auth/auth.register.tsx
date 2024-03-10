'use client'
import { Avatar, Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import Alert from '@mui/material/Alert';
import Link from 'next/link'
import CheckIcon from '@mui/icons-material/Check';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
    open: boolean;
}

const AuthRegister = (props: any) => {
    //@ts-ignore
    const { data, session } = useSession();
    const router = useRouter()

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
    const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");

    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const registerParticipant = async ({ email, username, password }: IRegister) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            }),
        });
        const data = await res.json()
        console.log("check data: ",data)
        if (data) {
            setUsername("");
            setPassword("")
            setEmail("");
            setOpenSnackbar(true);
            
        }
    };

    const handleSubmit = async () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setIsErrorEmail(false);
        setErrorUsername("");
        setErrorPassword("");
        setErrorEmail("");

        if (!email) {
            setIsErrorEmail(true);
            setErrorEmail("Email is not empty.")
            return;
        }

        if (!username) {
            setIsErrorUsername(true);
            setErrorUsername("Username is not empty.")
            return;
        }
        if (!password) {
            setIsErrorPassword(true);
            setErrorPassword("Password is not empty.")
            return;
        }

        registerParticipant({ email, username, password })
        
    }

    // if (data) {
    //     router.push('/')
    // }

    const keyDownHandler = (event: React.KeyboardEvent) => {
        console.log(event.key)
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        //@ts-ignore
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            //@ts-ignore
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [username, password]);

    return (
        <Box>
            <Grid container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh"
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    lg={4}
                    sx={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }}
                >
                    <div style={{ margin: "20px" }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%"
                        }}>

                            <Avatar>
                                <LockIcon />
                            </Avatar>

                            <Typography component="h1">
                                Register
                            </Typography>
                        </Box>

                        <TextField
                            onChange={(event) => setEmail(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            autoFocus
                            error={isErrorEmail}
                            helperText={errorEmail}
                            value={email}
                        />

                        <TextField
                            onChange={(event) => setUsername(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            value={username}
                            error={isErrorUsername}
                            helperText={errorUsername}
                        />
                        <TextField
                            onChange={(event) => setPassword(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={password}
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            error={isErrorPassword}
                            helperText={errorPassword}

                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        <Button
                            sx={{
                                my: 3
                            }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                handleSubmit()
                            }
                            }

                        >
                            Register
                        </Button>
                        <Box sx={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            <span>Already had an account?</span>
                            <Link href={'/signin'} style={{ textDecoration: 'none', color: '#FF0000' }}>Log in</Link>
                        </Box>
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={openSnackbar}
                            sx={{ background: 'transparent' }}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                            message={
                                <Alert icon={<CheckIcon fontSize="inherit" />} onClose={handleCloseSnackbar} severity="success">
                                    Create new user successfully!
                                </Alert>
                            }
                            key={vertical + horizontal}
                        />
                    </div>
                </Grid>
            </Grid>

        </Box>

    )
}

export default AuthRegister;
