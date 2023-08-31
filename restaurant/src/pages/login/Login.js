import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import '../settuppage/setup.css';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBuilding, faClose, faComputer, faEarth, faEarthAsia, faPaperPlane, faPen, faPlusCircle, faShare, faSolarPanel, faSun, faUserAstronaut, faUserFriends } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [restaurant, setRestaurant] = useState("sagarestaurant@rest.vn");

  const [PorT, setPorT] = useState(true);
  const [UserID, setUserID] = useState([]);
  const [RestaurantID, setRestaurantID] = useState([]);

  // useEffect (()=>{
  //   if(localStorage.getItem("UserID") !== undefined){
  //     localStorage.clear();
  //   }
  // },[]);
  console.log("link ne: ", localStorage.getItem('currentUrl'));
  const [float, setFloat] = useState("");
  const signUp = () => {
    const signUpURL = "/business/sign-up";
    navigate(signUpURL);
    // window.location.href = signUpURL;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      await axios
        .post("http://localhost:4000/api/login", {
          username: username,
          password: password
        })
        .then(async (res) => {
          setFloat("logo-ani-prev");
          let tempInfoRestaurant;
          localStorage.setItem("UserID", res?.data.login[0]._id);
          console.log(res?.data.login[0]);

          if (res?.data.login[0].role === "1") {
            const tempInfoStaff = res?.data.login[0];
            localStorage.setItem("infoStaff", JSON.stringify(tempInfoStaff));
            //navigate("/setting-up/select");
            window.location.href = '/setting-up/select';
          } else if (res?.data.login[0].role === "2") {
            const tempInfoStaff = res?.data.login[0];
            localStorage.setItem("infoStaff", JSON.stringify(tempInfoStaff));

            await axios
              .get(
                `http://localhost:4000/api/restaurant/byuser=${tempInfoStaff._id}`
              )
              .then((res) => {
                const tempInfoRestaurant = res?.data.infores;
                console.log(tempInfoRestaurant);
                localStorage.setItem(
                  "infoRestaurant",
                  JSON.stringify(tempInfoRestaurant)
                );
              });
            //navigate("/staff/outline");
            window.location.href = '/staff/outline';
          } else if (res?.data.login[0].role === "3") {
            const tempInfoStaff = res?.data.login[0];
            //console.log(tempInfoStaff);
            localStorage.setItem("infoStaff", JSON.stringify(tempInfoStaff));

            await axios
              .get(
                `http://localhost:4000/api/restaurant/byuser=${tempInfoStaff._id}`
              )
              .then((res) => {
                const tempInfoRestaurant = res?.data.infores;
                localStorage.setItem("RestaurantID", tempInfoRestaurant._id)
                console.log(tempInfoRestaurant);
                localStorage.setItem(
                  "infoRestaurant",
                  JSON.stringify(tempInfoRestaurant)
                );
              });
            //navigate("/manage/chef");
            window.location.href = '/manage/bep/order';
          } else if (res?.data.login[0].role === "4") {
            const tempInfoStaff = res?.data.login[0];
            //console.log(tempInfoStaff);
            localStorage.setItem("infoStaff", JSON.stringify(tempInfoStaff));

            await axios
              .get(
                `http://localhost:4000/api/restaurant/byuser=${tempInfoStaff._id}`
              )
              .then((res) => {
                const tempInfoRestaurant = res?.data.infores;
                localStorage.setItem("RestaurantID", tempInfoRestaurant._id)
                console.log(tempInfoRestaurant);
                localStorage.setItem(
                  "infoRestaurant",
                  JSON.stringify(tempInfoRestaurant)
                );
              });
            //navigate("/manage/orders");
            window.location.href = '/manage/orders';
          }
        });
    } catch (error) {
      console.log("Error: ", error);
      toast.error("🦄 Nhập sai thông tin!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 2500);
    }
  };
  const [isLoginButtonClicked, setLoginStatus] = useState(props.isClicked);
  return (
    <>
      <div>
        <div className={`logo ${float}`} style={{ margin: 0, display: "none" }}>
          <img src='/images/logoo.png' />
        </div>
      </div>
      <section className="h-screen">
        <div className="h-full" style={{ height: "calc(100vh - 150px)" }}>
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <div style={{margin: "7px 15px"}}>
                <div style={{ fontSize: "30px" }}>Giải pháp cung cấp phần mềm quản lý nhà hàng</div>
                <div style={{ fontSize: "20px", margin: "10px" }}>Trải nghiệm ngay hôm nay!</div>
                {/* <div>
                  <button className='updateButton' onClick={() => {
                    // navigate("/login")
                    // window.location.href = '/login';
                    setLoginStatus(true);
                  }}>Đăng nhập</button>
                  <button className='normal' onClick={() => signUp()}>Đăng ký</button>
                </div> */}
                <div className="footer" style={{ textAlign: "center", margin: "0 auto", width: "80%" }}>
                  <div onClick={() => {
                    setLoginStatus(true);
                  }}>
                    <Link>
                      <FontAwesomeIcon icon={faPlusCircle} />
                      <> Đăng nhập</>
                    </Link>
                  </div>
                  <div>
                    <Link>
                      <FontAwesomeIcon icon={faPen} />
                      <> Đăng ký</>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {isLoginButtonClicked ?
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <form onSubmit={handleLogin} className="login-form-container">
                <FontAwesomeIcon icon={faClose} style={{ position: "absolute", top: "10px", right: "10px", fontSize: "15px", color: "black" }}
                      onClick={() => {
                        setLoginStatus(false);
                      }}
                    />
                  <div>
                    <div className="login-form-title">
                      <span>Đăng nhập</span>
                      <br/><span style={{fontSize: "25px"}}>với tên đăng nhập và mật khẩu</span>
                    </div>
                    <div className="footer login-form">
                      <div>
                        <input placeholder="Tên đăng nhập:..."
                        id="username" 
                        type="username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        required
                        />
                      </div>
                      <div>
                        <input placeholder="Mật khẩu:..." 
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <button style={{marginLeft: "0", padding: "0", width: "100%", height: "100%"}}>
                        <FontAwesomeIcon icon={faPaperPlane} style={{color: "blue", fontSize: "20px"}} />
                        {/* dn */}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {/* <form onSubmit={handleLogin}>
                  <div className="w-full sm:w-2/3 lg:2/3 px-6 bg-blue-600 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4  rounded-lg" style={{ background: "whitesmoke", border: "solid 1px lightgrey", filter: "drop-shadow(1px 1px 6px lightgrey)" }}>
                    <FontAwesomeIcon icon={faClose} style={{ position: "absolute", top: "10px", right: "10px", fontSize: "15px", color: "black" }}
                      onClick={() => {
                        setLoginStatus(false);
                      }}
                    />
                    <div className="w-full flex justify-center text-[#fff] text-3xl font-bold mb:2 md:mb-5" style={{ color: "black" }}>
                      Đăng nhập
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-black text-left"
                      >
                        Tên đăng nhập
                      </label>
                      <input
                        type="username"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-black text-left"
                      >
                        Mật khẩu
                      </label>
                      <div className="flex">
                        <input
                          type={PorT ? "password" : "text"}
                          id="password"
                          className="relative bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="*******"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          required
                        />
                        {PorT ? (
                          <VisibilityOffIcon
                            className="icon relative text-black mt-2 ml-[-30px]"
                            onClick={() => setPorT(false)}
                          />
                        ) : (
                          <VisibilityIcon
                            className="icon relative text-black mt-2 ml-[-30px]"
                            onClick={() => setPorT(true)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="text-[#00FF00] text-sm md:text-md"></div>
                    </div>
                    <button
                      className="mt-4  w-full flex justify-center text-sm md:text-xl
                   bg-orange-600
                 py-2 rounded-md text-white"
                      style={{ background: "#ff315c", margin: "7px 0" }}
                    >
                      Đăng nhập
                    </button>


                  </div>
                </form> */}
                <ToastContainer />
              </div>
              :
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12" style={{ position: "relative" }}>
                <div style={{ fontSize: "20px", border: "solid 1px black", borderRadius: "10px", padding: "5px 20px", position: "absolute", left: "30%" }}>
                  Hi!</div>
                <FontAwesomeIcon icon={faUserAstronaut} style={{ fontSize: "200px", color: "#1976d2" }} />
              </div>
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
