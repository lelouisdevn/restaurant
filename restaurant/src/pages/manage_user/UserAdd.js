import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./UserDetail.css"

function UserAdd(){
    return (
        <div className='m-5 '>
            <table className="table w-full bg-indigo-200 rounded-lg text-center ">
                <tbody className='font-bold staff-content'>
                    <br/>
                    <tr>
                        <td>Tên:</td>
                        <td>
                            <input></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>SĐT:</td>
                        <td>
                            <input></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Ngày Sinh:</td>
                        <td>
                            <input></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Địa Chỉ:</td>
                        <td>
                            <input ></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Giới Tính:</td>
                        <td>
                            <input></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Username:</td>
                        <td>
                            <input></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <input></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td>Role:</td>
                        <td>
                            <input></input>
                        </td>
                    </tr>
                    <br/>
                    <tr>
                        <td colspan="2">
                            <button  type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Lưu</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserAdd;