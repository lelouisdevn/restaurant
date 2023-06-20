import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SetUpPage from "../pages/settuppage/setUpPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from "@fortawesome/free-solid-svg-icons";


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "10px",
  width: "40%"
}));
const Icons = styled(Box)(({ them }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center"
}));
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const id = localStorage.getItem("UserID");
  const [rest, setRest] = useState([]);
  const [isLoading, setisLoading] = useState(true);


  const setOut = () => {
    localStorage.clear();
  }

  useEffect(() => {
    getRest(id);
  }, [id]);

  // console.log(rest);
  // console.log("lay du lieu rest[0]: ", (rest[0].info));
  const getRest = async (id) =>{
    await axios
      .get(`http://localhost:4000/api/getallrestfromone/id=${id}`)
      .then((res) =>{
        const temp = res?.data.rest;
        setRest(temp);
        //console.log(temp);
      })
      .catch((error) =>{
        console.log("Error: ",error);
      }) .finally(() => {
        setisLoading(false);
      });

  }

  const handleRestClick = async(id) =>{
    localStorage.setItem("RestaurantID",id);
    const restaurant = rest.filter((r) => r._id === id);
    localStorage.setItem("infoRestaurant", JSON.stringify(id));
    navigate("/manage/home");

  }
  const json = localStorage.getItem("infoRestaurant");
  const valuejson = JSON.parse(json);
  const [infoRestaurant, setInfoRestaurant] = useState(valuejson);


  const json1 = localStorage.getItem("infoStaff");
  const valuejson1 = JSON.parse(json1);
  const [infoStaff, setInfoStaff] = useState(valuejson1);
  console.log(infoStaff)
  const restaurant = JSON.parse(localStorage.getItem("infoRestaurant"));
  const brandLogo = "/images/logoo.png";
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6">
          <img style={{width: "40px", borderRadius: "50%"}} src={restaurant.logo ? restaurant.logo : brandLogo} />
        </Typography>

        {/* <Search>
          <InputBase placeholder="search...." />
        </Search> */}
        <Typography style={{position: "absolute",left: "50%", transform: "translateX(-50%)"}} variant="h6">{infoRestaurant.rest_name}</Typography>
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="/images/avatar.jpg"
            onClick={(e) => setOpen(true)}
          />
          <Typography variant="span"> {infoStaff.staff_name}</Typography>
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        // style={{width: "", borderRadius: "10px!important", padding: "0"}}
      >
        <div style={{width: "350px", }}>
          <div style={{width: "350px"}}>
            <div className="logo" style={{textAlign: "center", marginTop: "0"}}>
              <img src="/images/logoo.png" />
              <div>Trinity</div>
            </div>
            <div className="main-content">
              {
                isLoading ? null : rest.map((row) => (
                  <div onClick={(e) => handleRestClick(row.info)}>
                    { row.info.rest_name }
                  </div>
                ))
              }
            </div>
            <div className="footer" onClick={() => setOut() } style={{textAlign: "center"}}>
              <div>
              <Link to={"/login"}>
                <FontAwesomeIcon icon={faSignOut} />
                <> Đăng xuất</>
              </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* <MenuItem>Thông tin cá nhân</MenuItem>
        {isLoading? null: rest.map((row)=>(
          <MenuItem onClick={(e)=>handleRestClick(row.info._id)} type="button">{row.info.rest_name}</MenuItem>
        ))}
        <MenuItem //   onClick={handleClose}
        >
          
          <Link to={"/login"} onClick={() => setOut()}>
            <Typography variant="span"> Thoát</Typography>
          </Link>

        </MenuItem> */}
      </Menu>
    </AppBar>
  );
};

export default Navbar;
