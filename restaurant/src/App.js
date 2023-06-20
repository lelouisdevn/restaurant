
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Lobby from './pages/lobby/Lobby';
import ProductDetail from './pages/products/ProductDetail';
import ProductList from './pages/products/ProductList';
import Layout from './components/Layout';

import Info from "./pages/info_restaurant/Info";
import User from "./pages/manage_user/User";
import UserList from "./pages/manage_user/UserList";
import UserDetail from "./pages/manage_user/UserDetail";
import UserBase from "./pages/manage_user/UserBase";
import UserAdd from './pages/manage_user/UserAdd';
import InfoEdit from './pages/info_restaurant/InfoEdit';
import ProductForm from './pages/products/ProductForm'
import Category from './pages/categories/Category'
import CategoryDetail from './pages/categories/CategoryDetail';
import NavbarStaff from './components/NavbarStaff';
import CategoryForm from './pages/categories/CategoryForm';
// import CategoryProducts from './pages/products/CategoryProducts';
import Orders from './pages/orders/Orders';
import LayoutStaff from './components/LayoutStaff';
import LoadingT from './pages/outline/Loading'
import LayoutOutline from './pages/outline/LayoutOutline';
import OutLine from './pages/outline/OutLine'
import SettingMap from "./pages/lobby/SettingMap";
import OrderList from './pages/orders/manage/OrderList';
import SetUpPage from './pages/settuppage/setUpPage';
import SelectRest from './pages/settuppage/selectRest';
import CreateRest from './pages/settuppage/CreateRest';
import Rest from './pages/login/Rest';
import ManageOrderList from './pages/orders/manage/ManageOrderList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />}></Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path='/setting-up/*' element={<SetUpPage />} >
            <Route path='select' element={<SelectRest />} />
            <Route path='restaurant/new' element={<CreateRest />} />
          </Route>

          
          <Route path="/login/*" element={<Login />}>
          </Route>
          <Route path="rest" element={<Rest/>}/>
          <Route path="/manage/*" element={<Layout />}>
            
            <Route path="home">
              <Route index element={<Home />} />
            </Route>
            <Route path="lobby">
              <Route index element={<Lobby />} />
              <Route
                path="settingmap/:id/:name/:num"
                element={<SettingMap />}
              ></Route>{" "}
            </Route>
            <Route path="product">
              <Route index element={<ProductList />} />
              <Route path=":id" element={<ProductDetail />} />
              <Route path="new" element={<ProductForm />} />
              <Route path="all/category/:id" element={<ProductList />} />
            </Route>
            <Route path='orders'>
              <Route index element={<ManageOrderList />} />
            </Route>
            <Route path="category">
              <Route index element={<Category />} />
              <Route path=":id" element={<CategoryDetail />} />
              <Route path="new" element={<CategoryForm />} />
            </Route>
            <Route path="user" element={<User />}>
              <Route index element={<UserList />}/>
              <Route path=":idUser" element={<UserDetail />} />
              <Route path="add" element={<UserAdd />}></Route>
            </Route>
            <Route path="info">
              <Route index element={<Info />} />
              <Route path="edit/:id" element={<InfoEdit />}></Route>
            </Route>
          </Route>

          <Route path="/staff/*" element={<NavbarStaff />}>
            {/* <Route path="orders" element={<LoadingT />} /> */}
            {/* <Route path="orders" element={<Orders />} />  */}
            <Route path="order/table/:id/:name" element={<Orders />} /> 
            <Route path='orders/all' element={<OrderList />} /> 
            <Route path="outline" element={<LayoutOutline />}>
              <Route path="" element={<LoadingT />}></Route>
              {/* <Route
                path=":id/:arrange/:numRow"
                element={<OutLine />}
              /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
