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

const ReviewOrderInfo = ({user, restaurant, table})=> {
  console.log("ReviewOrderInfo restaurant", restaurant);
  console.log("ReviewOrderInfo user ", user);
  console.log("ReviewOrderInfo table ", table);
  // console.log("resOreserinfo", restaurant);
  const listTable= table;
  // console.log("resOreUserinfo", user);
  const [infoRes, setInfoRes] = useState([]);
  const [infoUser, setInfoUser] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getInfoRes(restaurant, user);
  }, [restaurant, user]);

  const getInfoRes = async (idRes, idUser) => {
    await axios
      .get(`http://localhost:4000/api/restaurant=${idRes}/user=${idUser}`)
      .then(async (res) => {
        const temp = res?.data.resUser;
        setInfoRes(temp.info);
        setInfoUser(temp.user);
        // console.log("thong tin nha hang ", temp);
      } )
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <>
      {isLoading ? null : (
        <Box className="restInfo">
          <Box>{infoRes.rest_name}</Box>
          <Box className="orderInfo">
            <TableContainer>
              <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                      Địa chỉ
                    </TableCell>
                    <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                      {infoRes.rest_addr}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                      Số điện thoại
                    </TableCell>
                    <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                      {infoRes.rest_phone}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                      Bàn
                    </TableCell>
                    <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                      {listTable.map((t, i) =>
                        i > 0 ? (
                          <span>, {t.table.tbl_id} </span>
                        ) : (
                          t.table.tbl_id
                        )
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                      Nhân viên phục vụ
                    </TableCell>
                    <TableCell align="left" sx={{ borderWidth: 0.4 }}>
                      {infoUser.staff_name}
                    </TableCell>
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
