import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Toolbar from "./Toolbar";
import './layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <div className="left">
        <div>SIDEBAR</div>
      </div>
      <div className="right">
        <div className="title">
          <Link to="/" className="fLink">
            <h2>PRODUCTS MANAGEMENT</h2>
          </Link>
        </div>
        <Toolbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout