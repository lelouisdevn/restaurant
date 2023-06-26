import React,  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DS_Detail from './ds_detail';

function DS_Order() {
    const navigate = useNavigate();
    const id = localStorage.getItem("RestaurantID");
    console.log(id);
    const [table, setTable] = useState([]);
    const [lobbies, setLobbies] = useState([]);

    useEffect(() => {
        getLobbies(id);
        console.log("lobbies: ", lobbies);
      }, [id]);
    // useEffect (()=>{
    //     console.log(lobbies);
    //     getTables(lobbies[0]._id);
    // },[lobbies]);
    //lay all ban khi co id khu vuc
    const getTables = async (id) => {
                    await axios
                        .get(`http://localhost:4000/api/lobby/${id}/detailtable/status=1`)
                        .then((res) => {
                            const temp = res?.data.sit;
                            console.log(lobbies[0]);
                            console.log("Ban theo khu vuc: ", temp);
                            setTable(temp);
                        })
                        .catch((error) => {
                            console.log("Error: ", error);
                        })
        
    
      };
    //lay khu vuc khi có id rest
    
    const getLobbies = async (id) => {
        //console.log(id);
        await axios
          .get(`http://localhost:4000/api/all/lobbies/restaurant=${id}`)
          .then((res) => {
            const temp = res?.data.lobbies;
            console.log("templobbies: ", temp); 
            setLobbies(temp);
            
          })
          .catch((error) => {
            console.log("Error: ", error);
            //setErr(error);
          });
      };
      //xem chi tiet order
      const [detailOrder, setDetailOrder] = useState();
      const [products, setProducts] = useState([]);
      const viewDetailTable = async (props) => {
        // console.log("ok: ", props);
        
        if (props.status) {
          await axios
            .get(`http://localhost:4000/api/table=${props.table}/orderdetail`)
            .then((res) => {
              const temp = res?.data.detailOrder[0];
              console.log("detailOrder: ", temp);
              setDetailOrder(temp);
              setProducts(temp.listpro);
            })
        }
      };

    return (
        <table className='table-auto bg-indigo-900 rounded p-5 m-5'>
            <tbody className="static ">
                <tr className="container flex flex-wrap" style={{position: "relattive"}}>
                    {lobbies.length > 0 && (lobbies).map((row,index)=>(
                        <DS_Detail lobby={row}/>
                        // <div>{row._id}</div>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}

export default DS_Order;