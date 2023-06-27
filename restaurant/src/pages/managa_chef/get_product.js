import React, { useEffect, useState } from 'react';
import axios from "axios";
function Get_Product(props) {
    const HOST = 'http://localhost:4000/api';
    const [pro, setPro] = useState([]);
    
    const getProductById = async (id) => {
        const fetchDataURL = `http://localhost:4000/api/product/${id}`;
        await axios
          .get(fetchDataURL)
          .then((res) => {
            // setProduct(res?.data.document);
            // console.log(res?.data.document);
            setPro(res?.data.document[0])
            
          })
      }
    useEffect(() => {
        getProductById(props.proid);
    }, [props.proid]);
    return(
        <>
        {pro.prod_name}
        </>
    );
}
export default Get_Product;