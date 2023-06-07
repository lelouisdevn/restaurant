import React,  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./info.css";
import { Link } from 'react-router-dom';
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const InfoEdit = () => {
    const {id} = useParams();

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
    const handleEdit = async () => {
        try {
          await axios
            .put(`http://localhost:4000/api/info/edit/id=${id}`, {
                rest_name: rest_name ? rest_name : info.rest_name,
                rest_desc: rest_desc ? rest_desc : info.rest_desc,
                rest_addr: rest_addr ? rest_addr : info.rest_addr,
                rest_phone: rest_phone ? rest_phone : info.rest_phone,
            })
            .then((res) => {
              console.log("Ok");
              toast.success("🦄 Cập nhật thông tin nhà hàng thành công!", {
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
                    <tbody className='font-mono font-bold w-full'>
                        <br />
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Name:
                            </td>
                            <td className='basis-3/4 text-2xl'>
                                <div className="mb-6">
                                    <input defaultValue={info.rest_name} onChange={(text) => setInfoName(text.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                            </td>
                        </tr >
                        <br /><br />
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Describe:
                            </td>
                            <td className='basis-3/4'>
                                <div className="mb-6">
                                    <input defaultValue={info.rest_desc} onChange={(text) => setInfoDesc(text.target.value)} type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                            </td>
                        </tr>
                        <br /><br />
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Address:
                            </td>
                            <td className='basis-3/4'>
                                <div className="mb-6">
                                    <input defaultValue={info.rest_addr} onChange={(text) => setInfoAddr(text.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                            </td>
                        </tr>
                        <br /><br />
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Phone:
                            </td>
                            <td className='basis-3/4'>
                                <div className="mb-6">
                                    <input defaultValue={info.rest_phone} onChange={(text) => setInfoPhone(text.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                            </td>
                        </tr>
                        <br />
                        <tr className='flex justify-center'>
                            <td colspan="2" >
                                <button onClick={(e) => handleEdit(info._id)} type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Lưu Thông Tin</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ToastContainer />
            </div>
        </div>
    );
}
export default InfoEdit