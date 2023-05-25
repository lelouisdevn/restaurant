
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserBase from './UserBase';

function UserList() {
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
    return (
        <table className='table-auto bg-indigo-900 rounded p-5 m-5'>
            <tbody>
                <tr className="flex flex-wrap ">
                    {users.map((user)=> <UserBase key={user._id} user={user} />)}
                </tr>
            </tbody>
        </table>
    );
}

export default UserList;