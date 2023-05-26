import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

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
            <Tab label="Đặt món"> </Tab>
            <Tab label="Sơ đồ"> </Tab>
            <Tab label="Trả món"> </Tab>
            <Tab label="Phiếu tạm tính"> </Tab>
          </Tabs>
        </StyledToolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item 1 Detail
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item 2 Detail
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item 3 Detail
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item 4 Detail
      </TabPanel>
    </div>
  );
};
function TabPanel(props) {
  const { children, value, index } = props;

  // console.log("value: ", value);
  // console.log("index: ", index);
  return <div>{value === index && <h1>{children}</h1>}</div>;
}

export default NavbarStaff;
