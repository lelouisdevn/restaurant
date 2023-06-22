import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SelectedTable = () => {
  return (
    <div
      style={{
        position: "absolute",
        marginTop: "-115px",
        marginRight: "-110px"
      }}
    >
      <CheckCircleOutlineIcon sx={{ color: "green" }} />
    </div>
  );
};

export default SelectedTable;
