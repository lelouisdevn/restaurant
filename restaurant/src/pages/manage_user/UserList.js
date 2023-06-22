import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
  } from "@mui/material";
import "./UserDetail.css"
import React,  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import UserBase from './UserBase';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const id = localStorage.getItem("RestaurantID");
    const handleItemClick = (event, path) => {
        event.preventDefault();
        navigate(path);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        await axios
          .get(`http://localhost:4000/api/users/id=${id}`)
          .then((res) => {
            const temp = res?.data.users;
            
            setUsers(temp);
            console.log(temp);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
    }
    function rolechar(i){
        const qly = "Quản Lý";
        const order = "Order";
        const b = "Bếp"
        const tng = "Thu Ngân";
        if (i == "1") {
            return qly;
        } else if(i == "2") {
            return order;
        }else if(i == "3"){
            return b;
        }else {
            return tng;
        }
    }
    return (
        <table className='table-auto bg-indigo-900 rounded p-5 m-5'>
            <tbody>
                <tr className="flex flex-wrap ">
                    {(users).map((row,index) => (
                        <td key={index}>
                            <Link to={`${row.user._id}`}>
                            <ul className="list-inside bg-slate-50 rounded-lg p-2 m-3 w-52 h-48 shortedword" >
                                    <li className="bg-indigo-200 rounded p-2">Nhân Viên:  {rolechar(row.user.role)}</li>
                                    <li>Tên: {row.user.staff_name}</li>
                                    <li>Giới Tính: {row.user.staff_gender}</li>
                                    <li>SĐT: {row.user.staff_phone}</li>
                                    <li>Địa Chỉ: {row.user.staff_addr}</li>
                                    <li>Ngày Sinh: {row.user.staff_dob}</li>
                                </ul>
                            </Link>
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}

export default UserList;