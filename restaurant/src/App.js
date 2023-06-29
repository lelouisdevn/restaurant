
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Lobby from './pages/lobby/Lobby';
import ProductDetail from './pages/products/ProductDetail';
import ProductList from './pages/products/ProductList';
import Layout from './components/Layout';
import Temp from './components/Temp';

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
import LayoutChef from './pages/chef/LayoutChef';
import SettingMap from "./pages/lobby/SettingMap";
import OrderList from './pages/orders/manage/OrderList';
import SetUpPage from './pages/settuppage/setUpPage';
import SelectRest from './pages/settuppage/selectRest';
import CreateRest from './pages/settuppage/CreateRest';
import ProtectedManage from './components/protectedManage'
import ProtectedChef from './components/protectedChef';
import ProtectedCashier from './components/protectedCashier';
import ProtectedOrder from './components/protectedOrder';
import Rest from './pages/login/Rest';
import { useNavigate } from "react-router-dom";
import ManageOrderList from './pages/orders/manage/ManageOrderList';

import Bep from './pages/managa_chef/bep';
import DS_Order from './pages/managa_chef/ds_order';




function App() {

  const json = localStorage.getItem("infoRestaurant");
  const valuejson = JSON.parse(json);
  const [infoRestaurant, setInfoRestaurant] = useState(valuejson);

  const json1 = localStorage.getItem("infoStaff");
  const valuejson1 = JSON.parse(json1);
  const [infoStaff, setInfoStaff] = useState(valuejson1);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/login" replace />}></Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path='/setting-up/*' element={
            <ProtectedManage
              redirectPath="/login"
              isAllowed={
                infoStaff
              } > <SetUpPage />
            </ProtectedManage>
          }>
            <Route index path='select' element={<SelectRest />} />
            <Route path='restaurant/new' element={<CreateRest />} />
          </Route>

          <Route path="/manage/*" element={<Layout />} >
            <Route index path="home" element={
              <ProtectedManage
                redirectPath="/login"
                isAllowed={
                  infoStaff
                } > <Home />
              </ProtectedManage>
            }>
              {/* <Route index element={<Home />} /> */}
            </Route>
            <Route path="lobby" element={
              <ProtectedManage
                redirectPath="/login"
                isAllowed={
                  infoStaff
                } > <Temp />
              </ProtectedManage>
            
            }>
              <Route index element={<Lobby />} />
              <Route
                path="settingmap/:id/:name/:num"
                element={<SettingMap />}
              ></Route>{" "}
            </Route>
            <Route path="product" element={
              <ProtectedManage
                redirectPath="/login"
                isAllowed={
                  infoStaff
                } > <Temp />
              </ProtectedManage>
            }>
              <Route index element={<ProductList />} />
              <Route path=":id" element={<ProductDetail />} />
              <Route path="new" element={<ProductForm />} />
              <Route path="all/category/:id" element={<ProductList />} />
            </Route>
            <Route path='orders' element={
            <ProtectedCashier
              redirectPath="/login"
              isAllowed={
                infoStaff
              } > <ManageOrderList />
            </ProtectedCashier>
            }>
              {/* <Route index element={<ManageOrderList />} /> */}
            </Route>
            <Route path="category" element={
              <ProtectedManage
                redirectPath="/login"
                isAllowed={
                  infoStaff
                } > <Temp />
              </ProtectedManage>
            }>
              <Route index element={<Category />} />
              <Route path=":id" element={<CategoryDetail />} />
              <Route path="new" element={<CategoryForm />} />
            </Route>
            <Route path="user" element={
              <ProtectedManage
                redirectPath="/login"
                isAllowed={
                  infoStaff
                } > <User />
              </ProtectedManage>
            }>
              <Route index element={<UserList />} />
              <Route path=":idUser" element={<UserDetail />} />
              <Route path="add" element={<UserAdd />}></Route>
            </Route>
            <Route path="chef" element={
            <ProtectedChef
              redirectPath="/login"
              isAllowed={
                infoStaff
              } >  <LayoutChef />
            </ProtectedChef>
            }>
            </Route>

            <Route path="info/*" element={
              <ProtectedManage
                redirectPath="/login"
                isAllowed={
                  infoStaff
                } > <Temp />
              </ProtectedManage>
            }>
            {/* <Route path="info"> */}
              <Route index element={<Info />} />
              <Route path='edit/:id' element={<InfoEdit />} />
            </Route>
            
            <Route path='bep/*' element={
            <ProtectedChef
              redirectPath="/login"
              isAllowed={
                infoStaff
              } > <Bep/>
            </ProtectedChef>
            }>
              <Route index path='order' element={<DS_Order/>}></Route>
            </Route>
          </Route>

          <Route path="/staff/*" element={
              <ProtectedOrder
                redirectPath="/login"
                isAllowed={
                  infoStaff
                } > <NavbarStaff />
              </ProtectedOrder>
            }>
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
