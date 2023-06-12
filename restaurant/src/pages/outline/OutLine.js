import {
  Box,
  Button,
  Grid,
  Modal,
  Typography,
  styled,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Outline.scss";
import "../orders/orders.css";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from "./Item";
import PersonSitting from "./PersonSitting";
import LoadingT from "./Loading";
import ReviewOrderInfo from "../orders/ReviewOrderInfo";
import OrderDetail from "../orders/manage/OrderDetail";
import VND from "../../components/currency";
import CancelIcon from "@mui/icons-material/Cancel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Success from "../products/Success";
import OrderModal from "../orders/OrderModal";
const styleModal = {
  top: "50%",
  left: "50%",
  width: 400,
  bgcolor: "white",
  borderRadius: 5,
  boxShadow: 24,
  borderWidth: 0,
  p: 4
};
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const OutLine = ({ id, arrange, numRow }) => {
  // const { id, arrange, numRow } = useParams();
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [detailOrder, setDetailOrder] = useState();
  const [show, setShow] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isLDO, setisLDO] = useState(false);
  const [isLNote, setisLNote] = useState(false);
  const [openIF, setOpenIF] = useState(false);
  const [updateTotal, setupdateTotal] = useState(0);
  const [updateNote, setUpdateNote] = useState(null);
  
  const json = localStorage.getItem("infoStaff");
  const valuejson = JSON.parse(json);
  const [infoStaff, setInfoStaff] = useState(valuejson);

  useEffect(() => {
    getTables(id);
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

  const ChooseATable = (table) => {
    navigate(`/staff/order/table/${table._id}/${table.tbl_id}`);
  };

  const viewDetailTable = async (props) => {
    // console.log("ok: ", props);
    setShow(props.status);
    if (props.status) {
      await axios
        .get(`http://localhost:4000/api/table=${props.table}/orderdetail`)
        .then((res) => {
          const temp = res?.data.detailOrder[0];
          console.log("detailOrder: ", temp);
          setDetailOrder(temp);
          setProducts(temp.listpro);
        })
        .finally(() => {
          setisLDO(true);
        });
    }
  };
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedStatus, setSelectedStatus] = useState();
  const [success, setSuccess] = useState(false);
  const [successClass, setSuccessClass] = useState("");
  const [message, setMessage] = useState({});

  /**
   * Update product quantity;
   */
  const updateQty = (product) => {
    const index = products.indexOf(product);
    // console.log("index", index);
    console.log("product", product);
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
      if (productsData[index].status !== "xoa") {
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
    if (criteria !== 100) {
      await axios
        .post(url, {
          orderId: selectedOrderId,
          criteria: criteria,
        })
        .then((res) => {
          showModal(message);
          getTables(id);
          setCriteria(100); //set criteria === 100 for paying bills without reloading page;
        })
    }
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

  const updateOrderRes = async () => {
    setOpenE(false);
    setOpenIF(false);

    //Cập nhật ghi chú 
    if (updateNote !== null) {
      detailOrder.tabledetail[0].order["note"] = updateNote;
      setDetailOrder(detailOrder);
      setisLNote(true);
      await axios.put('http://localhost:4000/api/order/note/update', {
        id: detailOrder.tabledetail[0].order._id,
        note: updateNote,
      }).then((res) => {
        console.log("ok update note success");
      });
    }

    // Cập nhật số lượng sản phẩm
    await axios.put('http://localhost:4000/api/order/product/update', {
      lproducts: products
    }).then((res) => {
      console.log("ok update product");
    });
   
  };

  // Pay order;
  const payOrder = () => { };

  // Cancel the dish
  const [itemDish, setItemDish] = useState();
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const handleCancel = (props) => {
    console.log("hủy : ", props);
    setOpen(props.isShow);
    setItemDish(props.item);
  };

  const cancelDish = async (item) => {
    console.log("id order: ", item);
    const index = products.indexOf(item);
    item["status"] = "xoa";
    products[index] = item;
    setProducts(products);
    getTotal(products);
    await axios
      .put(`http://localhost:4000/api/orderdetail/update=${item._id}/cancel`)
      .then((res) => {
        const temp = res?.data;
        setOpen(false);
      });
  }
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
                // </Grid>
              )}
              </Box>
              {show && isLDO ? (
                <Box gridColumn="span 6">
                  <Box className=" order-container order-right-content">
                    <ReviewOrderInfo
                      user={detailOrder.tabledetail[0].order.user}
                      restaurant={detailOrder.tabledetail[0].order.restaurant}
                      table={detailOrder.tabledetail}
                    // table={detailOrder.tabledetail.table}
                    />
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
                            stt={index + 1}
                            key={index}
                            item={product}
                            updateQty={updateQty}
                            infoStaff={infoStaff}
                            handleCancel={handleCancel}
                          />
                        ))}
                      <tr>
                        <td colspan="5"> Tổng hóa đơn:</td>
                        <td>{VND.format(updateTotal)}</td>
                        {/* <td>{VND.format(selectedOrder.total.total)}</td>
                          {infoStaff.role === "2" ? null : <td> </td>} */}
                      </tr>
                    </table>
                    <Box mt="8px" sx={{ flexGrow: 1, display: "flex" }}>
                      <Grid container spacing={2} columns={12}>
                        <Grid item xs={3}>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            *Ghi chú:
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Box sx={{ marginTop: "3px" }}>
                            <Typography variant="p">
                              {isLNote
                                ? detailOrder.tabledetail[0].order.note
                                : detailOrder.tabledetail[0].order.note}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={2}>
                          <EditNoteIcon
                            sx={{ fontSize: "28px" }}
                            onClick={() => setOpenIF(true)}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Mở text để cập nhật note */}
                    {openIF ? (
                      <Box mt="8px" sx={{ flexGrow: 1, display: "flex" }}>
                        <Grid container spacing={2} columns={12}>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={7}>
                            <Box sx={{ marginTop: "3px" }}>
                              <TextField
                                sx={{ display: "flex" }}
                                id="outlined-multiline-static"
                                multiline
                                rows={3}
                                defaultValue={detailOrder.tabledetail[0].order.note}
                                onChange={(e) => setUpdateNote(e.target.value)}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={2}></Grid>
                        </Grid>
                      </Box>
                    ) : null}

                    <div className="order-actions mt-3">
                      <div className="content">
                        <button className="updateButton" onClick={() => setOpenE(true)}>
                          Cập nhật yêu cầu
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

          {/* Modal xóa theo từng sản phẩm */}
          <StyledModal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>
              <Box className="flex items-center justify-center mb-2">
                <CancelIcon sx={{ fontSize: 80, color: "orange" }} />
              </Box>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Xác nhận xóa mục này?
              </Typography>
              <Box ml={20}>
                <Button onClick={() => cancelDish(itemDish)}>
                  <Typography variant="h6">Đồng ý</Typography>
                </Button>
                <Button onClick={() => setOpen(false)}>
                  <Typography variant="h6">Hủy</Typography>
                </Button>
              </Box>
            </Box>
          </StyledModal>

          {/* Modal thực hiện chỉnh sửa  */}
          <StyledModal
            open={openE}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>
              <Box className="flex items-center justify-center mb-2">
                <CancelIcon sx={{ fontSize: 80, color: "orange" }} />
              </Box>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Xác nhận chỉnh sửa mục này?
              </Typography>
              <Box ml={20}>
                <Button
                  onClick={updateOrder}
                >
                  <Typography variant="h6">Đồng ý</Typography>
                </Button>
                <Button onClick={() => setOpenE(false)}>
                  <Typography variant="h6">Hủy</Typography>
                </Button>
              </Box>
            </Box>
          </StyledModal>
        
        </>
      </>
    );
  };
export default OutLine;
