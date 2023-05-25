import React from 'react';
import "./info.css";

const InfoEdit = () => {
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
                                    <input value="RESTAURANT-TTT" type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
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
                                    <input value="Nhà Hàng SAGA cư ngụ tại số 3 Trần Hưng Đạo với 35 năm kinh nghiệm trong nghề." type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
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
                                    <input value="3 Trần Hưng Đạo, Lê Bình, Cái Răng, Cần Thơ" type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
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
                                    <input value="0986195333" type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                            </td>
                        </tr>
                        <br />
                        <tr className='flex justify-center'>
                            <td colspan="2" >
                                <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Lưu Thông Tin</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default InfoEdit