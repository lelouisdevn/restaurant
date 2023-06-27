import { useEffect, useState } from "react"
import '../products/this.css'
import './modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import VND from "../../components/currency";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import QRCode from "react-qr-code";
import { ReactDOM } from "react";
import React from "react";
const OrderModal = (props) => {
    const HOST = "http://localhost:4000/api";
    const [orderId, setOrderId] = useState(props.order.Order);
    const [order, setOrder] = useState("");
    const [user, setUser] = useState("");
    const [orderDetails, setOrderDetails] = useState([]);
    const [tables, setTables] = useState([]);
    const [money, setMoneyReceived] = useState(0); //for calculating the left money;
    const [documentTitle, setDocumentTitle] = useState("");
    const [rest, setRest] = useState("");



    const bankAccount = {
        "first": "00020101021238580010A000000727012800069704070114190392627080170208QRIBFTTA520460115303704540",
        "n_char": String(order.total).length,
        "money": order.total,
        "second": "5802VN5903TCB6005Hanoi62090805",
        "content": "ttoan",
        "third": "6304c7c3"
    };
    var qrcode = bankAccount.first + bankAccount.n_char + bankAccount.money
        + bankAccount.second + bankAccount.content + bankAccount.third;
    var qrcode = qrcode.toString();
    console.log(qrcode);

    const json = localStorage.getItem("infoRestaurant");
    const valuejson = JSON.parse(json);
    console.log(valuejson);
    const [infoStaff, setInfoStaff] = useState(valuejson);
    // Set criteria to 1 and set display status of modal to false;
    const handlePay = () => {
        props.changeCriteria();
        props.functioner();
        // generateBillPDF();
    }
    const [billExportStatus, setBillExportStatus] = useState(true);
    const getRestInfo = async () => {
        const id = localStorage.getItem("RestaurantID");
        const url = `${HOST}/info/id=${infoStaff._id}`;
        await axios
            .get(url)
            .then((res) => {
                console.log("user: ", res?.data.info);
                setRest(res?.data.info[0]);
            })
    }
    const getDetails = async () => {
        const url = `${HOST}/order/${orderId}/details`;
        const res = await axios.get(url)
        // .then((res) => {
        //     console.log(res?.data.details);
        //     setOrderDetails(res?.data.details);
        // })
        var data = [];
        if (res.status === 200) {
            data = res.data.details;
            console.log(data);
        }
        if (data.length != 0) {
            data = data.filter((item) => item.status != "xoa");
        }
        console.log(data);
        setOrderDetails(data);
    }
    const getTables = async () => {
        const url = `${HOST}/order/${orderId}/tables`;
        await axios
            .get(url)
            .then((res) => {
                setTables(res?.data.tables);
            })
    }
    const getOrderInfo = async () => {
        const url = `${HOST}/order/${orderId}`;
        await axios
            .get(url)
            .then((res) => {
                console.log(res?.data.order);
                const data = res?.data.order;
                setOrder(data[0]);
                setUser(data[0].user[0]);
                // console.log("order: ", data);
            })
    }
    // Get order info when orderId changes;
    useEffect(() => {
        getRestInfo();
        getOrderInfo();
        getTables();
        getDetails();
        setDocumentTitle(orderId);
    }, [orderId]);


    const style = {}
    const styleTable = {
        margin: "10px 0",
        border: "solid 1px lightgrey!important",
        fontSize: "16px",
    };

    const componentPDF = useRef("null");
    const generateBillPDF = useReactToPrint(
        {
            content: () => componentPDF.current,
            documentTitle: documentTitle,
        }
    );
    // HTML template;
    return (
        <>
            <div style={props.style ? props.style : style}>
                <div className="update-modal order-modal">
                    <div className="order-modal-title">
                        <div>HOÁ ĐƠN THANH TOÁN</div>
                        <span style={{ top: "1px", right: "1px" }}
                            onClick={() => {
                                props.functioner()
                                setBillExportStatus(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                    </div>
                    <div className="order-modal-content">
                        <div ref={componentPDF} className="order-table-info order-container">
                            <table style={styleTable} className="styleTable">
                                <tr>
                                    <td colSpan={2} style={{ fontSize: "20px", fontWeight: "bold" }}>{rest.rest_name}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{rest.rest_addr}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>{rest.rest_phone}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{ fontWeight: "bold", fontSize: "25px", color: "crimson" }}>
                                        HOÁ ĐƠN
                                    </td>
                                </tr>
                                <tr><td>Mã hóa đơn:</td><td>{order._id}</td></tr>
                                <tr><td>Đặt lúc:</td><td>{new Date(order.order_at).toLocaleString("vi-VN", { hour12: false })}</td></tr>
                                {
                                    order.bill_at &&
                                    <tr><td>Thanh toán lúc:</td><td>{new Date(order.bill_at).toLocaleString("vi-VN")}</td></tr>
                                }
                                <tr>
                                    <td>Bàn:</td>
                                    <td>{
                                        tables.map((tbl) =>
                                            <>{tbl.tables[0].tbl_id}, </>)
                                    }</td>
                                </tr>
                                <tr><td>Nhân viên:</td><td>{user.staff_name}</td></tr>
                            </table>
                            <table style={{ fontSize: "16px" }}>
                                <tr style={{fontWeight: "bold"}}>
                                    <td>STT</td>
                                    <td>Tên sản phẩm</td>
                                    <td>Số lượng</td>
                                    <td>Đơn giá</td>
                                    <td>Tổng</td>
                                </tr>
                                {orderDetails.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.product[0].prod_name}</td>
                                        <td>{item.qty}</td>
                                        <td>{VND.format(item.unit_price)}</td>
                                        <td>{VND.format(item.unit_price * item.qty)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4}>Tổng:</td>
                                    {
                                        order.total === undefined ?
                                        <td style={{ fontWeight: "bold" }}>
                                            Loading...
                                        </td> :
                                        <td style={{ fontWeight: "bold" }}>
                                            {VND.format(order.total)}
                                        </td>
                                    }
                                </tr>
                            </table>
                        </div>
                        <div style={{fontSize: "18px"}}>
                            
                            <QRCode
                                style={{ width: "160px", height: "160px", margin: "0 auto", padding: "10px", border: "solid 1px grey", borderRadius: "10px" }} 
                                value={qrcode} />
                            <div>Mã QR thanh toán cho đơn hàng</div>
                            <div style={{color: "crimson"}}>{order._id}</div>
                            {
                                order.bill_at ?
                                <div>{new Date(order.bill_at).toLocaleString("vi-VN")}</div>
                                :
                                <div>{new Date().toLocaleString("vi-VN")}</div>
                            }
                        </div>
                        <div style={{ fontSize: "16px" }}>
                            {/* <div>
                                Tiền khách đưa:
                                <input
                                    style={{ border: "solid 1px lightgrey", borderRadius: "10px", padding: "5px 7px", margin: "0 7px" }}
                                    onChange={(e) => setMoneyReceived(e.target.value)} />
                            </div>
                            <div>
                                Tiền thối: {VND.format(money - order.total)}
                            </div> */}
                        </div>
                    </div>
                    <div className="order-modal-footer">
                        {/* <button disabled={billExportStatus} onClick={() => handlePay()}>Thanh toán hoá đơn</button> */}
                        <button
                            onClick={() => {
                                generateBillPDF()
                                setBillExportStatus(false);
                            }
                            }
                        >Xuất hóa đơn</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderModal;
