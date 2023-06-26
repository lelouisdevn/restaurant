import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import axios from "axios";
import format from "date-fns";
import moment from "moment";
import VND from '../../components/currency';
function SyntheticSearch({ data, dataTotal }) {
  console.log("data search: ", data);
  const [dense, setDense] = React.useState(false);
  
  const headCells = [
    {
      id: "stt",
      numeric: false,
      disablePadding: true,
      label: "STT"
    },
    {
      id: "nhahang",
      numeric: true,
      disablePadding: false,
      label: "Nhà hàng "
    },
    {
      id: "nhanvien",
      numeric: true,
      disablePadding: false,
      label: "Số nhân viên "
    },
    {
      id: "sohoadon",
      numeric: true,
      disablePadding: false,
      label: "Số lượng hóa đơn"
    },
    {
      id: "danhthu",
      numeric: true,
      disablePadding: false,
      label: "Doanh thu"
    },
    {
      id: "phantram",
      numeric: true,
      disablePadding: false,
      label: "Phần trăm"
    }
  ];

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <Box className="outer-wrapper">
          <Box className="table-wrapper3">
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align="center"
                      padding={headCell.disablePadding ? "none" : "normal"}
                      sx={{ fontWeight: 500, fontSize: 18 }}
                    >
                      <TableSortLabel>{headCell.label}</TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row, index) => (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      sx={{ cursor: "pointer" }}
                    >
                      {/* format(new Date(), ) */}
                      <TableCell align="center">{index + 1} </TableCell>
                      <TableCell align="center">
                        {row.restaurant.rest_name}
                      </TableCell>
                      <TableCell align="center">{row.staff}</TableCell>
                      <TableCell align="center">
                        {row.count ? row.count : 0}
                      </TableCell>
                      <TableCell align="center">
                        {row.total ? VND.format(row.total) : 0}
                      </TableCell>
                      <TableCell align="center">
                        {row.total / dataTotal > 0
                          ? row.total / dataTotal
                          : 0}
                        %
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    Tổng:{" "}
                    {dataTotal > 0 ? VND.format(dataTotal) : VND.format(0)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default SyntheticSearch