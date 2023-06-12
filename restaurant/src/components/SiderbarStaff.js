import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import RectangleIcon from "@mui/icons-material/Rectangle";

const SiderbarStaff = ({parentCallback}) => {
  const navigate = useNavigate();
  const [lobbies, setLobbies] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  
  
  //Lấy infoRestaurant trên localStorage dạng object 
  const json = localStorage.getItem("infoRestaurant");
  const valuejson = JSON.parse(json);
  const [idRestaurant, setidRestaurant] = useState(valuejson); 

  const handleListItemClick = async (event, index, path, id, arrange, numRow) => {
    setSelectedIndex(index);
    // navigate(path);
    parentCallback(id, arrange, numRow);
  };

  // Lấy khu vực sảnh theo nhà hàng idRes
  useEffect(() => {
    getLobbies(idRestaurant._id);
  }, [idRestaurant]);

  const getLobbies = async (idRes) => {
    await axios
      .get(`http://localhost:4000/api/lobbies/restaurant=${idRes}`)
      .then((res) => {
        const temp = res?.data.lobbies;
        setLobbies(temp);
        parentCallback(temp[0]._id, temp[0].lob_arrange, temp[0].lob_num);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    };

  return (
    <>
      
      <Box
        p={2}
        flex={1}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        <Box position="fixed">
          <List>
            {lobbies.map((lobby, index) => (
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={(event) =>
                  handleListItemClick(
                    event,
                    index,
                    `/staff/outline/${lobby._id}/${lobby.lob_arrange}/${lobby.lob_num}`,
                    lobby._id,
                    lobby.lob_arrange,
                    lobby.lob_num,
                  )
                }
              >
                <ListItemIcon>
                  <RectangleIcon className="icon" />
                </ListItemIcon>
                <ListItemText primary={lobby.lob_name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>
     
    </>
  );
};

export default SiderbarStaff;
