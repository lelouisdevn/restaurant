import React,  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./info.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Info = () => {
    const navigator = useNavigate();

    const [info, setInfo] = useState([]);

    const [rest_name, setInfoName] = useState("");
    const [rest_desc, setInfoDesc] = useState("");
    const [rest_addr, setInfoAddr] = useState("");
    const [rest_phone, setInfoPhone] = useState("");

    const getInfo = async () => {
        await axios
          .get(`http://localhost:4000/api/info/id=${localStorage.getItem("RestaurantID")}`)
          .then((res) => {
            const temp = res?.data.info[0];
            setInfo(temp);
            console.log(temp);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
    }
    const editRest = (info) => {
        navigator(`./edit/${info._id}`);
    };
    useEffect(() => {
        getInfo();
    }, []);

    return (
        <div className="">
            <div className="basis-3/4">
                <div className="flex flex-row mt-5 bg-indigo-200 rounded-lg p-5 m-5">
                    <div>
                        <p className='font-sans text-2xl font-bold'>THÔNG TIN NHÀ HÀNG</p>
                    </div>
                </div>
                <table className='flex flex-row justify-center bg-indigo-200 rounded p-5 m-5'>
                    <tbody className='font-mono font-bold info-content w-full'>
                        <br/>
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Tên:
                            </td>
                            <td className='basis-3/4 text-2xl'>
                                {info.rest_name}
                            </td>
                        </tr >
                        <br/><br/>
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Mô tả:
                            </td>
                            <td className='basis-3/4 '>
                                {info.rest_desc}
                            </td>
                        </tr>
                        <br/><br/>
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Địa chỉ:
                            </td>
                            <td className='basis-3/4 text-2xl'>
                                {info.rest_addr}
                            </td>
                        </tr>
                        <br/><br/>
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                SĐT:
                            </td>
                            <td className='basis-3/4 text-2xl'>
                                {info.rest_phone}
                            </td>
                        </tr>
                        <br/>
                        <tr className='flex justify-center'>
                            <td colspan="2">
                                <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() =>editRest(info)}>Sửa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Info