import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faDotCircle, faEdit, faEye, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import OrderModal from '../orders/OrderModal';
import { useNavigate } from "react-router-dom";
import DS_Detail from './ds_detail';
import './bep.css';
import Modal from "./modal";
import useModal from './useModal';
import Bep_Modal from './bep_modal';
import Get_Table from './get_table';
function DS_Order() {
  const navigate = useNavigate();
  const HOST = 'http://localhost:4000/api';
  const id = localStorage.getItem("RestaurantID");
  //console.log(id);
  const [table, setTable] = useState([]);
  const [lobbies, setLobbies] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderdetail, setOrderDetail] = useState([]);

  const getOrderList = async () => {
    const URL = `${HOST}/order/all/`;
    const restaurant = JSON.parse(localStorage.getItem("infoRestaurant"));
    const res = await axios.post(URL, {
      restaurant: restaurant._id,
      criteria: "1",
    });
    if (res.status === 200) {
      const fetchedData = res?.data.orders;
      console.log(fetchedData);
      setOrders(fetchedData);
      // setFilteredOrder(fetchedData);
    }
  }
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
    getOrderList();

  }, []);
  //lay all ban khi co id khu vuc
  const getTables = async (id) => {
    await axios
      .get(`http://localhost:4000/api/lobby/${id}/detailtable/status=1`)
      .then((res) => {
        const temp = res?.data.sit;
        console.log(lobbies[0]);
        console.log("Ban theo khu vuc: ", temp);
        setTable(temp);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })


  };
  
  const {isShowing, toggle} = useModal();
  const [selectedOrder, setSelectedOrder] = useState("");
  const [detailModal, setDetailModal] = useState(false);
  const showModal = (o) => {
    setDetailModal(true);
    o['Order'] = o._id;
    setSelectedOrder(o);
  }
  const closeModal = () => {
    setDetailModal(false);
  }
  const style = {
    width: "100%",
    height: "90%",
    position: "absolute",
    left: "0",
    top: "7%",
};
  return (
    <>
      {
        detailModal &&
          <Bep_Modal
          order={selectedOrder}
          style={style}
          functioner={closeModal}
        />
      }
      <table className="order-grid-container p-5 m-5">

        <div class="flex flex-col ">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="table table-fixed min-w-full text-left text-sm font-light">

                  <tbody>
                    <tr style={{ background: "aliceblue", fontWeight: "bold" }}>
                      <td scope="col" class="px-6 py-4">OrderID</td>
                      <td scope="col" class="px-6 py-4">Bàn</td>
                      <td scope="col" class="px-6 py-4">Trạng Thái</td>
                      <td scope="col" class="px-6 py-4">Giờ đặt</td>
                      <td scope="col" class="px-6 py-4">Ghi Chú</td>
                      <td scope="col" class="px-6 py-4">Xem Chi Tiết</td>
                    </tr>
                    {(orders).map((row, index) => (
                      <tr
                        class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                        <td class="whitespace-nowrap px-6 py-4 font-medium">{row._id}</td>
                        <td class="whitespace-nowrap px-6 py-4"> <Get_Table orderid={row._id}/></td>
                        <td class="whitespace-nowrap px-6 py-4"> {row.status}</td>
                        <td class="whitespace-nowrap px-6 py-4">{new Date(row.order_at).toLocaleString("vi-VN", { hour12: false })}</td>
                        <td class="whitespace-nowrap px-6 py-4">{row.note}</td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {/* <DS_Detail order={row}/> */}
                          {/* <button className="button-default" onClick={toggle}>Xem chi tiết</button> */}
                          {/* <Modal
                            isShowing={isShowing}
                            hide={toggle}
                            order={row}
                          /> */}
                          <button className="button-default" onClick={() => showModal(row)}>Chi Tiết</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </table>

    </>
  );
}

export default DS_Order;