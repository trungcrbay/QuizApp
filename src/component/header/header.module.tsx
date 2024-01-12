"use client";
import React, { useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Menu from "@mui/material/Menu";
import Drawer from '@mui/material/Drawer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaBars } from "react-icons/fa";
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
type Anchor = "right";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ModalProfile from "../user/modal.user";
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import SettingsIcon from '@mui/icons-material/Settings';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const AppHeader = () => {
  const { data: session } = useSession();
  console.log("session:: ", session)
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", session?.access_token!);
  }
  const router = useRouter()
  const { theme, setTheme } = useTheme();
  const themeRef = useRef(null);
  console.log("check ref: ", themeRef.current)
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
  }));
  const [lang, setLang] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModalUser, setOpenModalUser] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModalUser(true);
  const handleCloseModal = () => setOpenModalUser(false);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {session ? (
        <Box>
          <Box sx={{ textAlign: 'right' }} ><CloseIcon /></Box>
          <Divider />
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            <AccountBoxIcon />
            <Button onClick={handleClose}>Profile</Button>
          </Box>
          {session.role === 'ADMIN' &&
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}>

              <QuizIcon />
              <Button>
                <Link href={'/admin'} style={{ color: '#000', textDecoration: 'none' }}>
                  Admin
                </Link>
              </Button>
            </Box>}

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>

            <QuizIcon />
            <Button>
              <Link href={'/quiz'} style={{ color: '#000', textDecoration: 'none' }}>
                Quiz Now
              </Link>
            </Button>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>

            <SettingsIcon />
            <Button>
              <Link href={'/quiz'} style={{ color: '#000', textDecoration: 'none' }}>
                Password
              </Link>
            </Button>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>
            <LogoutIcon />
            <Button onClick={() => signOut()} style={{ color: "#000" }}>
              Logout
            </Button>
          </Box>

        </Box>
      ) : (
        // <Link href={'/signin'}>
        <Button style={{ color: "var(--fg)" }} onClick={() => router.push('signin')}>
          Login
        </Button>
        // </Link>
      )}
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar
          position="fixed"
          style={{
            background: "var(--bg)",
            top: 0,
          }}
        >
          <Toolbar sx={{
            width: {
              xs: '100%',
              md: 1170,
              lg: 1170
            },
            margin: '0 auto'
          }} >
            <Typography sx={{ flexGrow: 1, color: "var(--fg)" }} >
              <Link href={'/'} style={{ color: 'var(--fg)', textDecoration: 'none' }} shallow >QuizzApp</Link>
            </Typography>

            {/* Dark Light Mode */}

            {theme === "light" ? (

              <>
                {/* <Brightness4Icon
                  onClick={() => setTheme("dark")}
                  sx={{
                    display: {
                      md: 'none',
                      lg: 'none',
                      xs: 'block'
                    }, color: "var(--fg)"
                  }}
                /> */}
                <MaterialUISwitch onClick={() => setTheme("dark")}
                  checked={false}
                  ref={themeRef}
                />
              </>
            ) : (
              <>
                {/* <Brightness7Icon
                    onClick={() => setTheme("light")}
                    sx={{ color: "var(--fg)" }}
                  /> */}
                <MaterialUISwitch onClick={() => setTheme("light")} checked={true}
                  ref={themeRef}
                />
              </>

            )}

            {/* End Dark Light Mode */}

            <Box sx={{
              display: {
                xs: 'block',
                md: 'none',
                lg: 'none'
              }
            }}>
              {(["right"] as const).map((anchor) => (
                <React.Fragment key={anchor}>

                  <FaBars style={{ top: 10, width: 25, height: 25, marginTop: 3, marginLeft: 10, color: "var(--fg)" }}
                    onClick={toggleDrawer(anchor, true)} />
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </Box>
            <Box sx={{
              display: {
                md: 'block',
                lg: 'block',
                xs: 'none'
              }
            }}>
              {session ? (
                <Box
                  sx={{ display: "flex", marginLeft: "20px", cursor: "pointer" }}
                >
                  <div
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Avatar alt="Remy Sharp" src={`data:image/png;base64,${session.user.image} `} />
                  </div>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={() => setOpenModalUser(true)}>Profile</MenuItem>
                    {session.role === 'ADMIN' &&
                      <MenuItem>
                        <Link href={'/admin'} style={{ color: '#000', textDecoration: 'none' }}>
                          Admin
                        </Link>
                      </MenuItem>}
                    <MenuItem>
                      <Link href={'/quiz'} style={{ color: '#000', textDecoration: 'none' }}>
                        Quiz Now
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => signOut()} style={{ color: "#000" }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                // <Link href={'/signin'}>
                <Button style={{ color: "var(--fg)" }} onClick={() => router.push('signin')}>
                  Login
                </Button>
                // </Link>

              )}
            </Box>
            {openModalUser === true &&
              <ModalProfile
                open={openModalUser}
                setOpen={setOpenModalUser}
                handleClose={handleCloseModal}
                handleOpen={handleOpenModal}
              />}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default AppHeader;
