
import React,  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserBase from './UserBase';
import axios from "axios";
function UserList() {
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        await axios
          .get("http://localhost:4000/api/users")
          .then((res) => {
            const temp = res?.data.users;
            setUsers(temp);
            console.log(temp);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      }
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