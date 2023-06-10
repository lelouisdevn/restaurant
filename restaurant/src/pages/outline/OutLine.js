import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Outline.scss";
import "../orders/orders.css";
import { useNavigate, useParams } from "react-router-dom";
import SelectedTable from "./SelectedTable";
import PerSonSitting from "./PersonSitting";
import { Item } from "./Item";
import PersonSitting from "./PersonSitting";
import LoadingT from "./Loading";
import ReviewOrderInfo from "../orders/ReviewOrderInfo";
import OrderDetail from "../orders/manage/OrderDetail";
import VND from "../../components/currency";
import Success from "../products/Success";
import OrderModal from "../orders/OrderModal";
// const Item = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(1),
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   textAlign: "center",
//   borderWidth: 0,
//   borderRadius: 0,
//   boxShadow: "none"
// }));

const OutLine = ({ id, arrange, numRow }) => {
  // const { id, arrange, numRow } = useParams();
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [detailOrder, setDetailOrder] = useState();
  const [tablesStatus1, setTablesStatus1] = useState([]);
  const [show, setShow] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isLDO, setisLDO] = useState(false);
  const [updateTotal, setupdateTotal] = useState(0);

  useEffect(() => {
    getTables(id);

    // (async () => {
    //   await axios
    //     .get("http://localhost:4000/api/table/status=1")
    //     .then((res) => {
    //       const temp = res?.data.table;
    //       console.log("ban co nguoi ngoi: ", temp);
    //       setTablesStatus1(temp);
    //     })
    //     .catch((error) => {
    //       console.log("Error: ", error);
    //     });
    // })();
    // if (listTable.find((tab) => tab._id === table._id)) {
    //   setListTable(listTable.filter((lt) => lt._id !== table._id));
    // } else {
    //   setListTable([...listTable, table]);
    //   }
  }, [id]);

  const getTables = async (id) => {
    await axios
      .get(`http://localhost:4000/api/lobby/${id}/detailtable/status=1`)
      .then((res) => {
        const temp = res?.data.sit;
        // console.log("Ban theo khu vu ", temp);
        setTables(temp);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const getDetailTables = async () => {
    await axios.get().then((res) => {
      // const temp = res?.data;
    });
  };
  const ChooseATable = (table) => {
    navigate(`/staff/order/table/${table._id}/${table.tbl_id}`);
    // if (listTable.find((tab) => tab._id === table._id)) {
    //   setListTable(listTable.filter((lt) => lt._id !== table._id));
    // } else {
    //   setListTable([...listTable, table]);
    //   }
  };

  const viewDetailTable = async (props) => {
    console.log("ok: ", props);
    setShow(props.status);
    if (props.status) {
      await axios
        .get(`http://localhost:4000/api/table=${props.table}/orderdetail`)
        .then((res) => {
          const temp = res?.data.detailOrder[0];
          setDetailOrder(temp);
          setProducts(temp.listpro);
          console.log("lalala: ", temp);
        })
        .finally(() => {
          setisLDO(true);
        });
    }
  };
  const [info, setInfo] = useState([]);
  const [table, setTable] = useState();
  const json = localStorage.getItem("infoStaff");
  const valuejson = JSON.parse(json);
  const [infoStaff, setInfoStaff] = useState(valuejson);
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedStatus, setSelectedStatus] = useState();
  const [success, setSuccess] = useState(false);
  const [successClass, setSuccessClass] = useState("");
  const [message, setMessage] = useState({});

  const getAllOrders = () => { };

  /**
   * Update product quantity;
   */
  const updateQty = (product) => {
    const index = products.indexOf(product);
    // console.log("index", index);
    // console.log("product", product);
    products[index] = product;
    setProducts(products);
    getTotal(products);
  };

  /*
   ** Get total order  **
   */
  useEffect(() => {
    getTotal(products);
  }, [products]);

  const getTotal = (productsData) => {
    let tempt = 0;
    // console.log("trang htai: ", productsData);
    for (let index = 0; index < productsData.length; index++) {
      if (productsData[index].status !== 'xoa') {
        let productPrice =
          productsData[index].Product.prod_price * productsData[index].qty;
        tempt = tempt + productPrice;

      }
    }
    setupdateTotal(tempt);
  };

  // Delete an order needs confirmation via popup;
  // 0: huy; 1: thanh toan; 2 - cap nhat;
  const [criteria, setCriteria] = useState("");
  const changeStatus = (status) => {
    setSelectedStatus(status);
  };
  useEffect(() => {
    if (selectedStatus == "huydon") {
      setCriteria(0);
    }
  }, [selectedStatus]);


  //update message when criteria changes and call updateOrder;
  useEffect(() => {
    console.log(criteria);
    let message = {};
    if (criteria === 0) {
      message = {
        noti: "Đơn hàng đã được xóa thành công",
        icon: "faCheckCircle"
      };
    } else if (criteria === 1) {
      message = {
        noti: "Đơn hàng đã được thanh toán thành công",
        icon: "faCheckCircle"
      };
    } else {
      message = {
        noti: "Đơn hàng đã được cập nhật thành công",
        icon: "faCheckCircle"
      };
    }
    updateOrder(message);
  }, [criteria]);

  // update order with id and criteria; See line 154!
  const updateOrder = async (message) => {
    const url = 'http://localhost:4000/api/order/update';
    await axios
      .post(url, {
        orderId: selectedOrderId,
        criteria: criteria,
      })
      .then((res) => {
        showModal(message);
        getTables(id);
      })
  }

  // Show a popup banner of confirmation for cancelling order;
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const confirmDeleteOrder = () => {
    setSuccess(true);
    setSuccessClass("opacity-success");
    const message = {
      noti: "Bạn có chắc muốn xóa đơn hàng này không?",
      icon: "faTrash"
    };
    setMessage(message);
    console.log(detailOrder.listpro[0].Order);
    setSelectedOrderId(detailOrder.listpro[0].Order);
  };

  const [pay, setPay] = useState(false);
  const setPayStatus = () => {
    setPay(!pay);
    setSuccessClass("");
  }
  const changeCriteria = (crit) => {
    setCriteria(1);
    // console.log(crit);
  }
  const showPaymentModal = () => {
    setPay(true);
    setSuccessClass("opacity-success");
  }

  // Modal;
  const showModal = (message) => {
    setSuccess(true);
    setSuccessClass("opacity-success");
    setMessage(message);
    setTimeout(() => {
      setSuccess(false);
      setSuccessClass("");
    }, 3000);
  };

  /** TEMPORARILY DISCONTINUED;
   * Discard any changes made previously;
   */
  // const discardQtyChanges = () => {
  //   // getOrderById();
  //   let message = {
  //     noti: "Các thay đổi đã được loại bỏ",
  //     icon: "faCheckCircle"
  //   };
  //   showModal(message);
  // };

  const style = {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: 0,
  };
  return (
    <>
      {
        success &&
        <Success
          setSuccess={setSuccess}
          setSuccessClass={setSuccessClass}
          message={message}
          functioner={changeStatus}
          style={style}
        />
      }
      {
        pay &&
        <OrderModal 
          style={style}
          functioner={setPayStatus}
          changeCriteria={changeCriteria}
          order={detailOrder.listpro[0]}
        />
      }
      <>
        {isLoading ? (
          <LoadingT />
        ) : (
          <Box sx={{ width: 1 }} className={successClass}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box
                sx={{
                  flexGrow: 1,
                  borderWidth: 2,
                  marginTop: 1,
                  borderRadius: 2
                }}
                gridColumn={show ? "span 6" : "span 10"}
              >
                {/* List Column */}
                {arrange === "column" ? (
                  numRow === 2 ? (
                    <div class="grid grid-rows-2 grid-flow-col gap-4">
                      {tables.map((table, index) => (
                        <Grid item key={index}>
                          {table.table ? (
                            <PersonSitting
                              table={table.table}
                              viewDetailTable={viewDetailTable}
                            ></PersonSitting>
                          ) : (
                            <Item
                              position="relative"
                              onClick={() => ChooseATable(table)}
                            >
                              <img
                                src="/images/table-blue.png"
                                className="img-fluid rounded-xl"
                                style={{
                                  position: "relative",
                                  width: "130px",
                                  height: "130px"
                                }}
                              />
                              <span
                                style={{ position: "absolute", color: "white" }}
                              >
                                {table.tbl_id}
                              </span>
                            </Item>
                          )}
                        </Grid>
                      ))}
                    </div>
                  ) : numRow === 3 ? (
                    <div class="grid grid-rows-3 grid-flow-col gap-4">
                      {tables.map((table, index) => (
                        <Grid item key={index}>
                          {table.table ? (
                            <PersonSitting
                              table={table.table}
                              viewDetailTable={viewDetailTable}
                            ></PersonSitting>
                          ) : (
                            <Item
                              position="relative"
                              onClick={() => ChooseATable(table)}
                            >
                              <img
                                src="/images/table-blue.png"
                                className="img-fluid rounded-xl"
                                style={{
                                  position: "relative",
                                  width: "130px",
                                  height: "130px"
                                }}
                              />
                              <span
                                style={{ position: "absolute", color: "white" }}
                              >
                                {table.tbl_id}
                              </span>
                            </Item>
                          )}
                        </Grid>
                      ))}
                    </div>
                  ) : numRow === 4 ? (
                    <div class="grid grid-rows-4 grid-flow-col gap-4">
                      {tables.map((table, index) => (
                        <Grid item key={index}>
                          {table.table ? (
                            <PersonSitting
                              table={table.table}
                              viewDetailTable={viewDetailTable}
                            ></PersonSitting>
                          ) : (
                            <Item
                              position="relative"
                              onClick={() => ChooseATable(table)}
                            >
                              <img
                                src="/images/table-blue.png"
                                className="img-fluid rounded-xl"
                                style={{
                                  position: "relative",
                                  width: "130px",
                                  height: "130px"
                                }}
                              />
                              <span
                                style={{ position: "absolute", color: "white" }}
                              >
                                {table.tbl_id}
                              </span>
                            </Item>
                          )}
                        </Grid>
                      ))}
                    </div>
                  ) : numRow === 5 ? (
                    <div class="grid grid-rows-5 grid-flow-col gap-4">
                      {tables.map((table, index) => (
                        <Grid item key={index}>
                          {table.table ? (
                            <PersonSitting
                              table={table.table}
                              viewDetailTable={viewDetailTable}
                            ></PersonSitting>
                          ) : (
                            <Item
                              position="relative"
                              onClick={() => ChooseATable(table)}
                            >
                              <img
                                src="/images/table-blue.png"
                                className="img-fluid rounded-xl"
                                style={{
                                  position: "relative",
                                  width: "130px",
                                  height: "130px"
                                }}
                              />
                              <span
                                style={{ position: "absolute", color: "white" }}
                              >
                                {table.tbl_id}
                              </span>
                            </Item>
                          )}
                        </Grid>
                      ))}
                    </div>
                  ) : (
                    <div class="grid grid-rows-6 grid-flow-col gap-4">
                      {tables.map((table, index) => (
                        <Grid item key={index}>
                          {table.table ? (
                            <PersonSitting
                              table={table.table}
                              viewDetailTable={viewDetailTable}
                            ></PersonSitting>
                          ) : (
                            <Item
                              position="relative"
                              onClick={() => ChooseATable(table)}
                            >
                              <img
                                src="/images/table-blue.png"
                                className="img-fluid rounded-xl"
                                style={{
                                  position: "relative",
                                  width: "130px",
                                  height: "130px"
                                }}
                              />
                              <span
                                style={{ position: "absolute", color: "white" }}
                              >
                                {table.tbl_id}
                              </span>
                            </Item>
                          )}
                        </Grid>
                      ))}
                    </div>
                  )
                ) : (
                  <Grid container spacing={2} direction="column">
                    <Grid item xs={12} container>
                      {tables.map((table, index) =>
                        numRow === 2 ? (
                          <Grid item xs={5} key={index}>
                            {table.table ? (
                              <PersonSitting
                                table={table.table}
                                viewDetailTable={viewDetailTable}
                              ></PersonSitting>
                            ) : (
                              <Item
                                position="relative"
                                onClick={() => ChooseATable(table)}
                              >
                                <img
                                  src="/images/table-blue.png"
                                  className="img-fluid rounded-xl"
                                  style={{
                                    position: "relative",
                                    width: "130px",
                                    height: "130px"
                                  }}
                                />
                                <span
                                  style={{ position: "absolute", color: "white" }}
                                >
                                  {table.tbl_id}
                                </span>
                                {/* {listTable &&
                      listTable.map((item, index) =>
                        item._id === table._id ? (
                          <SelectedTable key={index} />
                        ) : null
                      )} */}
                              </Item>
                            )}
                          </Grid>
                        ) : numRow === 3 ? (
                          <Grid item xs={4} key={index}>
                            {table.table ? (
                              <PersonSitting
                                table={table.table}
                                viewDetailTable={viewDetailTable}
                              ></PersonSitting>
                            ) : (
                              <Item
                                position="relative"
                                onClick={() => ChooseATable(table)}
                              >
                                <img
                                  src="/images/table-blue.png"
                                  className="img-fluid rounded-xl"
                                  style={{
                                    position: "relative",
                                    width: "130px",
                                    height: "130px"
                                  }}
                                />
                                <span
                                  style={{ position: "absolute", color: "white" }}
                                >
                                  {table.tbl_id}
                                </span>
                              </Item>
                            )}
                          </Grid>
                        ) : numRow === 4 ? (
                          <Grid item xs={3} key={index}>
                            {table.table ? (
                              <PersonSitting
                                table={table.table}
                                viewDetailTable={viewDetailTable}
                              ></PersonSitting>
                            ) : (
                              <Item
                                position="relative"
                                onClick={() => ChooseATable(table)}
                              >
                                <img
                                  src="/images/table-blue.png"
                                  className="img-fluid rounded-xl"
                                  style={{
                                    position: "relative",
                                    width: "130px",
                                    height: "130px"
                                  }}
                                />
                                <span
                                  style={{ position: "absolute", color: "white" }}
                                >
                                  {table.tbl_id}
                                </span>
                              </Item>
                            )}
                          </Grid>
                        ) : (
                          <Grid item xs={2} key={index} marginRight={2}>
                            {table.table ? (
                              <PersonSitting
                                table={table.table}
                                viewDetailTable={viewDetailTable}
                              ></PersonSitting>
                            ) : (
                              <Item
                                position="relative"
                                onClick={() => ChooseATable(table)}
                              >
                                <img
                                  src="/images/table-blue.png"
                                  className="img-fluid rounded-xl"
                                  style={{
                                    position: "relative",
                                    width: "130px",
                                    height: "130px"
                                  }}
                                />
                                <span
                                  style={{ position: "absolute", color: "white" }}
                                >
                                  {table.tbl_id}
                                </span>
                              </Item>
                            )}
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Grid>
                )}
              </Box>
              {show && isLDO ? (
                <Box gridColumn="span 6">
                  <Box className=" order-container order-right-content">
                    {/* {isLDO ? ( */}
                    <ReviewOrderInfo
                      user={detailOrder.tabledetail.order.user}
                      restaurant={detailOrder.tabledetail.order.restaurant}
                      table={detailOrder.tabledetail.table}
                    />
                    {/* ) : null} */}
                    <Typography
                      variant="h4"
                      sx={{ fontSize: "25px", fontWeight: "bold" }}
                    >
                      CHI TIẾT GỌI MÓN
                    </Typography>

                    <table>
                      <tr style={{ borderRadius: "10px 10px 0 0" }}>
                        <td>STT</td>
                        <td>Món</td>
                        <td>Ảnh</td>
                        <td>Số lượng</td>
                        <td>Đơn giá</td>
                        <td style={{ width: "100px" }}>Tổng</td>
                        <td> Trạng thái </td>
                        <td> Thao tác </td>
                      </tr>
                      {isLDO &&
                        products.map((product, index) => (
                          <OrderDetail
                            // stt={products.indexOf(product) + 1}
                            stt={index + 1}
                            key={index}
                            item={product}
                            updateQty={updateQty}
                            infoStaff={infoStaff}
                          />
                        ))}
                      <tr>
                        <td colspan="5"> Tổng hóa đơn:</td>
                        <td>{VND.format(updateTotal)}</td>
                        {/* <td>{VND.format(selectedOrder.total.total)}</td>
                          {infoStaff.role === "2" ? null : <td> </td>} */}
                      </tr>
                    </table>
                    <div className="flex p-3">
                      <h4 className="text-lg font-bold">*Ghi chú :</h4>
                      <h4 className="text-lg pl-4"> {detailOrder.tabledetail.order.note}</h4>
                    </div>
                    <div className="order-actions">
                      <div className="content">
                        <button className="updateButton" onClick={() => setCriteria(2)}>
                          Cập nhật yêu cầu
                        </button>
                        <button
                          className="updateButton"
                        // onClick={discardQtyChanges}
                        >
                          Hoàn tác
                        </button>
                        <button className="updateButton" onClick={() => {
                          setSelectedOrderId(detailOrder.listpro[0].Order)
                          // setCriteria(1)
                          showPaymentModal()
                        }
                        }>
                          Thanh toán
                        </button>
                        <button onClick={confirmDeleteOrder}>Hủy đơn</button>
                      </div>
                    </div>
                  </Box>

                </Box>
              ) : null}
            </Box>
          </Box>
        )}
      </>
    </>
  );
};

export default OutLine;
