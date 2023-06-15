import { useState } from 'react';
import './setup.css';

import { Outlet } from 'react-router-dom';
const SetUpPage = () => {
    return (
        <div className='setup-container'>
            <div className='setup-box'>
                <div className='setup-content'>
                    <div className='logo'>
                        <img src='/images/logoo.png' />
                        <div>Trinity</div>
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