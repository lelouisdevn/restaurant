import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UserBase(props) {
    // const users = [
    //     {
    //         '_id': 'wdcrfvtfcd',
    //         'staff_name': 'Nguyen Van A',
    //         'staff_dob': '22/3/2000',
    //         'staff_phone': '0121954786',
    //         'staff_addr': '3 Le Binh Cai Rang Can Tho',
    //         'gender': 'Nam',
    //         'username': 'nguyenvana',
    //         'password': 'NguyenVanA',
    //         'role': '0'
    //      },
        // {
        //     '_id': 'tgbyfcqaxz',
        //     'staff_name': 'Nguyen Van B',
        //     'staff_dob': '22/4/2001',
        //     'staff_phone': '0121954646',
        //     'staff_addr': '50 Le Binh Ninh Kieu Can Tho',
        //     'gender': 'Nam',
        //     'username': 'nguyenvanb',
        //     'password': 'NguyenVanB',
        //     'role': '1'
        // },
        // {
        //     '_id': 'qvcr567fcd',
        //     'staff_name': 'Nguyen Van C',
        //     'staff_dob': '6/3/2002',
        //     'staff_phone': '0788954786',
        //     'staff_addr': '22 Tran Chien Cai Rang Can Tho',
        //     'gender': 'Nu',
        //     'username': 'nguyenvanc',
        //     'password': 'NguyenVanC',
        //     'role': '3'
        // },
    // ]

    // const { id } = useParams();
    // const u = users.find(i => i._id == id);
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
        const qly = "Manage";
        const order = "Order";
        const chef = "Chef";
        if (i == "0") {
            return qly;
        } else if(i == "1") {
            return order;
        }else{
            return chef;
        }

    }
    return (
        <Link to={`${user._id}`} >
            <td>
                <ul className="list-inside bg-slate-50 rounded-lg p-2 m-3 max-w-100" >
                    <li className="bg-indigo-200 rounded p-2">Nhân Viên:  {rolechar(user.role)}</li>
                    <li>Name: {user.staff_name}</li>
                    <li>Gender: {user.gender}</li>
                    <li>Phone: {user.staff_phone}</li>
                    <li>Addr: {user.staff_addr}</li>
                    <li>Dob: {user.staff_dob}</li>
                </ul>
            </td>
        </Link>
    );
}

export default UserBase;