import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import numeral from "numeral";

function BarChartPro({ restaurant, aspect, title, type, getMY }) {
  const [gettype, setType] = useState(type);
  const [dataD, setDataD] = useState([]);
  const [dataW, setDataW] = useState([]);
  const [dataM, setDataM] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [dataMS, setDataMS] = useState([]);
  // console.log("type: ", gettype);
   useEffect(() => {
     (async () => {
       await axios
         .get(
           `http://localhost:4000/api/bill/profit/currentweek/idRes=${restaurant._id}`
         )
         .then((res) => {
           const temp = res?.data.arrT;
          //  console.log("data barchart current week: ", temp);
           setDataD(temp);
         });
     })();
   }, [restaurant._id]);
  
   useEffect(() => {
     (async () => {
       await axios
         .get(
           `http://localhost:4000/api/bill/profit/bymonth/idRes=${restaurant._id}`
         )
         .then((res) => {
           const temp = res?.data.statistical;
           console.log("data barchart: ", temp);
           setDataW(temp);
         });
     })();
   }, [restaurant._id]);
  
  // Lấy thống kê theo tháng đã chọn
  const getDataSelect = async (data) => {
    
    console.log("selectedMonth: ", data);
    try {
      
      console.log("truy cap");
      await axios
        .post(
          `http://localhost:4000/api/bill/profit/select/bymonth/idRes=${restaurant._id}`,{
            dataSelect: data.Tháng       }
        )
        .then((res) => {
          const temp = res?.data.statistical;
          console.log("data barchart month Select: ", temp);
          setDataMS(temp);
          setType("4");
        });
    } catch (error) {
       console.log("Error: ", error);
    }
  }
  
    const handleBarClick = (data, index) => {
      setSelectedMonth(index);
      console.log(" data: ", data)
      console.log(" thư tu : ", index)
      getDataSelect(data);
      getMY({ data: data });
  };
  useEffect(() => {
    setType(type);
  },[type])
    //  useEffect(() => {
  //    (async () => {
  //  }, [restaurant._id]);
  
   useEffect(() => {
     (async () => {
       await axios
         .get(
           `http://localhost:4000/api/bill/profit/byyear/idRes=${restaurant._id}`
         )
         .then((res) => {
           const temp = res?.data.arrS;
           console.log("data barcharty: ", temp);
           setDataM(temp);
         });
     })();
   }, [restaurant._id]);

  return (
    <>
      {gettype === "1" ? (
        <div className="barchart bg-white">
          <ResponsiveContainer width="100%" aspect={aspect}>
            <BarChart
              width={500}
              height={300}
              data={dataD}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Thứ" />
              <YAxis />
              {/* <YAxis tick={<CustomYAxisTick />} /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Số lượng" fill="#8884d8" />
              <Bar
                dataKey="Doanh thu"
                fill="#82ca9d"
                formatter={(value) => `${numeral(value).format("0,0")} VND`}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : type === "2" ? (
        <div className="barchart bg-white">
          <ResponsiveContainer width="100%" aspect={aspect}>
            <BarChart
              width={500}
              height={300}
              data={dataW}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Tuần" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Số ngày của tuần" fill="#7AB1E7" />
              <Bar dataKey="Số lượng hóa đơn" fill="#8884d8" />
              <Bar
                dataKey="Doanh thu"
                fill="#82ca9d"
                formatter={(value) => `${numeral(value).format("0,0")} VND`}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : gettype === "3" ? (
        <div className="barchart bg-white">
          <ResponsiveContainer width="100%" aspect={aspect}>
            <BarChart
              width={500}
              height={300}
              data={dataM}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Tháng" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Số lượng hóa đơn" fill="#8884d8" />
              <Bar
                dataKey="Doanh thu"
                fill="#82ca9d"
                formatter={(value) => `${numeral(value).format("0,0")} VND`}
                onClick={handleBarClick}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : gettype === "4" ? (
        <div className="barchart bg-white">
          <ResponsiveContainer width="100%" aspect={aspect}>
            <BarChart
              width={500}
              height={300}
              data={dataMS}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Tuần" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Số ngày của tuần" fill="#7AB1E7" />
              <Bar dataKey="Số lượng hóa đơn" fill="#8884d8" />
              <Bar
                dataKey="Doanh thu"
                fill="#82ca9d"
                formatter={(value) => `${numeral(value).format("0,0")} VND`}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div>Không có dữ liệu hiển thị </div>
      )}
    </>
  );
}

export default BarChartPro