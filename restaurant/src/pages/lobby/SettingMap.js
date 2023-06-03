import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  styled,
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputLabel } from "@material-ui/core";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  borderWidth: 0,
  borderRadius: 0,
  boxShadow: "none"
}));

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const SettingMap = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [lobby, setLobby] = useState([]);
  const [tables, setTables] = useState([]);
  const [counttables, setCountTables] = useState(0);
  const [arrange, setArrange] = useState("");
  const [numRow, setNumRow] = useState(null);

  console.log("sx: ", arrange);
  console.log("numRow: ", numRow);

  useEffect(() => {
    getLobby();
    getTables();
  }, []);

  const getLobby = async () => {
    await axios
      .get(`http://localhost:4000/api/lobby/id=${id}`)
      .then((res) => {
        const temp = res?.data.lobby;
        setLobby(temp);
        setArrange(temp.lob_arrange);
        setNumRow(temp.lob_num);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const getTables = async () => {
    await axios
      .get(`http://localhost:4000/api/lobby/${id}/table`)
      .then((res) => {
        const temp = res?.data.table;
        setTables(temp);
        setCountTables(temp.length);
        console.log("tables: ", temp);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleArrangeT = async () => {
    console.log("sap xep theo: ", arrange + numRow);
    try {
      await axios
        .put(`http://localhost:4000/api/lobby/id=${id}`, {
          lob_arrange: arrange,
          lob_num: numRow
        })
        .then((res) => {
          console.log("ok push thanh cong");
          setOpen(false);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Container flex={5} position="fixed">
      <Box display="flex" mt={2}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: 500, fontStyle: "italic" }}
        >
          Sơ đồ quán ăn - {lobby.lob_name}
        </Typography>
      </Box>

      <Stack
        display="flex"
        width="70%"
        sx={{ paddingTop: 0, paddingLeft: 5 }}
        direction="row"
        spacing={1}
        justifyContent="space-between"
      >
        <Typography variant="h6">
          Số bàn hiện có {tables.length}/{lobby.lob_tbl_num}
        </Typography>
        <Box
          component="span"
          sx={{ border: "1px dashed grey" }}
          onClick={(e) => setOpen(true)}
        >
          <Button>Xếp bàn</Button>
        </Box>
      </Stack>

      {/* Chứa các bàn theo số bàn trong khu vực sảnh */}
      <Box
        mt={3}
        p={3}
        minHeight={300}
        width={800}
        sx={{
          flexGrow: 1,
          borderWidth: 2
        }}
      >
        {/* List Column */}
        {arrange === "column" ? (
          numRow === 2 ? (
            <div class="grid grid-rows-2 grid-flow-col gap-4">
              {tables.map((table, index) => (
                <Grid item key={index}>
                  <Item position="relative">
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                </Grid>
              ))}
            </div>
          ) : numRow === 3 ? (
            <div class="grid grid-rows-3 grid-flow-col gap-4">
              {tables.map((table, index) => (
                <Grid item key={index}>
                  <Item position="relative">
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                </Grid>
              ))}
            </div>
          ) : numRow === 4 ? (
            <div class="grid grid-rows-4 grid-flow-col gap-4">
              {tables.map((table, index) => (
                <Grid item key={index}>
                  <Item position="relative">
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                </Grid>
              ))}
            </div>
          ) : numRow === 5 ? (
            <div class="grid grid-rows-5 grid-flow-col gap-4">
              {tables.map((table, index) => (
                <Grid item key={index}>
                  <Item position="relative">
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                </Grid>
              ))}
            </div>
          ) : (
            <div class="grid grid-rows-6 grid-flow-col gap-4">
              {tables.map((table, index) => (
                <Grid item key={index}>
                  <Item position="relative">
                    <img
                      src="/images/table-blue.png"
                      className="img-fluid rounded-xl"
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "130px"
                      }}
                    />
                    <span style={{ position: "absolute", color: "white" }}>
                      {table.tbl_id}
                    </span>
                  </Item>
                </Grid>
              ))}
            </div>
          )
        ) : (
          <Grid container spacing={2} direction="column">
            <Grid item xs={12} container>
              {tables.map((table, index) =>
                numRow === 2 ? (
                  <Grid item xs={5} key={index}>
                    <Item position="relative">
                      <img
                        src="/images/table-blue.png"
                        className="img-fluid rounded-xl"
                        style={{
                          position: "relative",
                          width: "130px",
                          height: "130px"
                        }}
                      />
                      <span style={{ position: "absolute", color: "white" }}>
                        {table.tbl_id}
                      </span>
                    </Item>
                  </Grid>
                ) : numRow === 3 ? (
                  <Grid item xs={4} key={index}>
                    <Item position="relative">
                      <img
                        src="/images/table-blue.png"
                        className="img-fluid rounded-xl"
                        style={{
                          position: "relative",
                          width: "130px",
                          height: "130px"
                        }}
                      />
                      <span style={{ position: "absolute", color: "white" }}>
                        {table.tbl_id}
                      </span>
                    </Item>
                  </Grid>
                ) : numRow === 4 ? (
                  <Grid item xs={3} key={index}>
                    <Item position="relative">
                      <img
                        src="/images/table-blue.png"
                        className="img-fluid rounded-xl"
                        style={{
                          position: "relative",
                          width: "130px",
                          height: "130px"
                        }}
                      />
                      <span style={{ position: "absolute", color: "white" }}>
                        {table.tbl_id}
                      </span>
                    </Item>
                  </Grid>
                ) : (
                  <Grid item xs={2} key={index} marginRight={2}>
                    <Item position="relative">
                      <img
                        src="/images/table-blue.png"
                        className="img-fluid rounded-xl"
                        style={{
                          position: "relative",
                          width: "130px",
                          height: "130px"
                        }}
                      />
                      <span style={{ position: "absolute", color: "white" }}>
                        {table.tbl_id}
                      </span>
                    </Item>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        )}
      </Box>

      <StyledModal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={330}
          bgcolor={"white"}
          p={3}
          borderRadius={5}
          position="relative"
        >
          <Box
            alignItems="right"
            justifyContent="right"
            display="flex"
            position="relative"
          >
            <CancelIcon onClick={(e) => setOpen(false)} />
          </Box>
          <Typography variant="h5" color="gray" textAlign="center">
            Xếp bàn
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
            <FormControl>
              <FormLabel id="arrange">Xếp bàn theo:</FormLabel>
              <RadioGroup
                name="arrange"
                aria-labelledby="arrange"
                row
                value={arrange}
                onChange={(v) => setArrange(v.target.value)}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Dãy ngang"
                  value="row"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Dãy dọc"
                  value="column"
                />
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Mỗi dãy có số bàn:
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openS}
                onClose={() => setOpenS(false)}
                onOpen={() => setOpenS(true)}
                value={numRow}
                label="----Chọn----"
                onChange={(e) => setNumRow(e.target.value)}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginTop: 3, paddingLeft: 8, paddingRight: 8 }}>
            <Button
              onClick={handleArrangeT}
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
    </Container>
  );
};

export default SettingMap;
