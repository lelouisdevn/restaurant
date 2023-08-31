import { useEffect, useState } from 'react';
import './setup.css';

import { Outlet, useNavigate } from 'react-router-dom';
const SetUpPage = () => {
    const style = {
    }
    const [float, setFloat] = useState("logo-ani-prev");
    useEffect(() => {
        setTimeout(() => {
            setFloat("logo-ani")
        }, 1000);
    }, []);
    const navigator = useNavigate();
    const HOST = "/localhost:3000/";
    const goToMain = () => {
        navigator(HOST);
    }
    return (
        <>
            <div style={style}>
                <div className={`logo ${float}`} style={{margin: 0}}>
                    <img src='/images/logoo.png' onClick={goToMain} />
                </div>
            </div>
            <div className='setup-container'>
                <div className='setup-box'>
                    <div className='setup-content'>
                        <div className='logo'>
                            {/* <img src='/images/logoo.png' /> */}
                            <img style={{opacity: 0}} />
                            <div>Trinity</div>
                        </div>

                        {/* CONTENT */}
                        <Outlet />
                        {/* CONTENT */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SetUpPage;