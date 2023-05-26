import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import FlatwareIcon from "@mui/icons-material/Flatware";
import InboxIcon from "@mui/icons-material/Inbox";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    navigate(path);
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

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) =>
              handleListItemClick(event, 1, "/manage/category")
            }
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Danh mục sản phẩm" />
          </ListItemButton>
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
            onClick={(event) => handleListItemClick(event, 3, "/manage/lobby")}
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
            selected={selectedIndex === 6}
            onClick={(event) => handleListItemClick(event, 6, "/manage/info")}
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