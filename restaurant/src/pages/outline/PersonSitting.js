import React from 'react'
import { Item } from "./Item";
import { Typography } from '@mui/material';

const PersonSitting = ({table}) => {
  return (
    <div>
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
        <span style={{ position: "absolute", color: "white" }}>
          {table}
        </span>
      </Item>
    </div>
  );
}

export default PersonSitting
