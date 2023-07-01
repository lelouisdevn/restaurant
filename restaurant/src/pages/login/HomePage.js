import { Link, useNavigate } from 'react-router-dom';
import './homepage.css'
import { Outlet } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth } from '@fortawesome/free-solid-svg-icons';
const HomePage = () => {
    const [login, setLogin] = useState(false);
    // const 
    return(
        <>
            <div className="hp-ctn">
                <div className="hp-nvb">
                    <div className='hp-nvb-ls' style={{width: "20%"}}>
                        <div style={{position: "relative", width: "100%", height: "100%"}}>
                            <img src='/images/logoo.png'/>
                        </div>
                    </div>
                    <div className='hp-nvb-ls'>
                        <div className='hp-nvb-cent'>Trinity&trade;</div>
                    </div>
                    <div className='hp-nvb-ls'>
                        <div>Giải pháp</div>
                        <div>Gói tài khoản</div>
                        <div>Nâng cấp</div>
                    </div>
                    <div className='hp-nvb-rs'>
                        <div>EN | VN</div>
                        <FontAwesomeIcon icon={faEarth} />
                    </div>
                </div>
                <div className="hp-ct" style={{background: "whitesmoke", color: "black"}}>
                        {/* <Outlet /> */}
                        <Login isClicked={login} />
                    {/* <div style={{position: "absolute", top: "50%", transform: "translateY(-50%)"}}>
                        <div>Giải pháp cung cấp phần mềm quản lý nhà hàng cho thuê</div>
                        <div style={{fontSize: "20px"}}>Trải nghiệm ngay hôm nay!</div>
                        <div>
                            <button className='updateButton' onClick={() => {
                                // navigate("/login")
                                window.location.href = '/login';
                            }}>Đăng nhập</button>
                            <button className='normal'>Đăng ký</button>
                        </div>
                    </div> */}
                </div>
                <div className="hp-nvb">
                    <div className='hp-nvb-cent' style={{fontSize: "15px", color: "white", height: "30px", lineHeight: "30px", margin: "30px 0 -40px 0"}}>Trinity</div>
                    <div className='hp-nvb-cent' style={{color: 'white', fontSize: "25px"}}>
                        <div className='hp-nvb-ls'>
                            Đặng Thị Thanh Tuyền
                        </div>
                        <div className='hp-nvb-ls' style={{width: "34%"}}>
                            Võ Thị Quỳnh Thư
                        </div>
                        <div className='hp-nvb-ls'>
                            Ngô Trần Vĩnh Thái
                        </div>
                    </div>
                    {/* <div className='hp-nvb-ls' style={{position: "static"}}>
                        <div className='btm-fm'>
                            <div>Nhập email nhận tin:</div>
                            <input placeholder='Nhập email' />
                            <button className='updateButton'>Gửi yêu cầu</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default HomePage;