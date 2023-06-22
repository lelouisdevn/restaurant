import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./UserDetail.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function UserAdd(){

    const [staff_name, setStaffName] = useState("");
    const [staff_dob, setStaffDob] = useState("");
    const [staff_phone, setStaffPhone] = useState("");
    const [staff_addr, setStaffAddr] = useState("");
    const [staff_gender, setStaffGender] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [role, setRole] = useState("");
    const [restaurant, setRestaurant] = useState("");
    
    const handleUserAdd = async () =>{
        //console.log("hello");
        try{
            await axios
            .post("http://localhost:4000/api/user",{
                staff_name :staff_name,
                staff_dob: staff_dob,
                staff_phone: staff_phone,
                staff_addr: staff_addr,
                staff_gender: staff_gender,
                username: username,
                password: password,
                role: role,
                restaurant: localStorage.getItem("RestaurantID"),
            })
            .then((res) =>{
                toast.success("🦄 Thêm người dùng mới thành công!", {
                    position: "top-right",
                    autoClose: 900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            });
        }catch(error){
            console.log("Error: ",error);
        }

    }
    const handleSelect = (event) => {
        setRole (event.target.value);
    }

    return (
        <div className='m-5 '>
            <table className="table w-full bg-indigo-200 rounded-lg text-center ">
                <tbody className='font-bold staff-content'>
                    <br/>
                    <input value={localStorage.getItem("RestaurantID")} hidden></input>
                    <tr>
                        <td>Tên:</td>
                        <td>
                            <input value={staff_name} onChange={(text) => setStaffName(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>SĐT:</td>
                        <td>
                            <input value={staff_phone} onChange={(text) => setStaffPhone(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Ngày Sinh:</td>
                        <td>
                            <input value={staff_dob} onChange={(text) => setStaffDob(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Địa Chỉ:</td>
                        <td>
                            <input value={staff_addr} onChange={(text) => setStaffAddr(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Giới Tính:</td>
                        <td>
                            <input value={staff_gender} onChange={(text) => setStaffGender(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Username:</td>
                        <td>
                            <input value={username} onChange={(text) => setusername(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <input value={password} onChange={(text) => setpassword(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Vai Trò:</td>
                        <td>
                            {/* <input value={role} onChange={(text) => setRole(text.target.value)}></input> */}
                            <select  onClick={handleSelect} defaultValue={"2"}>
                                <option value="2">Nhân viên phục vụ</option>
                                <option value="3">Bếp</option>
                                <option value="4">Thu Ngân</option>
                            </select>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td colSpan="2">
                            <button onClick={() => handleUserAdd()}  type="submit" name='submit' className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Lưu</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}

export default UserAdd;
