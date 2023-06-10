import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
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

const NavbarStaff = () => { 

  const [value, setValue] = useState(0);
  const handleTabs = (e, value) => {
    console.log(value);
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
            
            <Link to={"/login"} onClick={() => setOut()}>
              <Tab label="Thoát"> </Tab>
            </Link>

          </Tabs>
            
        </StyledToolbar>
      </AppBar>
      <Outlet />
 
    </div>
  );
};

export default NavbarStaff;
