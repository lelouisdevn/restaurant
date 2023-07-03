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

function BarChartPro({ restaurant, aspect, title, type, getMY , getMW, select}) {
  const [gettype, setType] = useState(type);
  const [dataD, setDataD] = useState([]);
  const [dataW, setDataW] = useState([]);
  const [dataM, setDataM] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [dataMS, setDataMS] = useState([]);
  const [dataWS, setDataWS] = useState([]);
  console.log("type: ", gettype);
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
  const getDataSelectM = async (data) => {
    
    console.log("selectedMonth: ", data);
    try {
      
      await axios
        .post(
          `http://localhost:4000/api/bill/profit/select/bymonth/idRes=${restaurant._id}`,{
            dataSelect: data.Tháng       }
        )
        .then((res) => {
          const temp = res?.data.statistical;
          console.log("data barchart month Select: ", temp);
          setDataMS(temp);
        });
    } catch (error) {
       console.log("Error: ", error);
    }
  }
  
  // Lấy thống kê theo tuần đã chọn
  const getDataSelectW = async (data) => {
    
    console.log("selectedWeek: ", data);
    try {
       await axios
        .post(
          `http://localhost:4000/api/bill/profit/select/currentweek/idRes=${restaurant._id}`,{
            dataSelect: data      }
        )
        .then((res) => {
          const temp = res?.data.arrT;
          console.log("data barchart week  Select: ", temp);
          setDataWS(temp);
        });
    } catch (error) {
       console.log("Error: ", error);
    }
  }
  
    const handleBarClickW = (data, index) => {
      setSelectedWeek(index);
      console.log(" data: ", data)
      console.log(" thư tu : ", index)
      getDataSelectW(data);
      getMW({ data: data });
  };
    const handleBarClickM = (data, index) => {
      setSelectedMonth(index);
      console.log(" data: ", data)
      console.log(" thư tu : ", index)
      getDataSelectM(data);
      getMY({ data: data });
  };
  useEffect(() => {
    setType(type);
  }, [type]);

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
 
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#C70039"];
  // const CustomYAxisTick = ({ x, y, payload }) => (
  //   <text x={x} y={y} dy={50} textAnchor="end" fill="#666">
  //     {numeral(payload.value).format("0,0")} VND
  //   </text>
  // );
  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text x={x} y={y} dy={16} fontSize={12} textAnchor="end" fill="#666">
        {numeral(payload.value).format("0,0")} VND
      </text>
    );
  };
  return (
    <>
      {gettype === "1" ? (
        <div className="barchart bg-white">
          <ResponsiveContainer width="100%" aspect={aspect}>
            <BarChart
              width={500}
              height={300}
              data={select === undefined ? dataD : dataWS}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Thứ" />
              <YAxis  />
              {/* <YAxis tick={<CustomYAxisTick />} fill="#8884d8" /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Số lượng" stackId="a" fill={colors[3]} />
              <Bar
                dataKey="Doanh thu"
                stackId="a"
                fill={colors[0]}
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
              data={select === undefined ? dataW : dataMS}
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
              <Bar dataKey="Số ngày của tuần" stackId="a" fill={colors[0]} />
              <Bar dataKey="Số lượng hóa đơn" stackId="a" fill={colors[1]} />
              <Bar
                dataKey="Doanh thu"
                stackId="a"
                fill={colors[2]}
                formatter={(value) => `${numeral(value).format("0,0")} VND`}
                onClick={handleBarClickW}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : gettype === "3" ? (
        // Thống kê theo năm
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
              {/* <XAxis dataKey="Tháng" /> */}
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Số lượng hóa đơn" stackId="a" fill={colors[0]} />
              <Bar
                dataKey="Doanh thu"
                stackId="a"
                fill={colors[1]}
                formatter={(value) => `${numeral(value).format("0,0")} VND`}
                onClick={handleBarClickM}
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