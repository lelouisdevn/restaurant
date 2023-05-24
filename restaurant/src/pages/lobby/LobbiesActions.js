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
const style = {
  top: "50%",
  left: "50%",
  width: 400,
  bgcolor: "white",
  borderRadius: 5,
  boxShadow: 24,
  p: 4
  //   position: "absolute",
  //   transform: "translate(-50%, -50%)",
  // height={280}
};

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const LobbiesActions = ({ params }) => {
  const [item, setItem] = useState(params.row);
  const [name, setName] = useState(params.row.lobby);
  const [count, setCount] = useState(params.row.table);
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

  const handleDelete = async (id) => {
    console.log("id ", id.id);
    setOpen(false);
    // window.location.reload();
  };
  const handleEdit = async (id) => {
    console.log("id edit", id.id);
    setOpen1(false);

    // window.location.reload();
  };
  const handleAddT = async (id) => {
    console.log("id add", id.id);
    setOpen2(false);

    // window.location.reload();
  };
  return (
    <Box sx={{}}>
      <Tooltip title="Add new table">
        <IconButton
          onClick={() => handleOpenAT(item)}
          // onClick={() => dispatch({ type: "UPDATE_ROOM", payload: params.row })}
        >
          <AddBox />
        </IconButton>
      </Tooltip>
      <Tooltip title="View lobby details">
        <IconButton
        // onClick={() => dispatch({ type: "UPDATE_ROOM", payload: params.row })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit this lobby">
        <IconButton onClick={() => handleOpen1(item)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this lobby">
        <IconButton onClick={() => handleOpen(item)}>
          <Delete />
        </IconButton>
      </Tooltip>

      {/*  Modal xóa */}

      <StyledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Xác nhận xóa mục này?
          </Typography>
          <Box ml={20}>
            <Button onClick={() => handleDelete(item)}>Đồng ý</Button>
            <Button onClick={() => setOpen(false)}>Hủy</Button>
          </Box>
        </Box>
      </StyledModal>

      {/* Modal sửa */}
      <StyledModal
        open={open1}
        onClose={(e) => setOpen1(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={280} bgcolor={"white"} p={3} borderRadius={5}>
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
              onClick={() => handleEdit(item)}
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
        onClose={(e) => setOpen2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={280} bgcolor={"white"} p={3} borderRadius={5}>
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
              onClick={() => handleAddT(item)}
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

export default LobbiesActions;
