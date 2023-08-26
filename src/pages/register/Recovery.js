import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import "../../assets/scss/_register.scss";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp, postGetCode } from "../../redux/actions/authActions";
import { recoveryAccount, recoveryCode } from "../../redux/actions/userActions";
import requests from "../../helpers/requests";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Modal from "react-responsive-modal";
import { Button } from "@mui/material";

const Registers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState();
  const [code, setCode] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const token = window.localStorage.getItem("novamarktToken");
  const { recoveryAccountStep } = useSelector((state) => state.user);
  const { recoveryAccountLoading } = useSelector((state) => state.user);
  const recoveryCodeRedux = useSelector((state) => state.user.recoveryCode);
  const { loginStep } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const onClose = () => {
    setModal(false);
  };

  const authSignIn = (params) => {
    dispatch({ type: "auth_login_start", payload: params });

    requests
      .authSignIn(params)
      .then(({ data }) => {
        dispatch({ type: "auth_login_success", payload: data });
        toast.success("Успешно");
        // navigate("/");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
      })
      .catch(({ response }) => {
        let message = (response && response.data.message) || "Login error";
        toast.error(message);
        // toast.error("Вам нужно зарегистрироваться");

        dispatch({ type: "auth_login_error", payload: message });
      });
  };

  useEffect(() => {
    if (recoveryAccountStep === 2) {
      authSignIn({
        phone: recoveryCodeRedux.phone,
        password: recoveryCodeRedux.password,
      });
      if (loginStep === 2) {
        setModal(true);
      }
      // toast.success(`Ваш код: ${recoveryCodeRedux?.password}`);
    }
  }, [recoveryAccountStep, loginStep]);

  return (
    <>
      <Modal open={modal} center>
        <div className="error-modal">
          <div className="text-xl my-16">
            Ваш код: {recoveryCodeRedux?.password}
          </div>
          <div className="w-full">
            <Button
              className="w-full"
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
              variant="contained"
              color="primary"
            >
              Ок
            </Button>
          </div>
        </div>
      </Modal>
      <div className="register-box__box flex items-center justify-center min-h-screen bg-gray-100 pb-8">
        <div className="px-8 py-6 rounded-md mt-4 text-left bg-white shadow-lg get__code">
          <form action="">
            <div className="mt-4">
              <div>
                <label className="block font-size text-sm" htmlFor="email">
                  Номер телефона
                </label>
                <PhoneInput
                  name="multipleErrorInput4"
                  autoCorrect="off"
                  placeholder="Enter a Valid Phone Number"
                  containerClass="mb-6 mt-2"
                  country={"ru"}
                  onlyCountries={["ru"]}
                  countryCodeEditable={false}
                  value={phone}
                  onChange={(e) => setPhone(e)}
                />
                {recoveryAccountStep !== 0 && (
                  <div className="relative">
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      className="w-full px-4 py-3 mt-2 focus:outline-none"
                      style={{ border: "1.16px solid #0F3E44" }}
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
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
                )}
              </div>
              {/* <span className="mt-2 time">-0.59</span> */}
              <div className="flex">
                {recoveryAccountStep === 0 ? (
                  <div
                    onClick={() => {
                      dispatch(recoveryAccount({ phone: `+${phone}` }));
                    }}
                    className="reg-btnbtn hover:!bg-white hover:!text-sky-700 cursor-pointer text-center text-white w-full py-2 mt-2"
                  >
                    {recoveryAccountLoading ? "Loading" : "Получить код"}
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      dispatch(
                        recoveryCode({ phone: `+${phone}`, code: code })
                      );
                    }}
                    className="reg-btnbtn hover:!bg-white hover:!text-sky-700 cursor-pointer text-center text-white w-full py-2 mt-2"
                  >
                    Переотправить
                  </div>
                )}
              </div>
              {/* <div className="flex items-baseline justify-between mt-2">
            <button className="px-6 py-2 w-full mt-4 text-white reg">
              Регистрация
            </button>
          </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registers;
