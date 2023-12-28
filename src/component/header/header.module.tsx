"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
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
import Link from "@mui/material/Link";

const AppHeader = () => {
  const { data: session } = useSession();
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", session?.access_token!);
  }
  // console.log("Check my session: ",session.user.image);
  const { theme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Toolbar style={{ width: "1170px", margin: "0 auto" }}>
            <Typography sx={{ flexGrow: 1, color: "var(--fg)" }}>
              QuizzApp
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
                  <Avatar alt="Remy Sharp" src={`data:image/png;base64,${session.user.image} ` }/>
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
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Quiz Now</MenuItem>
                  <MenuItem onClick={() => signOut()} style={{ color: "#000" }}>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              // <Link href={'/signin'}>
              <Button style={{ color: "var(--fg)" }} onClick={() => signIn()}>
                Login
              </Button>
              // </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default AppHeader;
