import { Link } from "react-router-dom";
import OrderGrid from "./OrderGrid";
import { useEffect, useState } from "react";
import axios from 'axios';
import Toolbar from '../../products/Toolbar'
import Loading from "../../products/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faRefresh } from "@fortawesome/free-solid-svg-icons";
import OrderFilter from "./OrderFilter";
import '../modal.css';
import '../../products/this.css';
import './order-grid.css';
import OrderModal from '../OrderModal';
import Success from "../../products/Success";
const ManageOrderList = () => {
    const HOST = 'http://localhost:4000/api';
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOrder, setFilteredOrder] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState("");
    const [empty, setEmptySearch] = useState("");
    const toolbar = {
        "sort": true,
        "search": true,
        'filter': true,
    };
    const successNoti = {
        noti: "Đơn hàng đã được hủy thành công",
        icon: "faCheck"
    }
    const errorOnCancel = {
        noti: "Đơn hàng không thể hủy do đã được chế biến",
        icon: "faClose",
    }
    const errorOccurred = {
        noti: "Đã có lỗi xãy ra, hãy thử lại sau",
        icon: "faClose",
    }
    const comfirmPayment = {
        noti: "Bạn đang thanh toán cho hóa đơn này?",
        icon: "faQuestion"
    }
    const paymentSuccess = {
        noti: "Hóa đơn đã được thanh toán thành công",
        icon: "faCheck",
    }
    const [criteria, setCriteria] = useState(1);
    const getOrderList = async () => {
        setEmptySearch("Đang tải dữ liệu từ server....")
        const URL = `${HOST}/order/all/`;
        const restaurant = JSON.parse(localStorage.getItem("infoRestaurant"));
        const res = await axios.post(URL, {
            restaurant: restaurant._id,
            criteria: criteria,
        });
        if (res.status === 200) {
            const fetchedData = res?.data.orders;
            console.log(fetchedData);
            setOrders(fetchedData);
            setFilteredOrder(fetchedData);
            if (fetchedData.length === 0) {
                setEmptySearch("Chưa có hóa đơn của ngày hôm nay!")
            }
        }
    }
    useEffect(() => {
        getOrderList();
    }, [criteria]);
    //when page is loaded -> get all orders;
    useEffect(() => {
        getOrderList();
    }, []);



    const getSearchQuery = (query) => {
        setSearchQuery(query.toString());
        console.log(query);
    };
    useEffect(() => {
        if (searchQuery === "") {
            getOrderList();
        }
        else {
            const filterBySearch = filteredOrder.filter((order) => {
                let name = String(order._id);
                let mquery = String(searchQuery);
                if (name.includes(mquery)) {
                    return order;
                }
            })
            setFilteredOrder(filterBySearch);
            if (filterBySearch.length === 0) {
                setEmptySearch(`Không tìm thấy hóa đơn với mã số "${searchQuery}"`);
            }
        }
    }, [searchQuery]);
    const status = {
        "0": 'Hóa đơn đã thanh toán',
        '1': "Hóa đơn chưa thanh toán",
        '2': 'Hóa đơn đã hủy',
        '3': 'Tất cả hóa đơn',
    };
    // const [showClass, setShowClass] = useState("hd-menu");
    // const showDropdownMenu = () => {
    //   if (showClass == "hd-menu") {
    //     setShowClass("dd-menu");
    //   } else {
    //     setShowClass("hd-menu");
    //   }
    // }
    const [successClass, setSuccessClass] = useState('');
    const [filter, setFilter] = useState();
    const toggleFilter = () => {
        setFilter(!filter);
        setSuccessClass('opacity-success');
    }
    const closeModal = () => {
        setFilter(false);
        setDetailModal(false);
        setSuccessClass("");
    }
    const updateOrderList = (list) => {
        // if (filteredOrder.length != 0) {
        //     setFilteredOrder([]);
        // }
        setFilteredOrder(list);
    }

    const [refresh, setRefresh] = useState("");
    const refreshPage = () => {
        setRefresh("refresh");
        setFilteredOrder([]);
        setEmptySearch("Đang tải dữ liệu từ server....")
        setTimeout(() => {
            getOrderList();
            setRefresh("");
        }, 1500);
    }
    const [detailModal, setDetailModal] = useState(false);
    const seeDetails = (order) => {
        let new_order = { Order: order._id };
        console.log(new_order)
        setSelectedOrder(new_order);
        console.log(order);
        setDetailModal(true);
        setSuccessClass("opacity-success");
    }

    const style = {
        width: "100%",
        height: "90%",
        position: "absolute",
        left: "0",
        zIndex: "10",
    };
    // Order cancellation;
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState({});
    const confirmCancelOrder = () => {
        setSuccess(true);
        setSuccessClass("opacity-success");
        const message = {
            noti: "Bạn có chắc muốn xóa đơn hàng này không?",
            icon: "faTrash"
        };
        setMessage(message);
    }
    const cancelOrder = async (order) => {
        setSelectedOrder(order);
        const orderId = order._id;
        const orderStatus = ['chebien', 'xuatmon', 'hetmon', 'phucvu'];
        let cancel = false;

        const URL = `${HOST}/order/${orderId}/details`;
        const response = await axios.get(URL);
        let fetchedInfo = [];
        if (response.status === 200) {
            fetchedInfo = response?.data.details;
        }

        fetchedInfo.forEach(element => {
            if (orderStatus.includes(element.status.trim())) {
                return cancel = true;
            }
        });
        if (order && !cancel) {
            confirmCancelOrder();
        } else {
            setMessage(errorOnCancel);
            setSuccess(true);
            setSuccessClass("opacity-success");
        }
    }
    const proceedCancelling = async (status) => {
        if (status === 'huydon') {
            const url = `${HOST}/order/update`;
            const res = await axios
                .post(url, {
                    orderId: selectedOrder._id,
                    criteria: 0, // 0-> huy don
                })
            if (res.status === 200) {
                setMessage(successNoti);
                // setFilteredOrder([]);
                // getOrderList();
                setOrderActionStatus({
                  status: "dahuy",
                  order: selectedOrder,
                })
            } else {
                setMessage(errorOccurred);
            }
            setTimeout(() => {
                setSuccess(false);
                setSuccessClass("");
            }, 3000);
        }
    }
    const confirmPayOrder = (order) => {
        setSuccess(true);
        setSuccessClass("opacity-success");
        setMessage(comfirmPayment);
        setSelectedOrder(order);
    }
    const [orderActionStatus, setOrderActionStatus] = useState({});
    const payOrder = async (status) => {
        if (status === 'thanhtoan') {
            const url = `${HOST}/order/update`;
            const res = await axios
                .post(url, {
                    orderId: selectedOrder._id,
                    criteria: 1,
                })
            if (res.status === 200) {
                setOrderActionStatus(
                  {
                    status: 'dathanhtoan',
                    order: selectedOrder,
                  }
                );
                setMessage(paymentSuccess);
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessClass("");
                }, 3000);
            }
        }
    }
    const [isSorted, setSort] = useState("false");
    const sort = () => {
        if (isSorted === 'sortaz') {
            sortZA();
        }else {
            sortAZ();
        }
    }
    const sortAZ = () => {
        const sortedOrder = filteredOrder.sort((a,b) => {
            if (a._id < b._id) {
                return -1;
            }else {
                return 1;
            }
        })
        setSort("sortaz");
    };
    const sortZA = () => {
        filteredOrder.sort((a, b) => {
            if (a._id < b._id) {
                return 1;
            }else {
                return -1;
            }
        });
        setSort("sortza");
    };
    return (
        <>
            {
                success &&
                <Success
                    message={message}
                    style={style}
                    functioner={proceedCancelling}
                    setSuccess={setSuccess}
                    setSuccessClass={setSuccessClass}
                    payOrder={payOrder}
                />
            }
            {
                detailModal &&
                <OrderModal
                    order={selectedOrder}
                    style={style}
                    functioner={closeModal}
                />
            }
            {
                filter &&
                <OrderFilter closeModal={closeModal} updateOrderList={updateOrderList} />
            }
            <div className={`detail-container ${successClass}`}>
                <div className="fixed-header">
                    <div className="title">
                        <Link to={'/manage/orders'}>
                            <h2>Quản lý hóa đơn</h2>
                        </Link>
                    </div>
                    <Toolbar
                        toolbar={toolbar}
                        functioner={getSearchQuery}
                        toggleFilter={toggleFilter}
                        sort={sort}
                        sortType={isSorted}
                    />
                </div>
                <div className="content">
                    <div className="header-product n_right_content" style={{ width: "100%" }}>
                        <div className="left-menu">
                            <FontAwesomeIcon icon={faList} />
                            <span> Hóa đơn</span>
                            <span>/{status[criteria]}</span>
                            {
                                filteredOrder.length !== 0 &&
                                <span> ({filteredOrder.length})</span>
                            }
                        </div>
                        <div className="right-menu">
                            <span onClick={refreshPage}>
                                <FontAwesomeIcon icon={faRefresh} className={refresh} />
                            </span>
                            <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
                                <option value="0">
                                    Hóa đơn đã thanh toán
                                </option>
                                <option value="1">
                                    Hóa đơn chưa thanh toán
                                </option>
                                <option value="2">
                                    Hóa đơn đã hủy</option>
                                {/* <option value="3">Tất cả hóa đơn</option> */}
                            </select>
                        </div>
                    </div>
                    <div className="products">
                        {/* <div className='product-number'>
            {
              filteredOrder.length != 0 && <div>Tìm thấy <span style={{fontWeight: "bold"}}>{filteredOrder.length}</span> hoá đơn</div>
            }
          </div> */}
                        <table style={{ width: "100%" }}>
                            <tr style={{ background: "aliceblue", fontWeight: "bold" }}>
                                <td>STT</td>
                                <td>Mã hóa đơn</td>
                                <td>Bàn</td>
                                <td>Giờ đặt</td>
                                <td>Số tiền</td>
                                <td>Trạng thái</td>
                                <td>Thao tác</td>
                            </tr>
                            {
                                filteredOrder.length > 0 && filteredOrder.map((order, index) => (
                                    <OrderGrid
                                        order={order}
                                        key={order._id}
                                        stt={index + 1}
                                        seeDetails={seeDetails}
                                        cancelOrder={cancelOrder}
                                        pay={confirmPayOrder}
                                        status={orderActionStatus}

                                    />
                                ))
                                // : <Loading message="Đang tải dữ liệu từ server...." />
                            }
                        </table>
                        {filteredOrder.length === 0 && <Loading message={empty} />}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManageOrderList;
