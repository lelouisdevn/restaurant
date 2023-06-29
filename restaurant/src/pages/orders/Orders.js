import "./orders.css";
import { useState, useEffect } from "react";
import axios from "axios";
import OrderProductTile from "./OrderProductTile";
import Loading from "../products/Loading";
import OrderInfo from "./OrderInfo";
import OrderItem from "./OrderItem";
import Success from "../products/Success";
import { useParams } from "react-router-dom";
import VND from "../../components/currency";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  const { id, name } = useParams();

  const [products, setProducts] = useState("");
  const [criteria, setCriteria] = useState("true");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [isOrdered, setTt] = useState(false);
  const [reloadOrderDetail, setReloadOrderDetail] = useState(false);
  const [total, setTotal] = useState(0);
  const [note, setNote] = useState("");

  /**
   * Pop-up banner;
   */
  const [success, setSuccess] = useState(false);
  const [successClass, setSuccessClass] = useState("");
  const [message, setMessage] = useState({});

  /**
   * User, Restaurant and Table IDs;
   */
  const [user, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});

  /**
   * Fetch product data from server;
   */
  //Lấy infoRestaurant trên localStorage dạng object
  const json = localStorage.getItem("infoRestaurant");
  const valuejson = JSON.parse(json);
  const [idRestaurant, setidRestaurant] = useState(valuejson);
  //Lấy infoRestaurant trên localStorage dạng object
  const jsonStaff = localStorage.getItem("infoStaff");
  const valuejsonStaff = JSON.parse(jsonStaff);
  // const [idRestaurant, setidRestaurant] = useState(valuejson);

  const getProducts = async () => {
    console.log("nah hanf : ", valuejson._id);
    console.log("criteria : ", criteria);
    const url = `http://localhost:4000/api/products`;
    // const restaurantId = localStorage.getItem("RestaurantID");
    await axios
      .post(url, {
        restaurantId: valuejson._id,
        status: criteria
      })
      .then((res) => {
        console.log(res?.data.document);
        setProducts(res?.data.document);
      });
  };

  /**
   * Update a list of selected products;
   */
  const updateOrderList = (product) => {
    if (selectedProducts.find((prod) => prod._id === product._id)) {
      setSelectedProducts(
        selectedProducts.filter((p) => p._id !== product._id)
      );
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
    setReloadOrderDetail(!reloadOrderDetail);
  };
  /**
   * Update product quantity;
   */
  const updateQty = (product) => {
    const prod = selectedProducts.indexOf(product);
    selectedProducts[prod] = product;
    console.log("than phan nam tron update qty: ", selectedProducts);
    setSelectedProducts(selectedProducts);
    setReloadOrderDetail(!reloadOrderDetail);
  };

  /**
   * Remove all selected products;
   */
  const discardAll = () => {
    setSelectedProducts([]);
    setTt(!isOrdered);
  };

  /**
   * Calculate the total payment when selected products or product quantity changes;
   */
  useEffect(() => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += parseInt(product.qty) * parseInt(product.prod_price);
    });
    setTotal(total);
  }, [reloadOrderDetail]);

  /**
   *
   */
  useEffect(() => {
    getProducts();
  }, [selectedProducts]);

  /**
   * Get User Informatioin with Id;
   */
  const getUserInfoById = async () => {
    const userId = localStorage.getItem("UserID");
    const getUserInfo = `http://localhost:4000/api/users/id=${idRestaurant._id}/idUser=${userId}`;
    const response = await axios.get(getUserInfo);

    if (response.status == 200) {
      setUser(response.data.user[0]);
      // console.log(response.data.user[0]);
    }
  };

  /**
   * Get Restaurant Information with Id:
   */
  const getRestaurantById = async () => {
    const getRestaurantInfo = `http://localhost:4000/api/info/id=${idRestaurant._id}`;
    const response = await axios.get(getRestaurantInfo);

    if (response.status == 200) {
      setRestaurant(response.data.info[0]);
    }
  };

  /**When the page is loaded; get user info and restaurant info*/
  useEffect(() => {
    getUserInfoById();
    getRestaurantById();
  }, []);

  /**
   * Silent! and OrderDetail;
   */
  const handleOrder = () => {
    console.log("khong can ghep ban", pairing);
    if (selectedProducts.length > 0) {
      let total = 0;
      selectedProducts.forEach((product) => {
        total += parseInt(product.qty) * parseInt(product.prod_price);
      });
      order(total);
    } else {
      const message = {
        noti: "Vui lòng chọn sản phẩm trước khi nhấn đặt món",
        icon: "faClose"
      };
      showModal(message);
    }
  };

  /*
  * Table Pairing
  */
  const [tablePairing, setTablePairing] = useState();
  const handleOrderPairing = async () => {
    console.log("pairing: ", pairing);
    await axios
      .get(`http://localhost:4000/api/test/table/id=${pairing}/status=1`)
      .then(async (res) => {
        const temp = res?.data.testTbl2;
        setTablePairing(temp);
        const ltableP = [id, pairing];
        let total = 0;
        if (temp === null) {
          // console.log("ban 2 khong ton tai");
          // Lấy tổng hóa đơn
          let total = 0;
          selectedProducts.forEach((product) => {
            total += parseInt(product.qty) * parseInt(product.prod_price);
          });
          //Tạo order mới
          const order_url = "http://localhost:4000/api/order/new";
          // const recent = new Date().toLocaleString("vi-VN", { hour12: false });
          const recent = new Date().toISOString();
          await axios
            .post(order_url, {
              order_at: recent,
              total: total,
              user: user._id,
              note: note ? note : "",
              restaurant: restaurant._id
            })
            .then(async (res) => {
              const order_id = res?.data.order._id;
              setOrderId(order_id);
              setTt(!isOrdered);
              ltableP.forEach(async (t) => {
                await axios
                  .post(`http://localhost:4000/api/tabledetail`, {
                    table: t,
                    order: order_id
                  })
                  .then((res) => {
                    const temp = res?.data;
                    //  console.log("them chi tiet ban: ", temp);
                  });
              });
            });
        } else {
          // console.log("ban 2 ton tai", ltableP);
          // Lấy tổng hóa đơn
          selectedProducts.forEach((product) => {
            total += parseInt(product.qty) * parseInt(product.prod_price);
          });
          total += temp.order.total;
          console.log("sum p: ", total);

          //lấy order theo bàn số 2 để cập nhật total
          await axios
            .put(
              `http://localhost:4000/api/order=${temp.order._id}/total/update`
            )
            .then((res) => {
              console.log("cạp nhat ok ");
            });
          await axios
            .post(`http://localhost:4000/api/tabledetail`, {
              table: id,
              order: temp.order._id
            })
            .then((res) => {
              const temp = res?.data;
              //  console.log("them chi tiet ban: ", temp);
            });
          
          const order_detail_url = "http://localhost:4000/api/order/detail/new";
          selectedProducts.forEach(async (product) => {
            await axios
              .post(order_detail_url, {
                Product: product._id,
                Order: temp.order._id,
                qty: product.qty,
                unit_price: product.prod_price
              })
              .then((res) => {
                const message = {
                  noti: "Thông tin đặt món đã được ghi nhận thành công",
                  icon: "faCheck"
                };
                showModal(message);
          setRedirect("/staff/outline");

              });
          });
        }
      });
  };

  const order = async (total) => {
    const order_url = "http://localhost:4000/api/order/new";
    // const recent = new Date().toLocaleString("vi-VN", { hour12: false });
    const recent = new Date().toISOString();
    console.log(recent)
    await axios
      .post(order_url, {
        order_at: recent,
        total: total,
        user: user._id,
        note: note ? note : "",
        restaurant: restaurant._id
      })
      .then(async (res) => {
        const order_id = res?.data.order._id;
        setOrderId(order_id);
        setTt(!isOrdered);
        await axios
          .post(`http://localhost:4000/api/tabledetail`, {
            table: id,
            order: order_id
          })
          .then((res) => {
            const temp = res?.data;
            //  console.log("them chi tiet ban: ", temp);
          });
      });
  };

  const [redirect, setRedirect] = useState("");
  const orderDetail = async () => {
    const order_detail_url = "http://localhost:4000/api/order/detail/new";
    selectedProducts.forEach(async (product) => {
      await axios
        .post(order_detail_url, {
          Product: product._id,
          Order: orderId,
          qty: product.qty,
          unit_price: product.prod_price
        })
        .then((res) => {
          const message = {
            noti: "Thông tin đặt món đã được ghi nhận thành công",
            icon: "faCheck"
          };
          showModal(message);
          setRedirect("/staff/outline");
        });
    });
    // });
  };
  /**
   * Add order details when OrderId is created;
   */
  useEffect(() => {
    orderDetail();
    setSelectedProducts([]);
  }, [orderId]);

  /**
   * Show modal;
   */
  const showModal = (message) => {
    setSuccess(true);
    setSuccessClass("opacity-success");
    setMessage(message);
    setTimeout(() => {
      setSuccess(false);
      setSuccessClass("");
      navigate("/staff/outline");
    }, 3000);
  };

  useEffect(() => {
    console.log(note);
  }, [note]);

  //show element to choice table
  const [showE, setShowE] = useState(false);
  const [tableBL, settableBL] = useState([]);
  const [pairing, setPairing] = useState("");
  const showElement = async () => {
    await axios
      .get(`http://localhost:4000/api/table/${id}/lobby&table`)
      .then((res) => {
        const temp = res?.data.table;
        settableBL(temp);
        console.log("lay dc ban", temp);
      })
      .finally(() => {
        setShowE(true);
      });
  };

  /**
   * HTML template for main order page;
   */
  return (
    <>
      {success && (
        <Success
          redirect={redirect}
          setSuccess={setSuccess}
          setSuccessClass={setSuccessClass}
          message={message}
        />
      )}
      <div className={`order-container ${successClass}`}>
        <div className="order-left">
          <div className="order-left-content">
            {products ? (
              products.map((product) => (
                <OrderProductTile
                  product={product}
                  key={product._id}
                  functioner={updateOrderList}
                  isOrdered={isOrdered}
                />
              ))
            ) : (
              <Loading message="Đang tải dữ liệu từ server...." />
            )}
          </div>
        </div>
        <div className="order-right">
          <div className="order-right-content">
            <OrderInfo
              user={valuejsonStaff}
              restaurant={valuejson}
              nameTable={name}
            />

            {/* Display when selected products are not empty; */}
            {selectedProducts.length > 0 && (
              <>
                <h3 style={{ fontSize: "20px", margin: "10px 0" }}>
                  YÊU CẦU ĐẶT MÓN
                </h3>
                <table>
                  <tr style={{ borderRadius: "10px 10px 0 0" }}>
                    <td>STT</td>
                    <td>Món</td>
                    <td>Số lượng</td>
                    <td>Đơn giá</td>
                    <td style={{ width: "100px" }}>Tổng</td>
                  </tr>
                  {selectedProducts.map((product) => (
                    <OrderItem
                      key={product._id}
                      stt={selectedProducts.indexOf(product) + 1}
                      selectedProduct={product}
                      functioner={updateQty}
                    />
                  ))}
                  <tr>
                    <td colspan="4">Tổng:</td>
                    <td>{VND.format(total)}</td>
                  </tr>
                </table>
                <div className="order-txtarea">
                  <div>Ghi chú:</div>
                  <textarea
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>
                {showE ? (
                  <div>
                    <label> Chọn bàn cần ghép: </label>
                    <select
                      className="slbtn w-[150px]"
                      onChange={(e) => setPairing(e.target.value)}
                    >
                      <option>---Chọn bàn---</option>
                      {tableBL.map((table, index) => (
                        <option
                          key={index}
                          value={table._id}
                          className="text-center"
                        >
                          {table.tbl_id}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                <div className="order-actions">
                  <div className="content">
                    <button
                      className="updateButton"
                      onClick={
                        pairing === "" ? handleOrder : handleOrderPairing
                      }
                    >
                      Đặt món
                    </button>
                    <button className="updateButton" onClick={showElement}>
                      Ghép bàn
                    </button>
                    <button className="" onClick={discardAll}>
                      Bỏ chọn tất cả
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
