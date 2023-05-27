import { Link, Outlet } from "react-router-dom";
import Toolbar from "../products/Toolbar";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryTile from './CategoryTile'
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../products/Loading";

function Category() {
    // const categories = [
    //     { '_id': '2b4cbrb7yrshb', 'cate_name': 'food', 'category_img': 'https://media.istockphoto.com/id/477338550/vector/fast-food-cartoon-set.jpg?s=170667a&w=0&k=20&c=r-ZAh_cU7Fue1KJI34kUSfe-5SuHlLywuxfXv1MrdqM=' },
    //     { '_id': '2b4098b7yrshb', 'cate_name': 'drink', 'category_img': 'https://bakewithshivesh.com/wp-content/uploads/2022/04/IMG_9331-scaled.jpg' }
    // ]
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
        <div >
            <div className="title">
                <Link to="/manage/category" className="fLink">
                    <h2>QUẢN LÝ DANH MỤC SẢN PHẨM</h2>
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
                </div>
                <div className="products">
                    {categories ? categories.map((category) => (
                        <CategoryTile key={category._id} category={category} />
                    )) : <Loading message="fetching your data...." />}
                </div>
            </div>
        </div>
    );
}

export default Category;