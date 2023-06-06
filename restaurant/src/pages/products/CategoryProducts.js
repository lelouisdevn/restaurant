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
    const [url, setUrl] = useState({
        "add": "/manage/product/new",
        "hide": "product/hide"
      })
    const [isSorted, setSort] = useState("false");

    const getProducts = async () => {
        const url = `http://localhost:4000/api/products/category/${id}/${criteria}`;
        const restaurantId = localStorage.getItem("RestaurantID");
        await axios
            .post(url, {
                restaurant: restaurantId,
            })
            .then((res) => {
                console.log(res?.data.products);
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

    useEffect(() => {
        getProducts();
    }, [id]);

    /** Sort product*/
    const sortAZ = () => {
        const sortedProducts = products.sort((a, b) => {
            if (a.prod_name < b.prod_name) {
                return -1;
            } else if (a.prod_name > b.prod_name) {
                return 1;
            }
            return 0;
        });
        setProducts(sortedProducts);
        setSort("sortaz");
    }
    const sortZA = () => {
        const sortedProducts = products.sort((a, b) => {
            if (a.prod_name < b.prod_name) {
                return 1;
            } else if (a.prod_name > b.prod_name) {
                return -1;
            }
            return 0;
        });
        setProducts(sortedProducts);
        setSort("sortza");
    }
    const sort = () => {
        // sortAZ();
        if (isSorted === "sortaz") {
            sortZA();
        } else {
            sortAZ();
        }
    }

    return (
        <>

            <div className='detail-container'>
                <div className='fixed-header'>
                    <div className="title">
                        <Link to="/manage/product" className="fLink">
                            <h2>QUẢN LÝ SẢN PHẨM</h2>
                        </Link>
                    </div>
                    <Toolbar url={url} sort={sort} sortType={isSorted} />
                </div>
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