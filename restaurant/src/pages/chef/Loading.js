import React from "react";
import { Box } from "@mui/material";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <Box flex={5}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <ReactLoading
          type="cubes"
          color="grey"
          height={150}
          width={200}
        ></ReactLoading>
      </Box>
    </Box>
  );
}

export default Loading;
