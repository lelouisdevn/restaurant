import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";
function UserBase(props) {
    
    const [user, setUser] = useState(props.user);

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
        const tng = "Thu Ngân";
        if (i == "0") {
            return qly;
        } else if(i == "1") {
            return order;
        }else{
            return tng;
        }

    }
    return (
        <Link to={`${user._id}`} >
            <td>
                <ul className="list-inside bg-slate-50 rounded-lg p-2 m-3 max-w-100" >
                    <li className="bg-indigo-200 rounded p-2">Nhân Viên:  {rolechar(user.role)}</li>
                    <li>Tên: {user.staff_name}</li>
                    <li>Giới Tính: {user.staff_gender}</li>
                    <li>SĐT: {user.staff_phone}</li>
                    <li>Địa Chỉ: {user.staff_addr}</li>
                    <li>Ngày Sinh: {user.staff_dob}</li>
                </ul>
            </td>
        </Link>
    );
}

export default UserBase;