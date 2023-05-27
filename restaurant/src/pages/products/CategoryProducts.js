import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Outlet, useParams } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import './this.css';
import ProductTile from './ProductTitle';
import Toolbar from './Toolbar';
import axios from 'axios';
import { useState } from 'react';
import Loading from './Loading';
const CategoryProducts = () => {
    const {id} = useParams();
    console.log(id)
    const [products, setProducts] = useState("");
    const [name, setCateName] = useState("");
    const getProducts = async () => {
        const url = `http://localhost:4000/api/products/category/${id}`;
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
    }, []);
    // console.log(products);

    return (
        <>

            <div >
                <div className="title">
                    <Link to="/manage/product" className="fLink">
                        <h2>QUẢN LÝ SẢN PHẨM</h2>
                    </Link>
                </div>
                <Toolbar url="/manage/product/new" />
                <Outlet />
                <div className="content">
                    <div className="header-product">
                        <Link to="/manage/product" className="fLink">
                            <FontAwesomeIcon icon={faHome} />
                            <span> Sản phẩm</span>
                        </Link>
                        <Link to={`/manage/product/all/category/${id}`}>
                            <span>/{name}</span>
                        </Link>
                    </div>
                    <div className="products">
                        {products ? products.map((product) => (
                            <ProductTile key={product._id} product={product} />
                        )) : <Loading message="fetching your data...." />}
                    </div>
                </div>
            </div>


        </>
    );
}

export default CategoryProducts;