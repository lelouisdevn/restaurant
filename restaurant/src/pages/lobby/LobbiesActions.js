import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { Delete, Edit, Preview, AddBox } from "@mui/icons-material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const style = {
  top: "50%",
  left: "50%",
  width: 400,
  bgcolor: "white",
  borderRadius: 5,
  boxShadow: 24,
  p: 4
};

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const LobbiesActions = ({ params, parentCallback }) => {
  const [item, setItem] = useState(params);
  const [name, setName] = useState(params.lob_name);
  const [count, setCount] = useState(params.lob_tbl_num);
  const [table, setTable] = useState([]);
  const [codeT, setCodeT] = useState("");
  const [countP, setCountP] = useState();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = async (param) => {
    console.log("THam số");
    setOpen(true);
    console.log(param);
  };
  const handleOpenAT = async (param) => {
    console.log("THam số");
    setOpen2(true);
    console.log(param);
  };
  const handleOpen1 = async (param) => {
    console.log("THam số");
    setOpen1(true);
    console.log(param);
  };
  const handleOpenT = async (item) => {
    const id = item._id;;
    const name = item.lob_name;;
    parentCallback(id,name);
  };

  const handleAddT = async (id) => {
    console.log("id add", id);
    try {
      await axios
        .post("http://localhost:4000/api/table", {
          tbl_id: codeT,
          tbl_seat_num: countP,
          lobby: id
        })
        .then((res) => {
          // console.log(res?.data);
          setOpen2(false);
          toast.success("🦄 Thêm bàn mới thành công!", {
            position: "top-right",
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        });
    } catch (error) {
      console.log("Error: ", error);
    }

    // window.location.reload();
  };
  const handleEdit = async (id) => {
    console.log("id edit", id);
    try {
      await axios
        .put(`http://localhost:4000/api/lobby/edit/id=${id}`, {
          lob_name: name,
          lob_tbl_num: count
        })
        .then((res) => {
          console.log("Ok");
        });
    } catch (error) {
      console.log("Error: ", error);
    }

    setOpen1(false);

    window.location.reload();
  };
  const handleDelete = async (id) => {
    console.log("id ", id);
    try {
      await axios
        .put(`http://localhost:4000/api/lobby/delete/id=${id}`)
        .then((res) => {
          console.log("Ok");
        });
    } catch (error) {
      console.log("Error: ", error);
    }
    setOpen(false);
    window.location.reload();
  };
  return (
    <Box sx={{}}>
      <Tooltip title="Thêm bàn">
        <IconButton
          onClick={() => handleOpenAT(item)}
          >
          <AddBox />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xem danh sách bàn">
        <IconButton
          onClick={() => handleOpenT(item)}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sửa thông tin ">
        <IconButton onClick={() => handleOpen1(item)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa khu vực">
        <IconButton onClick={() => handleOpen(item)}>
          <Delete />
        </IconButton>
      </Tooltip>

      {/*  Modal xóa */}
      <StyledModal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Xác nhận xóa mục này?
          </Typography>
          <Box ml={20}>
            <Button onClick={() => handleDelete(item._id)}>Đồng ý</Button>
            <Button onClick={() => setOpen(false)}>Hủy</Button>
          </Box>
        </Box>
      </StyledModal>

      {/* Modal sửa */}
      <StyledModal
        open={open1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={310} bgcolor={"white"} p={3} borderRadius={5}>
          <Box alignItems="right" justifyContent="right" display="flex">
            <CancelIcon onClick={(e) => setOpen1(false)} />
          </Box>
          <Typography variant="h5" color="gray" textAlign="center">
            Thay đổi khu vực
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
              defaultValue={name}
              onChange={(text) => setName(text.target.value)}
            />
            <TextField
              sx={{ width: "100%", marginTop: 2 }}
              id="standard-basic"
              label="Số lượng bàn "
              variant="standard"
              defaultValue={count}
              onChange={(text) => setCount(text.target.value)}
            />
          </Box>
          <Box sx={{ marginTop: 3, paddingLeft: 8, paddingRight: 8 }}>
            <Button
              onClick={() => handleEdit(item._id)}
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

      {/* Modal thêm bàn mới */}
      <StyledModal
        open={open2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={310} bgcolor={"white"} p={3} borderRadius={5}>
          <Box alignItems="right" justifyContent="right" display="flex">
            <CancelIcon onClick={(e) => setOpen2(false)} />
          </Box>
          <Typography variant="h5" color="gray" textAlign="center">
            Thêm bàn mới cho khu vực
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
              label="Mã bàn"
              variant="standard"
              value={codeT}
              onChange={(text) => setCodeT(text.target.value)}
            />
            <TextField
              sx={{ width: "100%", marginTop: 2 }}
              id="standard-basic"
              label="Số người ngồi "
              variant="standard"
              value={countP}
              onChange={(text) => setCountP(text.target.value)}
            />
          </Box>
          <Box sx={{ marginTop: 3, paddingLeft: 8, paddingRight: 8 }}>
            <Button
              onClick={() => handleAddT(item._id)}
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
    </Box>
  );
};

export default LobbiesActions;
