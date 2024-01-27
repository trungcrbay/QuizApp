'use client'
import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import classes from './password.module.scss';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const StyledInput = styled(Input)(
    ({ theme }) => `
  
    .${inputClasses.input} {
      width: 320px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      }
    }
  `,
);

const Label = styled(
    ({ children, className }: { children?: React.ReactNode; className?: string }) => {
        const formControlContext = useFormControlContext();
        const [dirty, setDirty] = React.useState(false);

        React.useEffect(() => {
            if (formControlContext?.filled) {
                setDirty(true);
            }
        }, [formControlContext]);

        if (formControlContext === undefined) {
            return <p>{children}</p>;
        }

        const { error, required, filled } = formControlContext;
        const showRequiredError = dirty && required && !filled;

        return (
            <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
                {children}
                {required ? ' *' : ''}
            </p>
        );
    },
)`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    margin-bottom: 4px;
  
    &.invalid {
      color: red;
    }
  `;

const HelperText = styled((props: {}) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
  `;

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const PageChangePassword = (props: any) => {
    const { session } = props;
    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [open, setOpen] = React.useState<boolean>(false);
    const [successAlert, setSuccessAlert] = React.useState<boolean>(false);
    const [contentAlert, setContentAlert] = React.useState("");
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePassword = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/change-password`, {
            method: "POST",
            body: JSON.stringify({
                // ts-ignore
                current_password: password,
                new_password: newPassword
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`
            },
        });
        const data = await res.json()
        if (data.EC === 0) {
            console.log(data)
            setOpen(true);
            setSuccessAlert(true);
            setContentAlert(data.EM)
        } else {
            setOpen(true);
            setContentAlert(data.EM)
        }

    }
    return (
        <Box sx={{
            marginLeft: {
                xs: 0,
                sm:0,
                md: '20px',
                lg: '20px'
            }
        }}>
            <Grid container spacing={2} className={classes.container}>
                <Grid item md={6} xs={12} className={classes.main_content}>
                    <Box>
                        <FormControl defaultValue="" required>
                            <Label>Password</Label>
                            <StyledInput type='password' placeholder="Write your password here" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <HelperText />
                        </FormControl>

                        <FormControl defaultValue="" required style={{ marginTop: '20px' }}>
                            <Label>New Password</Label>
                            <StyledInput type='password' placeholder="Write your password here" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <HelperText />
                        </FormControl>

                        <Box sx={{ marginTop: '20px' }}>
                            <Button variant="contained" size='small' onClick={() => { handleChangePassword() }}>Save</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={6} xs={12} className={classes.content_img}>
                    <img src='passsword_bg.png' />
                </Grid>
            </Grid>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={3000}
                open={open}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={successAlert ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {contentAlert}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default PageChangePassword;

