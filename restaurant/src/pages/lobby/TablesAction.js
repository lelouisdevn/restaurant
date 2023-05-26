import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

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

const TablesAction = ({ params, parentCallback }) => {
  const [item, setItem] = useState(params);
  const [code, setCode] = useState(params.tbl_id);
  const [count, setCount] = useState(params.tbl_seat_num);
  const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
     const handleOpen = async (param) => {
       console.log("THam số");
       setOpen(true);
       console.log(param);
     };
 const handleOpen1 = async (param) => {
   console.log("THam số");
   setOpen1(true);
   console.log(param);
 };
  const handleEdit = async (id) => {
    console.log("id edit", id);
    try {
      await axios
          .put(`http://localhost:4000/api/table/edit/id=${id}`,
              {
          code, count,
        }
          )
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
        .put(`http://localhost:4000/api/table/delete/id=${id}`)
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
    <Box>
      <Tooltip title="Sửa thông tin ">
        <IconButton onClick={() => handleOpen1(item)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa bàn">
        <IconButton onClick={() => handleOpen(item)}>
          <Delete />
        </IconButton>
      </Tooltip>
      {/*  Modal xóa */}

      <StyledModal
        open={open}
        // onClose={() => setOpen(false)}
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
        // onClose={(e) => setOpen1(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={310} bgcolor={"white"} p={3} borderRadius={5}>
          <Box alignItems="right" justifyContent="right" display="flex">
            <CancelIcon onClick={(e) => setOpen1(false)} />
          </Box>
          <Typography variant="h5" color="gray" textAlign="center">
            Thay đổi thông tin bàn
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
              label="Tên bàn"
              variant="standard"
              defaultValue={code}
              onChange={(text) => setCode(text.target.value)}
            />
            <TextField
              sx={{ width: "100%", marginTop: 2 }}
              id="standard-basic"
              label="Số người ngồi"
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
    </Box>
  );
};

export default TablesAction;
