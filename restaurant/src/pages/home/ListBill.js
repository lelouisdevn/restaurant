import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";
import "./home.scss";
import VND from "../../components/currency";
import { Typography } from "antd";
const headCells = [
  {
    id: "stt",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "mahoadon",
    numeric: true,
    disablePadding: false,
    label: "Mã hóa đơn ",
  },
  {
    id: "nhanvien",
    numeric: true,
    disablePadding: false,
    label: "Nhân viên",
  },
  {
    id: "tong",
    numeric: true,
    disablePadding: false,
    label: "Tổng hóa đơn",
  },
];
function ListBill(props) {
  const rows = props.item;
  const [dense, setDense] = React.useState(false);

  return (
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
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell scope="row">
                    <Typography
                      variant="p"
                      sx={{ fontWeight: 600, textAlign: "center" }}
                    >
                      Hiện tại chưa có dữ liệu
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, index) => (
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
                    <TableCell align="center">{row._id}</TableCell>
                    <TableCell align="center">{row.user.staff_name}</TableCell>
                    <TableCell align="center">
                      {VND.format(row.total)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Paper>
    
      // <div className="outer-wrapper">
      //   <div className="table-wrapper">
      //     <table
      //      >
      //     <thead>
      //       <th>STT</th>  
      //       <th>Mã hóa đơn </th>  
      //       <th>Nhân viên</th>  
      //       <th>Tổng hóa đơn</th>  
      //       </thead>
      //       <tbody>
      //         {rows.length === 0 ? (
      //           <tr>
      //             <td scope="row">
      //               <Typography
      //                 variant="p"
      //                 sx={{ fontWeight: 600, textAlign: "center" }}
      //               >
      //                 Hiện tại chưa có dữ liệu
      //               </Typography>
      //             </td>
      //           </tr>
      //         ) : (
      //           rows.map((row, index) => (
      //             <tr
      //               // hover
      //               // tabIndex={-1}
      //               // key={index}
      //               // sx={{ cursor: "pointer" }}
      //             >
      //               <td
      //                 align="center"
      //               >
      //                 {index + 1}
      //               </td>
      //               <td align="center">{row._id}</td>
      //               <td align="center">{row.user.staff_name}</td>
      //               <td align="center">
      //                 {VND.format(row.total)}
      //               </td>
      //             </tr>
      //           ))
      //         )}
      //       </tbody>
      //     </table>
      //   </div>
      // </div>
   
    
  );
}

export default ListBill;
