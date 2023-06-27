import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderModal from '../orders/OrderModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faDotCircle, faEdit, faEye, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import '../orders/modal.css'
import Get_Product from './get_product';
import Set_Status from './set_status';
function DS_Detail(props) {
    const HOST = 'http://localhost:4000/api';
    const [table, setTable] = useState([]);
    const [orderdetail, setOrderDetail] = useState([]);
    const [statusO, setStatusO] = useState(props.status);
    const [stt, setSTT] = useState([]);
    //lay all ban khi co id khu vuc
    const getOrderDetail = async (id) => {
        const URL = `${HOST}/order/${id}/details`;
        const restaurant = JSON.parse(localStorage.getItem("infoRestaurant"));
        const response = await axios.get(URL);
        if (response.status === 200) {
            const fetchedData = response?.data.details;
            console.log(fetchedData);
            setOrderDetail(fetchedData);
        }
    }
    
    useEffect(() => {
        getOrderDetail(props.order._id);
    }, []);
   
    

    return (
        <>
            <h3 style={{ fontSize: "25px", fontWeight: "bold" }}>
                CHI TIẾT GỌI MÓN
            </h3>
            <table className='table table-fixed min-w-full text-left text-sm font-light'>
                <tr style={{ borderRadius: "10px 10px 0 0", fontWeight: "bold" }} >
                    <td>Món</td>
                    <td>Số lượng</td>
                    <td>Đơn giá</td>
                    <td>Trạng thái</td>
                </tr>

                {(orderdetail).map((row, index) => (
                    <tr>
                        <td><Get_Product proid={row.Product} /></td>
                        <td>{row.qty}</td>
                        <td>{row.unit_price}</td>
                        <td><Set_Status orderdetailID={row._id} status={row.status}/></td>
                    </tr>
                ))}

            </table>

        </>
    )
}
export default DS_Detail; 