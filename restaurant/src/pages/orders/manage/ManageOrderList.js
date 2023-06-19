import { Link } from "react-router-dom";
import OrderGrid from "./OrderGrid";
import { useEffect, useState } from "react";
import axios from 'axios';
import Toolbar from '../../products/Toolbar'
import Loading from "../../products/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import OrderFilter from "./OrderFilter";
import '../modal.css';
import '../../products/this.css';
import './order-grid.css';
const ManageOrderList = () => {
    const HOST = 'http://localhost:4000/api';
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOrder, setFilteredOrder] = useState([]);
    const toolbar = {
        "sort": true,
        "search": true,
        'filter': true,
    };
    const getOrderList = async () => {
        const URL = `${HOST}/order/all/`;
        const res = await axios.get(URL);
        if (res.status === 200) {
            const fetchedData = res?.data.orders;
            console.log(fetchedData);
            setOrders(fetchedData);
            setFilteredOrder(fetchedData);
        }
    }
    //when page is loaded -> get all orders;
    useEffect(() => {
        getOrderList();
    }, []);

    

    const getSearchQuery = () => {};
    const [criteria, setCriteria] = useState(3);
    const status = {
        "0": 'Hóa đơn đã thanh toán',
        '1': "Hóa đơn chưa thanh toán",
        '2': 'Hóa đơn đã hủy',
        '3': 'Tất cả hóa đơn',
    };
    const [showClass, setShowClass] = useState("hd-menu");
    const showDropdownMenu = () => {
      if (showClass == "hd-menu") {
        setShowClass("dd-menu");
      } else {
        setShowClass("hd-menu");
      }
    }
    const [successClass, setSuccessClass] = useState('');
    const [filter, setFilter] = useState();
    const toggleFilter = () => {
        setFilter(!filter);
        setSuccessClass('opacity-success');
    }
    const closeModal = () => {
        setFilter(!filter);
        setSuccessClass("");
    }
    const updateOrderList = (list) => {
        setFilteredOrder(list);
    }
    return(
    <>
    {
        filter &&
        <OrderFilter closeModal={closeModal} updateOrderList = {updateOrderList} />
    }
        <div className={`detail-container ${successClass}`}>
            <div className="fixed-header">
                <div className="title">
                    <Link to={'/manage/orders'}>
                        <h2>Quản lý hóa đơn</h2>
                    </Link>
                </div>
                <Toolbar 
                    toolbar = {toolbar}
                    functioner = {getSearchQuery}
                    toggleFilter = {toggleFilter}
                />
            </div>
            <div className="content">
                <div className="header-product n_right_content" style={{width: "100%"}}>
                    <div className="left-menu">
                        <FontAwesomeIcon icon={faList} />
                        <span> Hóa đơn</span>
                        <span>/{status[criteria]}</span>
                    </div>
                    <div className="right-menu">
                    <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
                        <option value="0">
                        Hóa đơn đã thanh toán
                        </option>
                        <option value="1">
                            Hóa đơn chưa thanh toán
                        </option>
                        <option value="2">
                        Hóa đơn đã hủy</option>
                        <option value="3">Tất cả hóa đơn</option>
                    </select>
                    </div>
                </div>
                <div className="products">
                    <table style={{width: "100%"}}>
                    {
                        filteredOrder.length > 0 ? filteredOrder.map((order, index) => (
                            <OrderGrid order={order} key={index} stt={index+1} />
                        )) : <Loading message="Đang tải dữ liệu từ server...." />
                    }
                    </table>
                </div>
            </div>
        </div>
    </>
    )
}
export default ManageOrderList;