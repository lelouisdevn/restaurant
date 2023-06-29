import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import '../settuppage/setup.css';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
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
          } else if(res?.data.login[0].role === "3"){
            const tempInfoStaff = res?.data.login[0];
            //console.log(tempInfoStaff);
            localStorage.setItem("infoStaff", JSON.stringify(tempInfoStaff));

            await axios
              .get(
                `http://localhost:4000/api/restaurant/byuser=${tempInfoStaff._id}`
              )
              .then((res) => {
                const tempInfoRestaurant = res?.data.infores;
                localStorage.setItem("RestaurantID",tempInfoRestaurant._id)
                console.log(tempInfoRestaurant);
                localStorage.setItem(
                  "infoRestaurant",
                  JSON.stringify(tempInfoRestaurant)
                );
              });
            //navigate("/manage/chef");
            window.location.href = '/manage/bep/order';
          }else if(res?.data.login[0].role === "4"){
            const tempInfoStaff = res?.data.login[0];
            //console.log(tempInfoStaff);
            localStorage.setItem("infoStaff", JSON.stringify(tempInfoStaff));

            await axios
              .get(
                `http://localhost:4000/api/restaurant/byuser=${tempInfoStaff._id}`
              )
              .then((res) => {
                const tempInfoRestaurant = res?.data.infores;
                localStorage.setItem("RestaurantID",tempInfoRestaurant._id)
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
      window.location.href = '/login';
    }
  };
  return (
    <>
      <div>
        <div className={`logo ${float}`} style={{ margin: 0, display: "none" }}>
          <img src='/images/logoo.png' />
        </div>
      </div>
      <section className="h-screen">
        <div className="h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form onSubmit={handleLogin}>
                <div className="w-full sm:w-2/3 lg:2/3 px-6 bg-blue-600 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4  rounded-lg">
                  <div className="w-full flex justify-center text-[#fff] text-3xl font-bold mb:2 md:mb-5">
                    Đăng nhập
                  </div>

                {/* {msgerr ? (
                  <div className="mb-6 bg-green-200 flex justify-center items-center">
                    <span className="py-1 text-black">{msgerr}</span>
                  </div>
                              ) : null} */}

                {/* <div className="mb-6">
                  <label
                    htmlFor="restaurant"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Tên nhà hàng
                  </label>
                  <input
                    type="restaurant"
                    id="restaurant"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={restaurant}
                    onChange={(e) => {
                      setRestaurant(e.target.value);
                    }}
                    required
                  />
                </div> */}
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-white"
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
                    className="block mb-2 text-sm font-medium text-white"
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
                 py-2 rounded-md"
                >
                  Đăng nhập
                </button>
                
                
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Login;
