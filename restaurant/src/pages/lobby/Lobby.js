import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DataGrid } from "@mui/x-data-grid";
import LobbiesActions from "./LobbiesActions";
import "./Lobby.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit, Preview } from "@mui/icons-material";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

// Dữ liệu cột
const columns = [
  { field: "null", headerName: "", width: 50 },
  { field: "id", headerName: "ID", width: 70 },
  { field: "lobby", headerName: "Tên khu vực", width: 130 },
  { field: "table", headerName: "Số bàn", type: "number", width: 130 },
  {
    field: "act",
    headerName: "Thao tác",
    type: "actions",
    width: 270,
    renderCell: (params) => <LobbiesActions {...{ params }} />
  }
];
// Dữ liệu hàng
const rows = [
  { null: "", id: 1, lobby: "Snow", table: 10 },
  { null: "", id: 2, lobby: "Lannister", table: 8 },
  { null: "", id: 3, lobby: "Lannister", table: 8 },
  { null: "", id: 4, lobby: "Stark", table: 8 }
];

function createData(code, countp, status) {
  return { code, countp, status };
}
const rowstable = [
  createData("S01", 4, "trống"),
  createData("S02", 4, "đang dùng"),
  createData("S03", 4, "đang dùng"),
  createData("S04", 4, "trống"),
  createData("S05", 6, "trống")
];

const Lobby = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [count, setCount] = useState();

  const handleAdd = async (e) => {
    e.preventDefault();
    setOpen(false);

    console.log("ok", name + count);
    // console.log("ok", count);
    // toast.success("🦄 Thêm sản phẩm mới thành công!", {
    //   position: "top-right",
    //   autoClose: 900,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored"
    // });
    window.location.reload();
  };

  return (
    <>
      <Container flex={5} position="fixed">
        <Stack
          sx={{ paddingTop: 2, marginBottom: 5 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
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
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>

        <Divider />

        <div className="lbtable" style={{ marginTop: 20, marginBottom: 10 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Mã bàn</TableCell>
                  <TableCell align="right">Số người ngồi</TableCell>
                  <TableCell align="right">Trạng thái</TableCell>
                  <TableCell align="right">Thao tác </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowstable.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell scope="row">{row.code}</TableCell>
                    <TableCell align="right">{row.countp}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">
                      <Box>
                        <Tooltip title="Edit this lobby">
                          <IconButton
                            onClick={
                              () => {}
                              //   handleOpen1(item)
                            }
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete this lobby">
                          <IconButton
                            onClick={
                              () => {}
                              //   handleOpen(item)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{/* {row.protein} */}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>

      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={280} bgcolor={"white"} p={3} borderRadius={5}>
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
