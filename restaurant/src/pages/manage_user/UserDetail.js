import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserBase from './UserBase';
import UserList from './UserList';
import UserEdit from './UserEdit';
import "./UserDetail.css"

function UserDetail() {
    const users = [
        {
            '_id': 'wdcrfvtfcd',
            'staff_name': 'Nguyen Van A',
            'staff_dob': '22/3/2000',
            'staff_phone': '0121954786',
            'staff_addr': '3 Le Binh Cai Rang Can Tho',
            'gender': 'Nam',
            'username': 'nguyenvana',
            'password': 'NguyenVanA',
            'role': '0'
        },
        {
            '_id': 'tgbyfcqaxz',
            'staff_name': 'Nguyen Van B',
            'staff_dob': '22/4/2001',
            'staff_phone': '0121954646',
            'staff_addr': '50 Le Binh Ninh Kieu Can Tho',
            'gender': 'Nam',
            'username': 'nguyenvanb',
            'password': 'NguyenVanB',
            'role': '1'
        },
        {
            '_id': 'qvcr567fcd',
            'staff_name': 'Nguyen Van C',
            'staff_dob': '6/3/2002',
            'staff_phone': '0788954786',
            'staff_addr': '22 Tran Chien Cai Rang Can Tho',
            'gender': 'Nu',
            'username': 'nguyenvanc',
            'password': 'NguyenVanC',
            'role': '3'
        },
        {
            '_id': 'ygbuhnijmk',
            'staff_name': 'Nguyen Van D',
            'staff_dob': '22/3/2000',
            'staff_phone': '0121954786',
            'staff_addr': '3 Le Binh Cai Rang Can Tho',
            'gender': 'Nam',
            'username': 'nguyenvand',
            'password': 'NguyenVanD',
            'role': '3'
        },
        {
            '_id': '23w4r56tyyg',
            'staff_name': 'Nguyen Van E',
            'staff_dob': '22/4/2001',
            'staff_phone': '0121954646',
            'staff_addr': '50 Le Binh Ninh Kieu Can Tho',
            'gender': 'Nam',
            'username': 'nguyenvane',
            'password': 'NguyenVanE',
            'role': '3'
        },
        {
            '_id': 'iinujmok04',
            'staff_name': 'Nguyen Van F',
            'staff_dob': '6/3/2002',
            'staff_phone': '0788954786',
            'staff_addr': '22 Tran Chien Cai Rang Can Tho',
            'gender': 'Nu',
            'username': 'nguyenvanf',
            'password': 'NguyenVanF',
            'role': '3'
        },
        {
            '_id': 'iygujmok04',
            'staff_name': 'Nguyen Van G',
            'staff_dob': '6/3/2002',
            'staff_phone': '0788954786',
            'staff_addr': '22 Tran Chien Cai Rang Can Tho',
            'gender': 'Nam',
            'username': 'nguyenvang',
            'password': 'NguyenVanG',
            'role': '3'
        },
    ]
    const { id } = useParams();
    const u = users.find(i => i._id == id);
    const [user, setUser] = useState(u);

    const [staff_name, setStaffName] = useState(user.staff_name);
    const [staff_dob, setStaffDob] = useState(user.staff_dob);
    const [staff_phone, setStaffPhone] = useState(user.staff_phone);
    const [staff_addr, setStaffAddr] = useState(user.staff_addr);
    const [gender, setGender] = useState(user.gender);
    const [username, setusername] = useState(user.username);
    const [password, setpassword] = useState(user.password);
    const [role, setRole] = useState(user.role);


    function updateUser() {
        user.staff_name = staff_name;
        user.staff_dob = staff_dob;
        user.staff_phone = staff_phone;
        user.staff_addr = staff_addr;
        user.gender = gender;
        user.username = username;
        user.password = password;
        user.role = role;
        setUser(user);
    }

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
        <div className='m-5 '>
            <table className="table w-full bg-indigo-200 rounded-lg text-center ">
                <tbody className='font-bold staff-content'>
                    <br/>
                    <input value={user._id} className='empty:hidden'></input>
                    <tr>
                        <td>Name:</td>
                        <td>
                            <input value={staff_name}
                                onChange={(event) => setStaffName(event.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Phone:</td>
                        <td>
                            <input value={staff_phone}
                                onChange={(event) => setStaffPhone(event.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Birthday:</td>
                        <td>
                            <input value={staff_dob}
                                onChange={(event) => setStaffDob(event.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Address:</td>
                        <td>
                            <input value={staff_addr}
                                onChange={(event) => setStaffAddr(event.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Gender:</td>
                        <td>
                            <input value={gender}
                                onChange={(event) => setGender(event.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Username:</td>
                        <td>
                            <input value={username}
                                onChange={(event) => setusername(event.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <input value={password}
                                onChange={(event) => setpassword(event.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Role:</td>
                        <td>
                            <input value={rolechar(role)}
                                onChange={(event) => setRole(event.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td colspan="2">
                            <button onClick={updateUser} type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cập Nhật</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserDetail;