import React, { useEffect, useState } from "react";
import "./orders.css";
import axios from "axios";
const ReviewOrderInfo = (props) => {
//   console.log("resOreserinfo", props.restaurant);
//   console.log("resOreUserinfo", props.user);
  const [infoRes, setInfoRes] = useState([]);
  const [infoUser, setInfoUser] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getInfoRes(props.restaurant, props.user);
  }, [props.restaurant, props.user]);

  const getInfoRes = async (idRes, idInfo) => {
    await axios
      .get(`http://localhost:4000/api/info/id=${idRes}`)
      .then(async (res) => {
        const temp = res?.data.info;
        setInfoRes(temp);
        console.log("thong tin nha hang ", temp);
        await axios
          .get(`http://localhost:4000/api/user/id=${idInfo}`)
          .then((res) => {
            const temp = res?.data.user;
            setInfoUser(temp);
            console.log("thong tin nhan vien ", temp);
          });
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  return (
    <>
      {isLoading ? null : (
        <div className="restInfo">
          <div>{infoRes[0].rest_name}</div>
          <div className="orderInfo">
            <table>
              <tr>
                <td>Địa chỉ:</td>
                <td>{infoRes[0].rest_addr}</td>
              </tr>
              <tr>
                <td>Số điện thoại:</td>
                <td>{infoRes[0].rest_phone}</td>
              </tr>
              <tr>
                <td>Bàn</td>
                <td>{props.table}</td>
              </tr>
              {/* <tr>
                    <td>Nhân viên:</td>
                    <td>Ngô Trần Vĩnh Thái</td>
                </tr>
                <tr>
                    <td>Ngày:</td>
                    <td>{new Date().toLocaleString("vi-VN", {hour12: false})}</td>
                </tr>
                <tr>
                    <td>Bàn</td>
                    <td>12</td>
                </tr>
                 */}
              <tr>
                <td>Nhân viên:</td>
                <td>{infoUser[0].staff_name}</td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewOrderInfo;
