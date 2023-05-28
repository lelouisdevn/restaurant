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
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const getCategoryById = async () => {
        const fetchDataURL = `http://localhost:4000/api/category/${id}`;
        await axios
            .get(fetchDataURL)
            .then((res) => {
                setCategory(res?.data.category[0]);
            })
    };
    useEffect(() => {
        getCategoryById()
    }, []);
    const updateCategory = async () => {
        const updateURL = `http://localhost:4000/api/category/update/${id}`;
        await axios
            .put(updateURL, {
                category_name: name ? name : category.category_name,
                category_img: image ? image : category.category_img,
            });
        getCategoryById();
    }
    return (
        <>

            {
                status ?
                    <div className='img-container'>
                        <img className='fullScreenImage' src={category.category_img} />
                        <div onClick={(e) => setStatus(!status)}>
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>
                    :
                    <div className='detail-container'>
                        <div className='fixed-header'>
                            <div className="title">
                                <Link to="/manage/category" className="fLink">
                                    <h2>QUẢN LÝ DANH MỤC SẢN PHẨM</h2>
                                </Link>
                            </div>
                            <Toolbar url="/manage/category/new" />
                        </div>
                        {/* <Outlet /> */}
                        <div className="content">
                            <div className="header-product n_right_content" style={{ width: "100%" }}>
                                <Link to="/manage/category" className="fLink">
                                    <FontAwesomeIcon icon={faList} />
                                    <span> Danh mục</span>
                                </Link>

                                <Link to={`/manage/product/all/category/${category._id}`} className="fLink">
                                    <span>/{category.category_name}</span>
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
                                                defaultValue={category.category_name}
                                                onChange={(e) => setName(e.target.value)}
                                            ></input>
                                        </div>
                                        <div>
                                            <label>Đường dẫn hình ảnh:</label>
                                            <input
                                                defaultValue={category.category_img}
                                                onChange={(e) => setImage(e.target.value)}
                                            ></input>
                                        </div>
                                        <div>
                                            <button
                                                className='updateButton'
                                                onClick={updateCategory}
                                            >Lưu các thay đổi</button>
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