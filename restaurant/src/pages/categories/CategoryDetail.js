import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import { faList } from "@fortawesome/free-solid-svg-icons";
import Toolbar from '../products/Toolbar';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ProductImage from '../products/ProductImage';
import '../products/this.css'
import axios from 'axios'
const CategoryDetail = () => {
    const { id } = useParams();
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState(false);

    const getCategoryById = async () => {
        const fetchDataURL = `http://localhost:4000/api/category/${id}`;
        await axios
            .get(fetchDataURL)
            .then((res)=>{
                // console.log(res?.data.category)
                setCategory(res?.data.category[0]);
            })
    };
    useEffect(()=>{
        getCategoryById()
    }, []);
    
    return (
        <>

            {
                status &&
                <div className='img-container'>
                    <img className='fullScreenImage' src={category.category_img} />
                    <div onClick={(e) => setStatus(!status)}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
            }
            {!status &&
                <div className='detail-container'>
                    <div className="title">
                        <Link to="/manage/category" className="fLink">
                            <h2>QUẢN LÝ DANH MỤC</h2>
                        </Link>
                    </div>
                    <Toolbar />
                    <Outlet />
                    <div className="content">
                        <div className="header-product">
                            <Link to="/manage/category" className="fLink">
                                <FontAwesomeIcon icon={faList} />
                                <span> Danh mục</span>
                            </Link>
                            /
                            <Link to="/products/foods" className="fLink">
                                <span>{category.category_name}</span>
                            </Link>
                        </div>
                        <div className="product-content">
                            <div className="n_left">
                                <div>
                                    <ProductImage img={category.category_img} />
                                </div>
                                <div>
                                    <button className='updateButton' onClick={(e) => setStatus(!status)}>
                                        Toàn màn hình
                                    </button>
                                </div>
                            </div>
                            <div className="n_right">
                                <div className='n_right_content'>
                                    <div>
                                        <label>Tên danh mục:</label>
                                        <input
                                            value={category.category_name}
                                        ></input>
                                    </div>
                                    <div>
                                        <label>Đường dẫn hình ảnh:</label>
                                        <input value={category.category_img}></input>
                                    </div>
                                    <div>
                                        <button className='updateButton'>Lưu các thay đổi</button>
                                        <button>Xóa danh mục</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default CategoryDetail;