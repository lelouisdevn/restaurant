import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";
function UserBase(props) {
    
    const [userList, setUserList] = useState(props.userList);

    // const [staff_name, setStaffName] = useState(user.staff_name);
    // const [staff_dob, setStaffDob] = useState(user.staff_dob);
    // const [staff_phone, setStaffPhone] = useState(user.staff_phone);
    // const [staff_addr, setStaffAddr] = useState(user.staff_addr);
    // const [gender, setGender] = useState(user.gender);
    // const [username, setusername] = useState(user.username);
    // const [password, setpassword] = useState(user.password);
    // const [role, setRole] = useState(user.role);


    // function updateUser() {
    //     user.staff_name = staff_name;
    //     user.staff_dob = staff_dob;
    //     user.staff_phone = staff_phone;
    //     user.staff_addr = staff_addr;
    //     user.gender = gender;
    //     user.username = username;
    //     user.password = password;
    //     user.role = role;
    //     setUser(user);
    // }
    

    function rolechar(i){
        const qly = "Quản Lý";
        const order = "Order";
        const tng = "Bếp";
        if (i == "1") {
            return qly;
        } else if(i == "2") {
            return order;
        }else{
            return tng;
        }

    }
    return (
        <Link to={`${(userList.user)._id}`} >
            <td>
                <ul className="list-inside bg-slate-50 rounded-lg p-2 m-3 max-w-100" >
                    <li className="bg-indigo-200 rounded p-2">Nhân Viên:  {rolechar(userList.user.role)}</li>
                    <li>Tên: {userList.user.staff_name}</li>
                    <li>Giới Tính: {userList.user.staff_gender}</li>
                    <li>SĐT: {userList.user.staff_phone}</li>
                    <li>Địa Chỉ: {userList.user.staff_addr}</li>
                    <li>Ngày Sinh: {userList.user.staff_dob}</li>
                </ul>
            </td>
        </Link>
    );
}

export default UserBase;