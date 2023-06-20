import * as React from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

const headCells = [
  {
    id: "stt",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "hovaten",
    numeric: true,
    disablePadding: false,
    label: "Họ và tên ",
  },
  {
    id: "chuvu",
    numeric: true,
    disablePadding: false,
    label: "Chức vụ",
  },
];

export default function ListStaff(props) {
  const rows = props.item;
  console.log("props: ", props.item);
  const [dense, setDense] = React.useState(false);

  return ( 
    <>
      <Paper sx={{ width: "100%" }}>
        <Box className="outer-wrapper">
          <Box className="table-wrapper">
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
                {rows.map((row, index) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell 
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.user.staff_name}</TableCell>
                    <TableCell align="center">
                      {row.user.role === "1"
                        ? "Chủ nhà hàng"
                        : row.user.role === "2"
                        ? "Nhân viên phục vụ"
                        : "Nhân viên bếp"}
                    </TableCell>
                   </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
