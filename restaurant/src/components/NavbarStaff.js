import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";
import LayoutOutline from "../pages/outline/LayoutOutline";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  width: "100%",
  height: "100%"
});

const NavbarStaff = () => { 

  const [value, setValue] = useState(0);
  const handleTabs = (e, value) => {
    // console.log(value);
    setValue(value);
  };
  const setOut = () => {
    localStorage.clear();
  }
  return (
    <div>
      <AppBar position="static">
        <StyledToolbar>
          <MenuIcon />
          {/* <Typography variant="h6">Restaurant TTT</Typography> */}

          <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            // sx={{backgroundColor:'red'}}
            value={value}
            onChange={handleTabs}
          >
            <Link to={"/staff/orders"}>
              <Tab label="Đặt món"></Tab>
            </Link>
            <Link to={"/staff/orders/all"}>
              <Tab label="Danh sách gọi món"></Tab>
            </Link>
            <Link to={"outline"}>
              <Tab label="Sơ đồ"> </Tab>
            </Link>
            <Tab label="Trả món"> </Tab>
            <Tab label="Phiếu tạm tính"> </Tab>
            <Link to={"/login"} onClick={() => setOut()}>
              <Tab label="Thoát"> </Tab>
            </Link>
          </Tabs>
            
        </StyledToolbar>
      </AppBar>
      <Outlet />
   
      {/* <TabPanel value={value} index={0}>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LayoutOutline />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item 3 Detail
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item 4 Detail
      </TabPanel> */}
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
}

export default NavbarStaff;
