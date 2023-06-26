import React,  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DS_Detail(props){
    const [table, setTable] = useState([]);
    //lay all ban khi co id khu vuc
    const getTables = async (id) => {
        await axios
            .get(`http://localhost:4000/api/lobby/${id}/detailtable/status=1`)
            .then((res) => {
                const temp = res?.data.sit;
                console.log("Ban theo khu vuc: ", temp);
                setTable(temp);
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
    };
    useEffect (()=>{
        console.log(props.lobby);
        getTables(props.lobby._id);
    },[]);
    return(
        <>
        {(table).map((row,index)=>(
            <ul className=" list-inside bg-slate-50 rounded-lg p-2 m-3 w-52 h-48 shortedword" >
                        {/* <ul className="" > */}
                                <li className="bg-indigo-200 rounded p-2">Lobby:  {row._id}</li>
                                <li>Tên: {row.tbl_name}</li>
                            </ul>
        ))}
        </>
    )
}
export default DS_Detail; 