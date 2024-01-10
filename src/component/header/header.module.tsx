"use client";
import React, { useState } from "react";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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


const AppHeader = () => {
  const { data: session } = useSession();
  console.log("session:: ", session)
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", session?.access_token!);
  }
  const router = useRouter()
  const { theme, setTheme } = useTheme();
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

            {theme === "light" ? (
              <Tooltip title="Dark Mode" style={{ cursor: "pointer" }}>
                <Brightness7Icon
                  onClick={() => setTheme("dark")}
                  sx={{ color: "var(--fg)" }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Light Mode" style={{ cursor: "pointer" }}>
                <Brightness4Icon
                  onClick={() => setTheme("light")}
                  sx={{ color: "var(--fg)" }}
                />
              </Tooltip>
            )}

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
