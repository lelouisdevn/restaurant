import React, { useEffect, useState } from "react"; 
import "./home.scss";
import { DatePicker } from "antd";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import moment from "moment";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import ListStaff from "./ListStaff";
import ListBill from "./ListBill";
import BarChartPro from "./BarChart";
import Synthetic from "./Synthetic";
import SyntheticSearch from "./SyntheticSearch";
// import BarChart from "./BarChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: '575px'
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: '600px',
  borderWidth: '2px',
  borderColor: 'black',
}));
const Home = () => {
   const json = localStorage.getItem("infoRestaurant");
  const valuejson = JSON.parse(json);
  console.log("nhà hàng: ", valuejson);
  const jsonStaff = localStorage.getItem("infoStaff");
  const valuejsonStaff = JSON.parse(jsonStaff); 

  const [listStaff, setListStaff] = useState([]);
  const [listBill, setListBill] = useState([]);
  const [bar, setBar] = useState('tuannay')
  const [listSearch, setListSearch] = useState([]);
  const [totalsearch, setTotalSearch] = useState();
  const getMY = ({ data }) => {
    setBar(data.Tháng);
    console.log("data truyen  getMY:", data);
  }
const getBillToDay = async() => {
    await axios
      .get("http://localhost:4000/api/list/bills/today", {
        params: { resrant: valuejson._id }
      })
      .then((res) => {
        const temp = res?.data.listTBill;
        console.log("bill today: ", temp);
        setListBill(temp);
      });
  }
   const getStaffRes = async () => {
     await axios
       .get(`http://localhost:4000/api/users/id=${valuejson._id}`)
       .then((res) => {
         const temp = res?.data.users;
         setListStaff(temp);
         console.log("inof ", temp);
       });
   };

   useEffect(() => {
    getStaffRes();
    getBillToDay();
   }, []); 
  
  const [dates, setDates] = useState([]);
  const [isSearch, setisSearch] = useState(true);
  console.log("datess: ", dates);

  const today = moment().format("YYYY-MM-DD");
  const [value, setValue] = useState([dayjs(today), dayjs(today)]);
  const list = [];
  value.forEach((e) => {
    list.push(moment(e.$d).format("MM-DD-YYYY"));
  }); 

  const handleSearch = async () => {
    console.log("ok la ", dates.length === 0 ? "ok" : "no");
    let tempParams;
    if (dates.length === 0) {
      tempParams= list
    } else {
      tempParams= dates
      
    }
    await axios
      .post("http://localhost:4000/api/list/bills/bydate", {
        restaurant: valuejson._id,
         arraydate : tempParams
      })
     .then((res) => {
        const temp = res?.data.listTBill;
        setListBill(temp)
        console.log("dc mak gsa ", temp);
      });
  };
  const handleSearchAll = async () => {
    console.log("ok la ", dates.length === 0 ? "ok" : "no");
    let tempParams;
    if (dates.length === 0) {
      tempParams= list
    } else {
      tempParams= dates
      
    }
    await axios
      .post("http://localhost:4000/api/list/statistical/bydate", {
        staffMana: valuejsonStaff._id,
         arraydate : tempParams
      }) 
      .then((res) => {
        const temp = res?.data.listBill2;
        const to = res?.data.to;
        setListSearch(temp);
        setTotalSearch(to);
        setisSearch(false); 
      });
  };
  return (
    <Box flex={5}>
      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} sm={6} bgcolor="grey" p={2}>
            <Item>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Danh sách hóa đơn hôm nay của nhà hàng
              </Typography>
              <Box className="flex">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  sx={{ width: "88%" }}
                >
                  <DemoContainer
                    components={["DateRangePicker", "DateRangePicker"]}
                  >
                    <DemoItem
                      // label="Controlled picker"
                      component="DateRangePicker"
                    >
                      <DateRangePicker
                        value={value}
                        onChange={(values) => {
                          setDates(
                            values.map((item) => {
                              if (item !== null) {
                                return moment(item.$d).format("MM/DD/YYYY");
                              } })
                          );
                        }}
                        // onChange={(newValue) => setValue(newValue)}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                <Box sx={{ width: "10%", paddingTop: "15px" }}>
                  <IconButton aria-label="search " onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  maxHeight: "500px",
                  marginTop: "12px"
                }}
              >
                <ListBill item={listBill} />
              </Box>
            </Item>
          </Grid>
          <Grid item xs={6} sm={6} bgcolor="#BEC0C2" p={2}>
            <Item>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Danh sách nhân viên của nhà hàng
              </Typography>
              <ListStaff item={listStaff} />
            </Item>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            // bgcolor="yellow"
            p={2}
          >
            <Item sx={{ backgroundColor: "#91C5F8" }}>
              <Box bgcolor="#fff" sx={{ width: "100%" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, paddingTop: "10px" }}
                >
                  Thống kê doanh thu theo{" "}
                  {bar === "tuannay"
                    ? "tuần hiện tại"
                    : bar === "thang"
                    ? "tháng"
                    : bar === "nam"
                    ? "năm"
                    : bar}
                </Typography>
                <div className="flex items-end justify-end mb-3 pr-6">
                  <label className="text-black text-xl" htmlFor="selectCP">
                    Lọc:
                    <select
                      className="h-[30px] w-[150px] border-2 border-black text-black"
                      name="selectCP"
                      id="selectCP"
                      value={bar}
                      onChange={(e) => setBar(e.target.value)}
                    >
                      <option value="tuannay">tuần hiện tại</option>
                      <option value="thang">tháng </option>
                      <option value="nam">năm </option>
                    </select>
                  </label>
                </div>
                {
                  bar === "tuannay" ? (
                    <BarChartPro
                      restaurant={valuejson}
                      aspect={3.35 / 1}
                      type="1"
                    />
                  ) : bar === "thang" ? (
                    <BarChartPro
                      restaurant={valuejson}
                      aspect={3.35 / 1}
                      type="2"
                    />
                  ) : bar === "nam" ? (
                    <BarChartPro
                      restaurant={valuejson}
                      aspect={3.35 / 1}
                      title="Theo 3 tháng trước"
                      type="3"
                      getMY={getMY}
                    />
                  ) : (
                    <BarChartPro
                      restaurant={valuejson}
                      aspect={3.35 / 1}
                      type="4"
                    />
                  )
                  // <Typography>bd cot tuan </Typography>
                }
              </Box>
            </Item>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            // bgcolor="green"
            p={2}
          >
            <Item2>
              <Box bgcolor="#fff" sx={{ width: "100%" }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Tổng hợp
                </Typography>
                <Box className=" calendar flex items-center justify-center">
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    sx={{ width: "50%" }}
                  >
                    <DemoContainer
                      components={["DateRangePicker", "DateRangePicker"]}
                    >
                      <DemoItem
                        // label="Controlled picker"
                        component="DateRangePicker"
                      >
                        <DateRangePicker
                          value={value}
                          onChange={(values) => {
                            setDates(
                              values.map((item) => {
                                console.log("item: ", item);
                                if (item !== null) {
                                  return moment(item.$d).format("MM/DD/YYYY");
                                  }
                                
                              })
                            );
                          }}
                          // onChange={(newValue) => setValue(newValue)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  <Box sx={{ width: "10%", paddingTop: "15px" }}>
                    <IconButton aria-label="search " onClick={handleSearchAll}>
                      <SearchIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              {isSearch ? (
                <Synthetic user={valuejsonStaff} restaurant={valuejson} />
              ) : (
                <SyntheticSearch
                  data={listSearch}
                  dataTotal={totalsearch}
                ></SyntheticSearch>
              )}
            </Item2>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
