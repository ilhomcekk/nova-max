import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import "../../assets/scss/_register.scss";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp, postGetCode } from "../../redux/actions/authActions";
import requests from "../../helpers/requests";
import { toast } from "react-toastify";

const Registers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [counter, setCounter] = React.useState(60);
  React.useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      navigate("/firstregister");
      toast.error("Вы пропустили времю, заново зарегистрируйтесь!");
    }
  }, [counter]);
  const { loginStep } = useSelector((state) => state.auth);
  const token = window.localStorage.getItem("novamarktToken");

  useEffect(() => {
    if (loginStep === 3) {
      navigate("/");
      window.location.reload();
    }
  }, [loginStep]);

  return (
    <>
      <div className="register-box__box flex items-center justify-center min-h-screen bg-gray-100 pb-8">
        <div className="px-8 py-6 lg:w-3/12 rounded-md mt-4 text-left bg-white shadow-lg get__code">
          <form action="">
            <div className="mt-4">
              <div>
                <label className="block font-size text-sm" htmlFor="email">
                  Введите sms-код полученный через sms
                </label>
                <input
                  type="password"
                  placeholder="Ваш код"
                  className="w-full px-4 py-2 mt-2 border rounded-md !mb-0"
                  onChange={(e) => setValue(e.target.value)}
                  onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
                    e.key == "Enter" &&
                    dispatch(postGetCode({ code: value, token: token }))
                  }
                />
                <div className="text-sm text-right text-sky-700 m-0">
                  {counter}
                </div>
              </div>
              {/* <span className="mt-2 time">-0.59</span> */}
              <div className="flex">
                <div
                  onClick={() => {
                    dispatch(postGetCode({ code: value, token: token }));
                  }}
                  className="reg-btnbtn cursor-pointer text-center text-white w-full py-2 mt-2"
                >
                  Зарегистрироваться
                </div>
              </div>
              {/* <div className="flex items-baseline justify-between mt-2">
            <button className="px-6 py-2 w-full mt-4 text-white reg">
              Регистрация
            </button>
          </div> */}
              <div className="flex mt-2">
                <Link
                  to="/register"
                  className="registered text-sm text-sky-700 hover:underline"
                >
                  Уже зарегистрирован?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registers;
