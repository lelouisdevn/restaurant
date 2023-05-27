import {
  Box,
  Button,
  Container,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LobbiesActions from "./LobbiesActions";
import TablesActions from "./TablesAction";
import "./Lobby.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CancelIcon from "@mui/icons-material/Cancel";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const Lobby = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [count, setCount] = useState();
  const [nameL, setNameL] = useState("");
  const [table, setTable] = useState([]);
  const [lobbies, setLobbies] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const callbackFunction = async (id, name) => {
    setNameL(name);
    await axios
      .get(`http://localhost:4000/api/lobby/${id}/table`)
      .then((res) => {
        const temp = res?.data.table;
        setTable(temp);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    getLobbies();
  }, []);

  const getLobbies = async () => {
    await axios
      .get("http://localhost:4000/api/lobbies")
      .then((res) => {
        const temp = res?.data.lobbies;
        setLobbies(temp);
        // console.log(temp);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:4000/api/lobby", {
          lob_name: name,
          lob_tbl_num: count
        })
        .then((res) => {
          setOpen(false);
          window.location.reload();
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Container flex={5} position="fixed">
        <Box mt={2}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: 500, fontStyle: "italic" }}
          >
            Quản lý khu vực - bàn
          </Typography>
        </Box>
        <Stack
          sx={{ paddingTop: 2, marginBottom: 5 }}
          direction="row"
          spacing={2}
          justifyContent="space-around"
        >
          <Typography variant="h6"> Thêm mới khu vực</Typography>
          <Box
            component="span"
            sx={{ border: "1px dashed grey" }}
            onClick={(e) => setOpen(true)}
          >
            <Button>Thêm mới</Button>
          </Box>
        </Stack>
        <div className="lbtable" style={{ marginBottom: 20 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead bgcolor="#F7F7F7" mr={-10}>
                <TableRow>
                  <TableCell variant="head" sx={{ fontWeight: 600 }}>
                    STT
                  </TableCell>
                  <TableCell variant="head" sx={{ fontWeight: 600 }}>
                    Tên khu vực
                  </TableCell>
                  <TableCell
                    variant="head"
                    sx={{ fontWeight: 600 }}
                    align="right"
                  >
                    Số bàn
                  </TableCell>

                  <TableCell
                    variant="head"
                    sx={{ fontWeight: 600 }}
                    align="right"
                  >
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lobbies.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell scope="row">{row.lob_name}</TableCell>
                    <TableCell align="right">{row.lob_tbl_num}</TableCell>
                    <TableCell align="right">
                      <LobbiesActions
                        params={row}
                        parentCallback={callbackFunction}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Divider />

        {isLoading ? null : (
          <div className="lbtable" style={{ marginTop: 20, marginBottom: 10 }}>
            <Box pl={8} pb={4}>
              <Typography variant="h6">
                Danh sách bàn thuộc{" "}
                <Typography variant="span"> {nameL}</Typography>
              </Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead bgcolor="#F7F7F7" mr={-10}>
                  <TableRow>
                    <TableCell variant="head" sx={{ fontWeight: 600 }}>
                      STT
                    </TableCell>
                    <TableCell variant="head" sx={{ fontWeight: 600 }}>
                      Mã bàn
                    </TableCell>
                    <TableCell
                      variant="head"
                      sx={{ fontWeight: 600 }}
                      align="right"
                    >
                      Số người ngồi
                    </TableCell>
                    <TableCell
                      variant="head"
                      sx={{ fontWeight: 600 }}
                      align="right"
                    >
                      Trạng thái
                    </TableCell>
                    <TableCell
                      variant="head"
                      sx={{ fontWeight: 600 }}
                      align="right"
                    >
                      Thao tác{" "}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell scope="row">{row.tbl_id}</TableCell>
                      <TableCell align="right">{row.tbl_seat_num}</TableCell>
                      <TableCell align="right">{row.tbl_status}</TableCell>
                      <TableCell align="right">
                        <TablesActions
                          params={row}
                          parentCallback={callbackFunction}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Container>

      <StyledModal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={310} bgcolor={"white"} p={3} borderRadius={5}>
          <Box alignItems="right" justifyContent="right" display="flex">
            <CancelIcon onClick={(e) => setOpen(false)} />
          </Box>
          <Typography variant="h5" color="gray" textAlign="center">
            Thêm khu vực mới
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              paddingLeft: 5,
              paddingRight: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              id="standard-basic"
              label="Tên khu vực "
              variant="standard"
              value={name}
              onChange={(text) => setName(text.target.value)}
            />
            <TextField
              sx={{ width: "100%", marginTop: 2 }}
              id="standard-basic"
              label="Số lượng bàn "
              variant="standard"
              value={count}
              onChange={(text) => setCount(text.target.value)}
            />
          </Box>
          <Box sx={{ marginTop: 3, paddingLeft: 8, paddingRight: 8 }}>
            <Button
              onClick={handleAdd}
              variant="contained"
              color="success"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              Thực hiện
            </Button>
          </Box>
        </Box>
      </StyledModal>
      <ToastContainer />
    </>
  );
};

export default Lobby;
