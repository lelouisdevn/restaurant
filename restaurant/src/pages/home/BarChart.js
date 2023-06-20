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

function BarChartPro({ restaurant, aspect, title , type}) {
    console.log("dvvavadv:", restaurant._id);
    const [dataW, setDataW] = useState([]);
    const [dataM, setDataM] = useState([]);
    
   useEffect(() => {
     (async () => {
       await axios
         .get(
           `http://localhost:4000/api/bill/profit/byweek/idRes=${restaurant._id}`
         )
         .then((res) => {
           const temp = res?.data.arrT;
           console.log("data barchart: ", temp);
           setDataW(temp);
         });
     })();
   }, [restaurant._id]);
   useEffect(() => {
     (async () => {
       await axios
         .get(
           `http://localhost:4000/api/bill/profit/bymonthed/idRes=${restaurant._id}`
         )
         .then((res) => {
           const temp = res?.data.arr;
           console.log("data barchart: ", temp);
           setDataM(temp);
         });
     })();
   }, [restaurant._id]);

  return (
  <>
      {type === "1" ? (
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
          <XAxis dataKey="Tháng" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Số lượng" fill="#8884d8" />
          <Bar dataKey="Doanh thu" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
      
      ): (
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
          <Bar dataKey="Số lượng" fill="#8884d8" />
          <Bar dataKey="Doanh thu" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>

      )}
  </>
  );
}

export default BarChartPro