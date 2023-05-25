import React from 'react';
import "./info.css";
import { Link } from 'react-router-dom';

const Info = () => {
    return (
        <div className="">
            <div className="basis-3/4">
                <div className="flex flex-row mt-5 bg-indigo-200 rounded-lg p-5 m-5">
                    <div>
                        <p className='font-sans text-2xl font-bold'>THÔNG TIN NHÀ HÀNG</p>
                    </div>
                </div>
                <table className='flex flex-row justify-center bg-indigo-200 rounded p-5 m-5'>
                    <tbody className='font-mono font-bold'>
                        <br/>
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Name:
                            </td>
                            <td className='basis-3/4 text-2xl'>
                                SAGA RESTAURANT
                            </td>
                        </tr >
                        <br/><br/>
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Describe:
                            </td>
                            <td className='basis-3/4'>
                                Nhà Hàng SAGA cư ngụ tại số 3 Trần Hưng Đạo với 35 năm kinh nghiệm trong nghề.
                            </td>
                        </tr>
                        <br/><br/>
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Address:
                            </td>
                            <td className='basis-3/4'>
                                3 Trần Hưng Đạo, Lê Bình, Cái Răng, Cần Thơ
                            </td>
                        </tr>
                        <br/><br/>
                        <tr className='flex flex-row'>
                            <td className='basis-1/4'>
                                Phone:
                            </td>
                            <td className='basis-3/4'>
                                0986195333
                            </td>
                        </tr>
                        <br/>
                        <tr className='flex justify-center'>
                            <td colspan="2">
                                <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><Link to="./editinfo">Sửa</Link></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Info