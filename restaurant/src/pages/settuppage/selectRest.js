import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Loading from "../products/Loading";
import '../products/this.css';
import axios from "axios";
const SelectRest = () => {
    const navigator = useNavigate();
    const navigate = useNavigate();


    /**
     * INTERNAL LOGIC starts below:
     */

    const id = localStorage.getItem("UserID");
    const [rest, setRest] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        getRest(id);
    }, [id]);
    const createRest = () => {
        if (rest.length >= 3) {
            alert("Your account cannot add more than 3 restaurants!");
        } else {
            navigator("/setting-up/restaurant/new");
        }
    }

    const goToAccount = () => {
        navigator('/trinity/account');
    }

    const getRest = async (id) => {
        await axios
            .get(`http://localhost:4000/api/getallrestfromone/id=${id}`)
            .then((res) => {
                const temp = res?.data.rest;
                setRest(temp);
                //console.log(temp);
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
            .finally(() => {
                setisLoading(false);
            });

    }
    const [isSelected, setisSelected] = useState(false);
    const handleRestClick = async (row) => {
        localStorage.setItem("RestaurantID", row.info._id);
        localStorage.setItem(
            "infoRestaurant",
            JSON.stringify(row.info)
        );
        setisSelected(true);
        setTimeout(() => {
            navigate("/manage/home");
        }, 1500);
    }




    /**
     * HTML template;
    */
    return (
        <>
            {isSelected ?
                <>
                    <Loading message={"Đang tải xuống dữ liệu..."} />
                    <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}>
                        <div>Trinity &copy; copyright 2023</div>
                    </div>
                </>
                : <>
                    <div>
                        Vui lòng chọn 1 nhà hàng để bắt đầu!
                    </div>
                    <div className='main-content'>
                        {
                            isLoading ? null : rest.map((row) => (
                                <div onClick={(e) => handleRestClick(row)} type="button">{row.info.rest_name}</div>
                                // <div><button onClick={(e)=>handleRestClick(row.info._id)} type="button">{row.info.rest_name}</button></div>
                            ))
                        }
                    </div>
                    <div className='footer'>
                        <div onClick={createRest}>
                            <FontAwesomeIcon icon={faGear} />
                            <> Thêm nhà hàng khác</>
                        </div>
                        <div onClick={goToAccount}>
                            Đi đến: <> </>
                            <FontAwesomeIcon icon={faUserCircle} />
                            <> Trinity Account</>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default SelectRest;
