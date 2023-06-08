import { useState } from 'react';
import './setup.css';

import { Outlet } from 'react-router-dom';
const SetUpPage = () => {
    return (
        <div className='setup-container'>
            <div className='setup-box'>
                <div className='setup-content'>
                    <div className='logo'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Firefox_brand_logo%2C_2019.svg/2048px-Firefox_brand_logo%2C_2019.svg.png' />
                        <div>Tuyen Thu Thai</div>
                    </div>

                    {/* CONTENT */}
                    <Outlet />
                    {/* CONTENT */}
                </div>
            </div>
        </div>
    );
}

export default SetUpPage;