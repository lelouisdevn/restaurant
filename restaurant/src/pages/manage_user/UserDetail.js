
import React,  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserBase from './UserBase';
import UserList from './UserList';
import UserEdit from './UserEdit';
import "./UserDetail.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function UserDetail() {
    const navigate = useNavigate();
    const { idUser } = useParams();
    //console.log(id)
    const [user, setUser] = useState([]);

    const [staff_name, setStaffName] = useState("");
    const [staff_dob, setStaffDob] = useState("");
    const [staff_phone, setStaffPhone] = useState("");
    const [staff_addr, setStaffAddr] = useState("");
    const [staff_gender, setGender] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [role, setRole] = useState("");

    const getUser = async () => {
        await axios
          .get(`http://localhost:4000/api/users/id=${localStorage.getItem("RestaurantID")}/idUser=${idUser}`)
          .then((res) => {
            const temp = res?.data.user[0];
            setUser(temp);
            console.log(temp);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
    }
    const handleEdit = async () => {
        try {
          await axios
            .put(`http://localhost:4000/api/users/edit/idUser=${idUser}`, {
                staff_name: staff_name ? staff_name : user.staff_name,
                staff_dob: staff_dob ? staff_dob : user.staff_dob,
                staff_phone: staff_phone ? staff_phone : user.staff_phone,
                staff_addr: staff_addr ? staff_addr : user.staff_addr,
                staff_gender: staff_gender ? staff_gender : user.staff_gender,
                username: username ? username : user.username,
                password: password ? password : user.password,
                role: role ? role : user.role,
            })
            .then((res) => {
              console.log("Ok");
              toast.success("🦄 Cập nhật người dùng thành công!", {
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
        } catch (error) {
          console.log("Error: ", error);
        }
    };

    const handleDelete = async () => {
        try {
          await axios
            .put(`http://localhost:4000/api/users/delete/idUser=${idUser}`)
            .then((res) => {
              
              toast.success("🦄 Xóa người dùng thành công!", {
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
        } catch (error) {
          console.log("Error: ", error);
        }
        navigate(-1);
    };

    useEffect(() => {
        getUser();
    }, []);

    
    function rolechar(i){
        const qly = "Quản Lý";
        const order = " Order ";
        const b = "Bếp";
        const tng = "Thu Ngân";
        if (i == "1") {
            return qly;
        } else if(i == "2") {
            return order;
        }else if(i == "3") {
            return b;
        }else if(i == "4") {
            return tng;
        }

    }
    return (
        <div className='m-5 '>
            <table className="table w-full bg-indigo-200 rounded-lg text-center ">
                <tbody className='font-bold staff-content'>
                    <br/>
                    <input value={user._id} className='empty:hidden'></input>
                    <tr>
                        <td>Tên:</td>
                        <td>
                            <input defaultValue={user.staff_name}
                                onChange={(text) => setStaffName(text.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>SĐT:</td>
                        <td>
                            <input defaultValue={user.staff_phone}
                                onChange={(text) => setStaffPhone(text.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Ngày Sinh:</td>
                        <td>
                            <input type='date' defaultValue={user.staff_dob}
                                onChange={(text) => setStaffDob(text.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Địa Chỉ:</td>
                        <td>
                            <input defaultValue={user.staff_addr}
                                onChange={(text) => setStaffAddr(text.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Giới Tính:</td>
                        <td>
                            {/* <input defaultValue={user.staff_gender}
                                onChange={(text) => setGender(text.target.value)}
                                ></input> */}
                            <select defaultValue={user.staff_gender} onChange={(text) => setGender(text.target.value)}>
                                <option value={user.staff_gender}>{user.staff_gender}</option>
                                {
                                    user.staff_gender == "Nữ" ? <option value="Nam">Nam</option>
                                    : user.staff_gender == "Nam" ? <option value="Nữ">Nữ</option>
                                    : ""
                                }
                            </select>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Username:</td>
                        <td>
                            <input defaultValue={user.username}
                                onChange={(text) => setusername(text.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <input defaultValue={user.password}
                                onChange={(text) => setpassword(text.target.value)}
                                ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Vai Trò:</td>
                        <td>
                            <select defaultValue={user.role} onChange={(text) => setRole(text.target.value)}>
                            <option value={user.role}>{rolechar(user.role)}</option>
                            {user.role == "2" ? <><option value="3">Bếp</option> <option value="4">Thu Ngân</option></>
                            : user.role == "3" ? <><option value="2">Nhân Viên Order</option> <option value="4">Thu Ngân</option></>
                            : user.role == "4" ? <><option value="2">Nhân Viên Order</option><option value="3">Bếp</option></>
                            : ""
                            }
                                
                            </select>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td colspan="2">
                            <button onClick={(e) => handleEdit(user._id)} type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cập Nhật</button>
                            <button onClick={(e) => handleDelete(user._id)} type="button" className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Xóa Người Dùng</button>
                        </td>
                    </tr>

                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}

export default UserDetail;