import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <div display="flex">
        <Navbar />

        <div position="fixed">
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Sidebar />
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
