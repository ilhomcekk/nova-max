import { Button } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import CreditCard from "../../pages/info/CreditCard";
import "../../assets/scss/_cartModal.scss";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-input-2";
import { NumberFormatBase, PatternFormat } from "react-number-format";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxHeight: "80vh",
  background: "#fff",
  boxShadow: 24,
  p: 4,
};

// web.cjs is required for IE11 support

export const CartModal = ({
  showModal,
  onCloseModal,
  onClickCartData,
  onClickCartVerify,
}) => {
  // const [type_id, set_card_type_id] = useState(32);
  const [card_number, set_card_number] = useState("");
  const [card_expire, set_card_expire] = useState("");
  const [card_phone_number, set_card_phone_number] = useState("");
  const [verify, setVerify] = useState();
  const { step } = useSelector((state) => state.user);

  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }
  function cardExpiry(val) {
    let month = limit(val.substring(0, 2), "12");
    let date = limit(val.substring(2, 4), "31");

    return month + (date.length ? "/" + date : "");
  }
  const format = (val) => {
    if (val === "") return "";
    let month = val.substring(0, 2);
    const year = val.substring(2, 4);

    if (month.length === 1 && month[0] > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      // set the lower and upper boundary
      if (Number(month) === 0) {
        month = `01`;
      } else if (Number(month) > 12) {
        month = "12";
      }
    }

    return `${month}/${year}`;
  };

  return (
    <Modal open={showModal} onClose={onCloseModal} center>
      <div style={style} className="debit__box cartModalInput p-4">
        <div className="debit__modal">
          <div className="modal__header">
            {/* <CreditCard /> */}
            <div className="header__title">
              <h4>Дебетовая или кредитная карта</h4>
            </div>
          </div>
          <div className="debit__title">
            <div className="debit__danniy">
              <h5 className="text-left">Данные карты</h5>
            </div>
            <div></div>
          </div>
          {step === false ? (
            <div className="debit__info">
              <div className="w-full">
                <PhoneInput
                  name="multipleErrorInput4"
                  autoCorrect="off"
                  containerClass="col-span-2 mt-2"
                  country={"ru"}
                  onlyCountries={["ru"]}
                  countryCodeEditable={false}
                  onChange={(e) => set_card_phone_number(e)}
                />
                {/* <select
                  onChange={(e) => {
                    set_card_type_id(e.target.value);
                  }}
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-800"
                >
                  <option value={""}>Tanlang</option>
                  <option value={32}>Uzkart</option>
                  <option value={33}>Humo</option>
                  <option value={34}>Visa</option>
                </select> */}
              </div>
              <div className="grid md:grid-cols-2 gap-3 media-col-2 mt-2">
                <PatternFormat
                  placeholder="Данные на карты"
                  format="#### #### #### ####"
                  displayType="number"
                  mask=""
                  className="text-black col-span-3 sm:col-span-1 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-800"
                  onChange={(e) => {
                    set_card_number(e.target.value);
                  }}
                />
                <div className="debit__into mt-2">
                  <NumberFormatBase
                    placeholder="Срок годности"
                    format={format}
                    className="text-black col-span-3 sm:col-span-1 placeholder-gray-600 w-full px-4 py-2.5 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-800"
                    type="text"
                    onChange={(e) => {
                      set_card_expire(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <TextField
              id="outlined-basic"
              label="Verify code"
              variant="outlined"
              onChange={(e) => setVerify(e.target.value)}
            />
          )}
          <div className="debit__bottom">
            <p>
              <span className="text-center">
                Информация о ваших способах оплаты хранится в защищенном режиме.
              </span>
            </p>
          </div>
          <div className="debit__footer">
            {step === false ? (
              <Button
                onClick={() => {
                  onClickCartData({
                    card_number,
                    card_expire,
                    card_phone_number,
                  });
                }}
              >
                Сохранить
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onClickCartVerify({
                    code: verify,
                    card_id: window.localStorage.getItem("card_id"),
                  });
                }}
              >
                Отправить
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
