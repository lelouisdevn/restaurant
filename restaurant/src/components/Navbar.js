import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "10px",
  width: "40%"
}));
const Icons = styled(Box)(({ them }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center"
}));
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const setOut = () => {
    localStorage.clear();
  }
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6">Restaurant TTT</Typography>

        <Search>
          <InputBase placeholder="search...." />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="/images/avatar.jpg"
            onClick={(e) => setOpen(true)}
          />
          <Typography variant="span"> Tonny</Typography>
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem>Thông tin cá nhân</MenuItem>
        <MenuItem>Nhà hàng của tôi</MenuItem>
        <MenuItem //   onClick={handleClose}
        >
          <Link to={"/login"} onClick={() => setOut()}>
            <Typography variant="span"> Thoát</Typography>
          </Link>
         
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
