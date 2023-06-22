import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SiderbarStaff from "../../components/SiderbarStaff";
import { Outlet } from "react-router-dom";
import RectangleIcon from "@mui/icons-material/Rectangle";

import Chef from "./Chef";
import LoadingT from "./Loading";

const LayoutChef = () => {
  const [idlobby, setIdLobby] = useState();
  const [arrange, setArrange] = useState();
  const [numRow, setNumRow] = useState();
  const [ls, setLs] = useState();
  const [isLoading, setisLoading] = useState(true);

  const callbackFunction = async (id, arrangel, num) => {
    setIdLobby(id);
    setArrange(arrangel);
    setNumRow(num);
    setisLoading(false);
  };
  // const selectTableFunction = async (list) => {
  //   setLs(list);
  // };
  return (
    <div display="flex">
      {/* <Box
        height={40}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">
          Bàn đang chọn:{" "}
          {ls &&
            ls.map((l, i) => (
              <Typography variant="span" key={i}>
                {l.tbl_id} {i > -1 && i < ls.length - 1 ? "," : null}
              </Typography>
            ))}
        </Typography>
      </Box> */}
      <Box
        direction="row"
        display="flex"
        alignItems="center"
        justifyContent="left"
        height={30}
        width="95%"
        bgcolor="#EFEEEE"
        className="mstatus"
      >
        <Stack direction="row" spacing={1} mr={1}>
          <RectangleIcon
            className="icon"
            style={{
              color: "#085BE3"
            }}
          />
          <Typography> Bàn trống</Typography>
        </Stack>
        <Stack direction="row" spacing={1} mr={1}>
          <RectangleIcon
            className="icon"
            style={{
              color: "grey"
            }}
          />
          <Typography> Bàn đang sử dụng</Typography>
        </Stack>
        <Stack direction="row" spacing={1} mr={1}>
          <RectangleIcon
            className="icon"
            style={{
              color: "goldenrod"
            }}
          />
          <Typography> Bàn đặt trước</Typography>
        </Stack>
      </Box>
      <div display="fixed">
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <SiderbarStaff parentCallback={callbackFunction} />
          {isLoading ? (
            <LoadingT />
          ) : (
            <Box flex={5}>
              {/* <Outlet /> */}
              <Chef
                id={idlobby}
                arrange={arrange}
                numRow={numRow}
                // selectTableCallback={selectTableFunction}
              />
            </Box>
          )}
        </Stack>
        
      </div>
    </div>
  );
};

export default LayoutChef;
