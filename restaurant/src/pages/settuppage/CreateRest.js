import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import LeftNavigate from "./LeftNavigate";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRest = () => {
    const [rest_name, setRestName] = useState("");
    const [rest_phone, setRestPhone] = useState("");
    const [rest_addr, setRestAddr] = useState("");
    const [rest_desc, setRestDesc] = useState("");
    const id = localStorage.getItem("UserID");
    console.log(id);
    const [isAdded, setAddRest] = useState(false);
    const [message, setMessage] = useState("");
    const handleRestAdd = async () => {
        setAddRest(true);
        setMessage("Đang tiến hành tạo nhà hàng mới...")
        try {
            await axios
                .post(`http://localhost:4000/api/createrest`, {
                    id: id,
                    rest_name: rest_name,
                    rest_phone: rest_phone,
                    rest_addr: rest_addr,
                    rest_desc: rest_desc,
                })
                .then((res) => {
                    //console.log(res?.data.rest);
                    // toast.success("🦄 Thêm nhà hàng mới thành công!", {
                    //     position: "top-center",
                    //     autoClose: 900,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "colored"
                    // });
                    let msg = "Nhà hàng đã được tạo. Điều hướng về trang chủ...";
                    setMessage(msg)
                    setTimeout(() => {
                        window.location.href = '/setting-up/select';
                    }, 1500);
                })
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <>
            {
                isAdded ? <><div>{message.split('. ').map((e, index) => (
                    <>{e}{index != message.split('. ').length - 1 && <>.</>}   <br /></>
                ))}</div>
                    <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}>
                        <div>Trinity &copy; copyright 2023</div>
                    </div>
                </>
                    :
                    <>
                        <LeftNavigate url={"/setting-up/select"} />
                        <div>
                            Tạo một nhà hàng mới
                        </div>
                        <div className="main-content" style={{ overflowY: "hidden", height: "45%" }}>

                            <input placeholder="Tên nhà hàng...." value={rest_name} onChange={(text) => setRestName(text.target.value)} />
                            <input placeholder="Địa chỉ..." value={rest_addr} onChange={(text) => setRestAddr(text.target.value)} />
                            <input placeholder="Số điện thoại..." value={rest_phone} onChange={(text) => setRestPhone(text.target.value)} />
                            <input placeholder="Mô tả....." value={rest_desc} onChange={(text) => setRestDesc(text.target.value)} />

                        </div>
                        <div className="footer">
                            <div>
                                <input value={id} hidden ></input>
                                <FontAwesomeIcon icon={faAdd} />
                                <button style={{ padding: "0" }} onClick={() => handleRestAdd(id)} > Thêm</button>
                            </div>
                        </div>
                    </>
            }
            {/* <ToastContainer style={{position: "fixed", top: "10%", height: "100vh"}} /> */}
        </>
    );
}

export default CreateRest;