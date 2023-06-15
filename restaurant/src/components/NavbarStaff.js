import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import {
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";
import { faMap, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  width: "100%",
  height: "100%"
});
const Icons = styled(Box)(({ them }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center"
}));
const NavbarStaff = () => { 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleTabs = (e, value) => {
    console.log(value);
    setValue(value);
  };
  const setOut = () => {
    localStorage.clear();
  }
  const json = localStorage.getItem("infoRestaurant");
  const valuejson = JSON.parse(json);
  const [infoRestaurant, setInfoRestaurant] = useState(valuejson);
 

  const json1 = localStorage.getItem("infoStaff");
  const valuejson1 = JSON.parse(json1);
  const [infoStaff, setInfoStaff] = useState(valuejson1);
  console.log(infoStaff)
  return (
    <div>
      <AppBar position="static">
        <StyledToolbar>
          <MenuIcon />
          <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            value={value}
            onChange={handleTabs}
            aria-label="nav tabs example"
          >
            {/* Đặt món
            <Link to={"/staff/orders/all"}>
              <Tab
              icon={<NoteAltIcon />}
              iconPosition="start"
              label="Danh sách gọi món"
              ></Tab>
            </Link> */}

            {/* Sơ đồ */}
            <Link to={"/staff/outline"}>
              <Tab
                icon={<FontAwesomeIcon icon={faMap} />}
                iconPosition="start"
                label="Sơ đồ"
              ></Tab>
            </Link>

            {/* Phiếu tạm tính */}
            <Tab
              icon={<FontAwesomeIcon icon={faReceipt} />}
              iconPosition="start"
              label="Phiếu tạm tính"
            ></Tab>

          </Tabs>
          <Typography variant="h6">{infoRestaurant.rest_name} </Typography>
          <Icons>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="/images/avatar.jpg"
              onClick={(e) => setOpen(true)}
            />
            <Typography variant="span"> {infoStaff.staff_name}</Typography>
          </Icons>
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
        <MenuItem //   onClick={handleClose}
        >
          <Link to={"/login"} onClick={() => setOut()}>
            <Typography variant="span"> Thoát</Typography>
          </Link>
         
        </MenuItem>
      </Menu>
        </StyledToolbar>
      </AppBar>
      <Outlet />
 
    </div>
  );
};

export default NavbarStaff;
