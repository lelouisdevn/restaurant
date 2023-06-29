import React, { useEffect, useState } from 'react';
import axios from "axios";
function Get_Table(props) {
    const HOST = 'http://localhost:4000/api';

    const [detailOrder, setDetailTable] = useState();

    const viewDetailTable = async (id) => {

        await axios
            .get(`http://localhost:4000/api/order=${id}/orderdetail`)
            .then((res) => {
                const temp = res?.data.tabledetail;
                //console.log("tabledetail: ", res?.data.tabledetail);
                setDetailTable(temp);
            })

    };
    useEffect(() => {
        viewDetailTable(props.orderid);
    }, [props.orderid]);
    return (
        <>
            {detailOrder != undefined ?  (detailOrder).map((row,index)=>(
                <div>{row.table.tbl_id}</div>
            )): null }
        </>
    );
}
export default Get_Table;