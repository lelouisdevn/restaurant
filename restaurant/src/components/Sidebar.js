import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import ListIcon from "@mui/icons-material/List";
import FlatwareIcon from "@mui/icons-material/Flatware";
import InboxIcon from "@mui/icons-material/Inbox";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Sidebar = () => {
  const navigate = useNavigate();
  const json = localStorage.getItem("infoRestaurant");
  const valuejson = JSON.parse(json);
  const [infoRestaurant, setInfoRestaurant] = useState(valuejson);


  const json1 = localStorage.getItem("infoStaff");
  const valuejson1 = JSON.parse(json1);
  const [infoStaff, setInfoStaff] = useState(valuejson1);
  //console.log(infoStaff)

  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    if(infoStaff.role === "1"){
      navigate(path);
    }
  };
  const handleListItemClick1 = (event, index, path) => {
    setSelectedIndex(index);
    if(infoStaff.role === "4" && infoStaff.role === "1"){
      navigate(path);
    }else if(infoStaff.role === "3"){
      navigate("./chef");
    }
    
  };
  const handleListItemClick2 = (event, index, path) => {
    setSelectedIndex(index);
    if(infoStaff.role === "3" && infoStaff.role === "1"){
      navigate(path);
    }else if(infoStaff.role === "4"){
      navigate("./orders");
    }
    
  };


  return (
    <Box
      p={2}
      flex={1}
      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      // bgcolor="pink"
    >
      <Box position="fixed">
        <List>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0, "/manage/home")}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ" />
          </ListItemButton>

          {/* <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) =>
              handleListItemClick(event, 1, "/manage/category")
            }
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Danh mục sản phẩm" />
          </ListItemButton> */}
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) =>
              handleListItemClick(event, 2, "/manage/product")
            }
          >
            <ListItemIcon>
              <FlatwareIcon />
            </ListItemIcon>
            <ListItemText primary="Sản phẩm" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) =>
              handleListItemClick1(event, 3, "/manage/orders")
            }
          >
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Hoá đơn" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4, "/manage/lobby")}
          >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Khu vực sảnh" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 5, "/manage/user")}
          >
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Nhân viên" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 7}
            onClick={(event) => handleListItemClick2(event, 7, "/manage/chef")}
          >
            <ListItemIcon>
              <OutdoorGrillIcon />
            </ListItemIcon>
            <ListItemText primary="Bếp" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 8}
            onClick={(event) => handleListItemClick(event, 8, "/manage/info")}
          >
            <ListItemIcon>
              <FoodBankIcon />
            </ListItemIcon>
            <ListItemText primary="Thông tin" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
