import { Link, Outlet } from "react-router-dom";
import Toolbar from "../products/Toolbar";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryTile from './CategoryTile'
function Category() {
    const categories = [
        { '_id': '2b4cbrb7yrshb', 'cate_name': 'food', 'category_img': 'https://media.istockphoto.com/id/477338550/vector/fast-food-cartoon-set.jpg?s=170667a&w=0&k=20&c=r-ZAh_cU7Fue1KJI34kUSfe-5SuHlLywuxfXv1MrdqM=' },
        { '_id': '2b4098b7yrshb', 'cate_name': 'drink', 'category_img': 'https://bakewithshivesh.com/wp-content/uploads/2022/04/IMG_9331-scaled.jpg' }
    ]
    return (
        <div >
            <div className="title">
                <Link to="/manage/category" className="fLink">
                    <h2>CATEGORY MANAGEMENT</h2>
                </Link>
            </div>
            <Toolbar />
            <Outlet />
            <div className="content">
                <div className="header-product">
                    <Link to="/manage/category" className="fLink">
                        <FontAwesomeIcon icon={faList} />
                        <span> Category</span>
                    </Link>
                </div>
                <div className="products">
                    {categories.map((category) => (
                        <CategoryTile key={category._id} category={category} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;