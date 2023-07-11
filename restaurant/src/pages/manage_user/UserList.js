import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import "./UserDetail.css"
import "./UserList.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import UserBase from './UserBase';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../products/Loading";

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const id = localStorage.getItem("RestaurantID");
    const [message, setMessage] = useState("Chưa có dữ liệu ....");
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
    function rolechar(i) {
        const qly = "Quản Lý";
        const order = "Order";
        const b = "Bếp"
        const tng = "Thu Ngân";
        if (i == "1") {
            return qly;
        } else if (i == "2") {
            return order;
        } else if (i == "3") {
            return b;
        } else {
            return tng;
        }
    }
    return (

        <>

            {
                users.length > 0 ?
                    <div style={{ width: "100%" }}>
                        <table className='table-auto bg-indigo-900 rounded p-5 m-5' style={{ width: "97%" }} >
                            <tbody className="static " style={{ width: "100%" }}>
                                <tr className="container flex flex-wrap" style={{ position: "relattive", display: "grid", width: "100%", gridTemplateColumns: "auto auto auto auto auto auto", margin: "0 auto" }}>
                                    {users.length > 0 && (users).map((row, index) => (
                                        <td key={index}>
                                            <Link to={`${row.user._id}`} className="fLink">
                                                <ul className=" list-inside bg-slate-50 rounded-lg p-2 m-3 w-52 h-65 shortedword" style={{ filter: "drop-shadow(1px 1px 5px rgb(182, 181, 181))" }}>
                                                    {/* <ul className="" > */}
                                                    <li style={{ margin:"5px 0" }}>
                                                        <Avatar style={{  margin: "0 auto" }}
                                                            alt="Remy Sharp"
                                                            src={row.user.staff_avt}
                                                            sx={{ width: 70, height: 70 }}
                                                        />
                                                    </li>
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
                    </div>
                    : <><div style={{ width: "100%" }}><Loading message={message} /></div></>
            }
        </>
    );
}

export default UserList;