import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Box, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
const Layout = () => {
  const [isLoggedOut, setLogout] = useState(false);
  const style = {
    position: "absolute",
    width: "100%",
    height: "100vh",
    zIndex: "11",
  }
  const navigate = useNavigate();
  const setLogoutStatus = () => {
    setLogout(true);
    const staffInfo = JSON.parse(localStorage.getItem("infoStaff"));
    setTimeout(() => {
      if (staffInfo === null) {
        navigate('/login');
      }
      console.log(staffInfo)
    }, 1000);
  }
  return (
    <>
      {
        isLoggedOut ?
          <div style={style}>
            <div className="logo logo-ani-prev" style={{ margin: 0 }}>
              <img src="/images/logoo.png" />
            </div>
          </div>
          :
          <div display="flex">
            <Navbar setLogout={setLogoutStatus} />

            <div position="fixed">
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <Sidebar />
                <Box flex={5}>
                  <Outlet />
                </Box>
              </Stack>
            </div>
          </div>
      }
    </>
  );
};

export default Layout;
