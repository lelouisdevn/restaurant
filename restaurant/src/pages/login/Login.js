import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [restaurant, setRestaurant] = useState("chocu@ttt.mi.com");
    const [PorT, setPorT] = useState(true);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        navigate("/manage/home")
        
    };
  return (
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

                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Mã nhà hàng
                  </label>
                  <input
                    type="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // placeholder="chocu.ttt.com"
                    value={restaurant}
                    onChange={(e) => {
                      setRestaurant(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Mã nhân viên
                  </label>
                  <input
                    type="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@neurolink.com"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    // required
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
                //   required
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
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
