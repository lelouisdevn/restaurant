import React, { useEffect, useState } from 'react';
import axios from "axios";
function Set_Status(props) {
    const HOST = 'http://localhost:4000/api';
    const [stt, setSTT] = useState([]);
    const setStatus = async (id,st) => {
        console.log(id,st);
        const fetchDataURL = `http://localhost:4000/api/orderdetail/${st}/update=${id}`;
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
        const xm = "Xuất Món";
        const hm = "Hết Món";
        if (i == "dadat") {
            return dd;
        } else if(i == "chebien") {
            return cb;
        }else if(i == "xuatmon") {
            return xm;
        }else if(i == "hetmon") {
            return hm;
        }

    }
    return (
        <>
            <select
                    className=""
                    defaultValue={props.status} onChange={(text) => setStatus(props.orderdetailID,text.target.value)}
            >
                <option value={props.status}>{rolechar(props.status)}</option>
                {
                    props.status == "dadat" ? <><option value="chebien">Đang chế biến</option><option value="xuatmon">Xuất Món</option><option value="hetmon">Hết Món</option></>
                    : props.status == "chebien" ? <><option value="xuatmon">Xuất Món</option></>
                    : props.status == "xuatmon" ? ""
                    : props.status == "huy" ? "" : ""
                }

            </select>
            
        </>
    );
}
export default Set_Status;