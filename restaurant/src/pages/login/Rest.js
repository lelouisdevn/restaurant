import {Link} from "react-router-dom"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rest = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const id = localStorage.getItem("UserID");
    const [rest, setRest] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        getRest(id);
    }, [id]);

    const getRest = async (id) =>{
        await axios
        .get(`http://localhost:4000/api/getallrestfromone/id=${id}`)
        .then((res) =>{
            const temp = res?.data.rest;
            setRest(temp);
            //console.log(temp);
        })
        .catch((error) =>{
            console.log("Error: ",error);
        }) .finally(() => {
            setisLoading(false);
        }); 
        
    }
    const handleRestClick = async(id) =>{
        localStorage.setItem("RestaurantID",id);
        navigate("/manage/home");
        
    }
    // const [rest_name, setRestName] = useState("");
    // const [rest_phone, setRestPhone] = useState("");
    // const [rest_addr, setRestAddr] = useState("");
    // const [rest_desc, setRestDesc] = useState("");

    // const handleRestAdd = async () =>{

    // }

    return(
        <div>
            <div>
                <div>{localStorage.getItem("UserID")}</div>
                {isLoading? null: rest.map((row)=>(
                    <button onClick={(e)=>handleRestClick(row.info._id)} type="button">{row.info.rest_name}</button>
                ))}
            </div>
            {/* <table className="table w-full bg-indigo-200 rounded-lg text-center ">
                <tbody className='font-bold staff-content'>
                    <br/>
                    <input value={localStorage.getItem("UserID")} hidden></input>
                    <tr>
                        <td>Tên nha hang:</td>
                        <td>
                            <input value={rest_name} onChange={(text) => setStaffName(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>sdt:</td>
                        <td>
                            <input value={rest_phone} onChange={(text) => setStaffPhone(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Dia chi</td>
                        <td>
                            <input value={rest_addr} onChange={(text) => setStaffDob(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>mo ta:</td>
                        <td>
                            <input value={rest_desc} onChange={(text) => setStaffAddr(text.target.value)}></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td colSpan="2">
                            <button onClick={() => handleRestAdd()}  type="submit" name='submit' className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Tạo</button>
                        </td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    );
}

export default Rest;