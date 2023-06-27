import React, { useEffect, useState } from 'react';
import axios from "axios";
function Set_Status(props) {
    const HOST = 'http://localhost:4000/api';
    const [stt, setSTT] = useState([]);
    const setStatus = async (id) => {
        const fetchDataURL = `http://localhost:4000/api/orderdetail/chebien/update=${id}`;
        await axios
            .put(fetchDataURL)
            .then((res) => {
                console.log(res?.data.statusOP);
            })
    }
    // useEffect(() => {
    //     if(stt != "dadat"){
    //         setStatus(props.orderdetailID);
    //     }
        
    // }, [stt]);

    function rolechar(i){
        const dd = "Đã gửi bếp";
        const cb = "Đang chế biến";
        if (i == "dadat") {
            return dd;
        } else if(i == "chebien") {
            return cb;
        }

    }
    return (
        <>
            <select
                    className=""
                    defaultValue={props.status} onChange={(text) => setStatus(props.orderdetailID)}
            >
                <option value={props.status}>{rolechar(props.status)}</option>
                {
                    props.status == "dadat" ? <option value="chebien">Đang chế biến</option>
                    : ""
                }

            </select>
            
        </>
    );
}
export default Set_Status;