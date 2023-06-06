import { Link, Outlet } from "react-router-dom";
import Toolbar from "../products/Toolbar";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryTile from './CategoryTile'
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../products/Loading";

function Category() {
    const [url, setUrl] = useState({
        "add": "/manage/category/new",
        "hide": "product/hide"
      })
    const [categories, setCate] = useState("");
    const getCategories = async () => {
        const url = 'http://localhost:4000/api/categories'
        await axios
            .get(url)
            .then((res) => {
                console.log(res?.data.categories)
                setCate(res?.data.categories);
            })
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div className="detail-container">
            <div className="fixed-header">
            <div className="title">
                <Link to="/manage/category" className="fLink">
                    <h2>QUẢN LÝ DANH MỤC SẢN PHẨM</h2>
                </Link>
            </div>
            {/* <Toolbar url="/manage/category/new"/> */}
            <Toolbar url={url} />
            </div>
            {/* <Outlet /> */}
            <div className="content">
                <div className="header-product n_right_content" style={{width: "100%"}}>
                    <Link to="/manage/category" className="fLink">
                        <FontAwesomeIcon icon={faList} />
                        <span> Danh mục</span>
                    </Link>
                </div>
                <div className="products">
                    {categories ? categories.map((category) => (
                        <CategoryTile key={category._id} category={category} />
                    )) : <Loading message="Đang tải dữ liệu từ server...." />}
                </div>
            </div>
        </div>
    );
}

export default Category;