import React, { useState } from 'react'
import { Item } from "./Item";
import { Typography } from '@mui/material';

const PersonSitting = ({ table, viewDetailTable }) => {
  const [status, setStatus] = useState(false);
  return (
    <div
      onClick={() => {
             viewDetailTable({status: !status, table: table._id});
      }}
    >
      <Item position="relative">
        <img
          src="/images/table-gray.png"
          className="img-fluid rounded-xl"
          style={{
            position: "relative",
            width: "130px",
            height: "130px"
          }}
        />
        <span style={{ position: "absolute", color: "white" }}>{table.tbl_id}</span>
      </Item>
    </div>
  );
};

export default PersonSitting
