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
function Synthetic({ user, restaurant }) {
  const [dense, setDense] = React.useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const today = moment().format("MM/DD/YYYY");


  // Hiển thị thống kê tổng hợp trong ngày hôm nay 
  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:4000/api/statictical/all/today/user=${user._id}`)
        .then((res) => {
          const temp = res?.data.listBill2;
          // console.log("thống kê trong ngày hôm nay : ", temp);
          setTotal(res?.data.to);
          setData(temp);
        });
    })();
  }, [restaurant._id]);

  // Thống kê theo khoảng thời gian tìm kiếm 
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
                        {row.restaurant.info.rest_name}
                      </TableCell>
                      <TableCell align="center">{row.staff}</TableCell>
                      <TableCell align="center">
                        {row.bill.count ? row.bill.count : 0}
                      </TableCell>
                      <TableCell align="center">
                        {row.bill.total ? VND.format(row.bill.total) : 0}
                      </TableCell>
                      <TableCell align="center">
                        {row.bill.total / total > 0
                          ? (row.bill.total / total).toFixed(1) *100
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
                    Tổng: {total > 0 ? VND.format(total) : VND.format(0)}
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

export default Synthetic