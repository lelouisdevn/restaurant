import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import './this.css';
import ProductTile from './ProductTile';
import Toolbar from './Toolbar';
import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';
const CategoryProducts = () => {
    const { id } = useParams();
    console.log(id)
    const [products, setProducts] = useState("");
    const [name, setCateName] = useState("");
    const [criteria, setCriteria] = useState(0);
    const [type, setType] = useState(
        [
          'Tất cả sản phẩm',
          'Sản phẩm đang bán',
          'Sản phẩm đã ẩn'
        ]
      );
    const getProducts = async () => {
        const url = `http://localhost:4000/api/products/category/${id}/${criteria}`;
        await axios
            .get(url)
            .then((res) => {
                setProducts(res?.data.products)
            })
    }
    const getCategory = async () => {
        const url = `http://localhost:4000/api/category/${id}`;
        await axios
            .get(url)
            .then((res) => {
                setCateName(res?.data.category[0].category_name);
            })
    }
    useEffect(() => {
        getProducts();
        getCategory();
    }, [criteria]);
    // console.log(products);

    return (
        <>

            <div className='detail-container'>
                <div className='fixed-header'>
                    <div className="title">
                        <Link to="/manage/product" className="fLink">
                            <h2>QUẢN LÝ SẢN PHẨM</h2>
                        </Link>
                    </div>
                    <Toolbar url="/manage/product/new" />
                </div>
                {/* <Outlet /> */}
                <div className="content">
                    <div className="header-product n_right_content" style={{ width: "100%" }}>
                        <div className='left-menu'>
                            <Link to="/manage/product" className="fLink">
                                <FontAwesomeIcon icon={faHome} />
                                <span> Sản phẩm</span>
                                <span>/{name}</span>
                                <span>/{type[criteria]}</span>
                            </Link>
                        </div>
                        <div className='right-menu '>
                            <select>
                                <option disabled selected>Bộ lọc</option>
                                <option value={2} onClick={(e) => setCriteria(e.target.value)}>
                                    Sản phẩm đã ẩn
                                </option>
                                <option value={1} onClick={(e) => setCriteria(e.target.value)}>
                                    Sản phẩm đang bán</option>
                                <option value={0} onClick={(e) => setCriteria(e.target.value)}>
                                    Tất cả sản phẩm</option>
                            </select>
                        </div>
                    </div>
                    <div className="products">
                        {products ? products.map((product) => (
                            <ProductTile key={product._id} product={product} />
                        )) : <Loading message="Đang tải các sản phẩm...." />}
                    </div>
                </div>
            </div>


        </>
    );
}

export default CategoryProducts;