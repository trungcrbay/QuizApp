'use client'
import { Avatar, Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link'

const AuthSignIn = (props: any) => {
    //@ts-ignore
    const { data, session } = useSession();
    const router = useRouter()
    console.log("check data: ", data)
    console.log("check session: ", session)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");


    const handleSubmit = () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setErrorUsername("");
        setErrorPassword("");

        signIn('credentials', {
            email: username,
            password: password
        })

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
        console.log(">>> check username: ", username, ' pass: ', password)

    }

    if (data) {
        router.push('/')
    }

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
                                Sign in
                            </Typography>
                        </Box>

                        <TextField
                            onChange={(event) => setUsername(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoFocus
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
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Divider>Or using</Divider>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "25px",
                                mt: 3
                            }}
                        >
                            <Avatar
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: "orange"
                                }}

                            >
                                <GitHubIcon
                                    onClick={() => signIn('github')}
                                    titleAccess="Login with Github" />
                            </Avatar>

                            <Avatar
                                sx={{
                                    cursor: "pointer",
                                    bgcolor: "orange"
                                }}
                            >
                                < GoogleIcon titleAccess="Login with Google"
                                    onClick={() => signIn('google')}
                                />
                            </Avatar>
                        </Box>
                        <Box sx={{ marginTop: '15px', display: 'flex', gap: '10px',alignItems:'center' }}>
                            <span>Have you not had an account yet?</span>
                            <Link href={'/register'} style={{ textDecoration: 'none', color: '#FF0000' }}>Register</Link>
                            <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                or <HomeIcon style={{cursor:'pointer'}} onClick={() => router.push('/')}/>
                            </div>
                        </Box>
                    </div>
                </Grid>
            </Grid>

        </Box>

    )
}

export default AuthSignIn;
