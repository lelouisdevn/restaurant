import React from "react";

import NavbarStaff from "./NavbarStaff";
import Sidebar from "./Sidebar";
import { Box, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <div display="flex">
        <NavbarStaff />

        <div position="fixed">
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box flex={5}>
             <Outlet />
            </Box>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Layout;
