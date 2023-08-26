import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import "../../assets/scss/_register.scss";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp, postGetCode } from "../../redux/actions/authActions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const Registers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("novamarktToken");
  const [name, setName] = useState();
  // const [lastname, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [value, setValue] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { loginStep } = useSelector((state) => state.auth);

  let handleOnChange = (value) => {
    setPhone(value);
  };

  useEffect(() => {
    if (loginStep === 1) {
      navigate("/second-register");
      window.location.reload();
    }
  }, [loginStep]);

  return (
    <>
      <div className="register-box__box flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 w-3/12 rounded-md mt-4 text-left bg-white shadow-lg register__box">
          <div className="text-2xl font-bold text-center">Регистрация</div>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Имя
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 mt-2 focus:outline-none"
                style={{ border: "1.16px solid #0F3E44" }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            {/* <div>
              <label className="block" htmlFor="email">
                Фамилия
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 mt-2 focus:outline-none"
                style={{ border: "1.16px solid #0F3E44" }}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div> */}
            <div className="mt-4">
              <label className="block">Пароль</label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className="w-full px-4 py-3 mt-2 focus:outline-none"
                  style={{ border: "1.16px solid #0F3E44" }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
                    e.key == "Enter" &&
                    dispatch(
                      authSignUp({
                        name,
                        // lastname,
                        phone,
                        password,
                      })
                    )
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
            <div className="mt-4">
              <label className="block">Повторите пароль</label>
              <div className="relative">
                <input
                  type={`${showPassword2 ? "text" : "password"}`}
                  className="w-full px-4 py-3 mt-2 focus:outline-none"
                  style={{ border: "1.16px solid #0F3E44" }}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                  onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
                    e.key == "Enter" &&
                    dispatch(
                      authSignUp({
                        name,
                        // lastname,
                        phone,
                        password,
                      })
                    )
                  }
                />
                <div
                  className="absolute right-0 top-0 bottom-0 h-full flex items-center justify-center cursor-pointer mr-4"
                  onClick={() => setShowPassword2((value) => !value)}
                >
                  {showPassword2 ? (
                    <AiFillEyeInvisible size={22} />
                  ) : (
                    <AiFillEye size={22} />
                  )}
                </div>
              </div>
            </div>
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
                className="w-full px-4 py-3 mt-2 focus:outline-none"
                style={{ border: '1.16px solid #0F3E44' }}
              /> */}
            </div>
            {/* <Link
              className="text-sm text-sky-700 hover:underline"
              to="/register"
            >
              Уже зарегистрированы?
            </Link> */}
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 w-full mt-4 text-white"
                onClick={() => {
                  if (password === password2) {
                    dispatch(
                      authSignUp({
                        name,
                        // lastname,
                        phone: `+${phone}`,
                        password,
                      })
                    );
                  } else {
                    toast.error("Пароли не подходят");
                  }
                }}
              >
                Получить код
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registers;
