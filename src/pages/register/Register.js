import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import "../../assets/scss/_register.scss";
import { useDispatch, useSelector } from "react-redux";
import requests from "../../helpers/requests";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const authSignIn = (params) => {
    dispatch({ type: "auth_login_start", payload: params });

    requests
      .authSignIn(params)
      .then(({ data }) => {
        dispatch({ type: "auth_login_success", payload: data });
        toast.success("Успешно");
        navigate("/");
        window.location.reload();
      })
      .catch(({ response }) => {
        let message = (response && response.data.message) || "Login error";
        toast.error(message);
        // toast.error("Вам нужно зарегистрироваться");

        dispatch({ type: "auth_login_error", payload: message });
      });
  };

  return (
    <div className="register-box__box flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 w-3/12 rounded-md mt-4 text-left bg-white shadow-lg register__box">
        <div className="text-2xl font-bold text-center">Авторизация</div>
        <div>
          <div className="mt-4">
            {/* <div>
              <label className="block" htmlFor="email">
                Имя
              </label>
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
              />
            </div> */}
            <div className="mt-4">
              <label className="block mb-2">Номер</label>
              <PhoneInput
                name="multipleErrorInput4"
                autoCorrect="off"
                placeholder="Enter a Valid Phone Number"
                country={"ru"}
                onlyCountries={["ru"]}
                countryCodeEditable={false}
                value={phone}
                onChange={(e) => setPhone(e)}
              />
              {/* <input
                type="text"
                className="w-full px-4 py-3 rounded-full mt-2 focus:outline-none"
                style={{ border: "1.16px solid #0F3E44" }}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              /> */}
            </div>
            <div className="mt-4">
              <label className="block">Пароль</label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className="w-full px-4 py-3 rounded-full mt-2 focus:outline-none"
                  style={{ border: "1.16px solid #0F3E44" }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
                    e.key == "Enter" &&
                    dispatch(authSignIn({ phone: `+${phone}`, password }))
                  }
                />
                <div
                  className="absolute right-0 top-0 bottom-0 h-full flex items-center justify-center cursor-pointer mr-4"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={22} />
                  ) : (
                    <AiFillEye size={22} />
                  )}
                </div>
              </div>
            </div>
            <Link
              className="text-sm text-sky-700 hover:underline"
              to={"/recovery"}
            >
              забыли пароль?
            </Link>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 w-full mt-4 text-white"
                onClick={() => {
                  dispatch(authSignIn({ phone: `+${phone}`, password }));
                }}
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
