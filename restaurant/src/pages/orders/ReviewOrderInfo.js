import React, { useEffect, useState } from "react";
import "./orders.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

const ReviewOrderInfo = (props) => {
//   console.log("resOreserinfo", props.restaurant);
//   console.log("resOreUserinfo", props.user);
  const [infoRes, setInfoRes] = useState([]);
  const [infoUser, setInfoUser] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getInfoRes(props.restaurant, props.user);
  }, [props.restaurant, props.user]);

  const getInfoRes = async (idRes, idInfo) => {
    await axios
      .get(`http://localhost:4000/api/info/id=${idRes}`)
      .then(async (res) => {
        const temp = res?.data.info;
        setInfoRes(temp);
        // console.log("thong tin nha hang ", temp);
        await axios
          .get(`http://localhost:4000/api/user/id=${idInfo}`)
          .then((res) => {
            const temp = res?.data.user;
            setInfoUser(temp);
            // console.log("thong tin nhan vien ", temp);
          });
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  return (
    <>
      {isLoading ? null : (
        <Box className="restInfo"> 
          <Box>{infoRes[0].rest_name}</Box>
          <Box className="orderInfo">
           <TableContainer  >
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                    Địa chỉ
                  </TableCell>
                  <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                    {infoRes[0].rest_addr}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                    Số điện thoại
                  </TableCell>
                  <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                    {infoRes[0].rest_phone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                    Bàn
                  </TableCell>
                  <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                    {props.table.tbl_id}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                    Nhân viên phục vụ
                  </TableCell>
                  <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                    {infoUser[0].staff_name}                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </Box>

        </Box>
      )}
    </>
  );
};

export default ReviewOrderInfo;
