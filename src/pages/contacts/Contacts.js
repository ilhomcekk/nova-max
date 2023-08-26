import React, { useState } from "react";
import "../../assets/scss/_contacts.scss";
import { MContainer } from "../../element/Elemens";
import contactsImg from "../../assets/images/Screenshot_1 1.png";
import { Link } from "react-router-dom";
import { createChatAdmin } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import { FaFacebookF, FaMapMarkerAlt, FaTelegramPlane } from "react-icons/fa";
import Vkontact from "../../assets/images/vk-svgrepo-com.svg";
import { BsInstagram } from "react-icons/bs";
const AnyReactComponent = ({ text }) => (
  <div>
    <FaMapMarkerAlt size={36} color="red" fill="red" />{" "}
  </div>
);

export default function Contacts() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const center = {
    lat: 55.746468,
    lng: 37.6451045,
  };
  const call_center = useSelector((state) => state.user.call);

  return (
    <>
      <MContainer className="pages !mt-4 contacts-page">
        <Link className="c8" to="/">
          Главная страница /{" "}
        </Link>
        <Link className="c8" to="">
          {" "}
          Контакты
        </Link>
      </MContainer>
      <MContainer>
        <div className="contacts__title">Контакты</div>
        <div className="contacts__boxes">
          <div className="contacts__boxes-box">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={center}
              defaultZoom={13}
              style={{ height: "400px", width: "100%", position: "relative" }}
              className="map"
            >
              <AnyReactComponent
                lat={center.lat}
                lng={center.lng}
                text="My Marker"
              />
            </GoogleMapReact>
            <div className="boxes">
              <div className="contact__box">
                <h1 className="!pl-0">Номер телефона:</h1>
                <h3>
                  <a
                    href={`tel:${call_center?.content
                      ?.replace(/\(|\)| /g, "")
                      ?.split(" ")
                      .join("")}`}
                  >
                    {call_center?.content}
                  </a>
                </h3>
              </div>
              <div className="contact__box">
                <h1 className="!pl-0">Юридический адрес:</h1>
                <h3>
                  109240, РОССИЯ, МОСКВА г, ВЕРХНЯЯ РАДИЩЕВСКАЯ ул, ДОМ 2/1 СТР3{" "}
                </h3>
              </div>
              <div className="contact__box">
                <h1 className="!pl-0">E-mail:</h1>
                <h3>
                  <a href="mailto:info@nova-max.ru">info@nova-max.ru</a>
                </h3>
              </div>
              <div className="contact__box">
                <h1 className="!pl-0">Мы в соцсетях</h1>
                <div className="footer__soc contacts__soc flex flex-wrap items-center mt-4 gap-x-2 gap-y-2">
                  <a href="https://t.me/NovaMaxMarket">
                    <FaTelegramPlane
                      onMouseOut={({ target }) =>
                        (target.style.fill = "#1e1c1c")
                      }
                      size={24}
                      fill="#1e1c1c"
                    />
                  </a>
                  <a
                    href="https://instagram.com/novamax.ru?igshid=NjIwNzIyMDk2Mg=="
                    className="ml-3"
                  >
                    <BsInstagram
                      onMouseOut={({ target }) =>
                        (target.style.fill = "#1e1c1c")
                      }
                      size={24}
                      fill="#1e1c1c"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100094729346512&mibextid=LQQJ4d"
                    className="ml-3"
                  >
                    <FaFacebookF
                      onMouseOut={({ target }) =>
                        (target.style.fill = "#1e1c1c")
                      }
                      size={24}
                      fill="#1e1c1c"
                    />
                  </a>
                  <a href="https://vk.com/novamaxmarket" className="ml-3">
                    <img className="vkontact-contact" src={Vkontact} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="r__box">
            <div className="title">Отправьте нам сообщение</div>
            <div className="!w-full input">
              <label htmlFor="">Имя</label>
              <input
                onChange={(e) => {
                  let newData = {
                    ...data,
                    name: e.target.value,
                  };
                  setData(newData);
                }}
                className="mt-2 shadow-lg"
                type="text"
                placeholder="Ваше имя"
                required
              />
            </div>
            <div className="!w-full input">
              <label htmlFor="">E-mail</label>
              <input
                onChange={(e) => {
                  let newData = {
                    ...data,
                    email: e.target.value,
                  };
                  setData(newData);
                }}
                className="mt-2 shadow-lg"
                type="email"
                placeholder="Ваш e-mail"
                required
              />
            </div>
            {/* <div className="!w-full input">
               <label htmlFor="">Номер</label>
               <input className="mt-2" type="number" placeholder="Ваш номер" />
             </div> */}
            <label htmlFor="">Комментарий</label>
            <textarea
              className="textarea mt-2 shadow-lg"
              placeholder="Оставьте отзыв"
              onChange={(e) => {
                let newData = {
                  ...data,
                  message: e.target.value,
                };
                setData(newData);
              }}
            ></textarea>
            <div className="r__box-button">
              <button
                onClick={() => dispatch(createChatAdmin({ ...data }))}
                type="submit"
                className="mx-auto shadow-lg"
              >
                Отправить сообщение
              </button>
            </div>
          </div>
        </div>
      </MContainer>
      <MContainer className="requisites">
        <div className="requisites__title">Реквизиты</div>
        <div className="text">
          <span>Расчётный счёт: </span>
          <p>40702810701500192664</p>
        </div>
        <div className="text">
          <span>Название банка: </span>
          <p>ООО «Банк Точка» </p>
        </div>
        <div className="text">
          <span>БИК: </span>
          <p>044 525 104</p>
        </div>
        <div className="text">
          <span>Корреспондентский счёт: </span>
          <p>3010 1810 7453 7452 5104 </p>
        </div>
        <div className="text">
          <span>Наименование: </span>
          <p>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "НОВАМАРКТ" </p>
        </div>
        <div className="text">
          <span>Генеральный директор </span>
          <p>Татаркулова Марина Салиховна </p>
        </div>
        <div className="text">
          <span>ИНН:</span>
          <p>0900007640 </p>
        </div>
        <div className="text">
          <span>КПП: </span>
          <p>090001001 </p>
        </div>
        <div className="text">
          <span>ОГРН: </span>
          <p>1230900001188 </p>
        </div>
        <div className="text">
          <span>Юридический адрес: </span>
          <p>
            369300, РОССИЯ, Респ КАРАЧАЕВО-ЧЕРКЕССКАЯ, р-н УСТЬ-ДЖЕГУТИНСКИЙ, г
            УСТЬ-ДЖЕГУТА, ул САДОВАЯ, ДОМ 59
          </p>
        </div>
        <div className="text">
          <span>ОКВЭД основной: </span>
          <p>47.91 </p>
        </div>
        <div className="text">
          <span>ОКВЭД дополнительный: </span>
          <p>82.9252.1053.20 </p>
        </div>
        <div className="text">
          <span>ИНН банка: </span>
          <p> 9721 1944 61 </p>
        </div>
        <div className="text">
          <span>КПП банка: </span>
          <p>997 950 001 </p>
        </div>
        <div className="text">
          <span>Юридический адрес банка: </span>
          <p>
            109456, РОССИЯ, МОСКВА г. 1-й ВЕШНЯКОВСКИЙ пр, ДОМ 1 СТР8, 1 этаж,
            пом. 43
          </p>
        </div>
        <div className="text">
          <span>Контакты банка: </span>
          <p className="flex flex-col w-full">
            <div>8 (800) 200-00-24</div>
            <div>+7 (495) 258 33 50</div>
          </p>
        </div>
      </MContainer>
    </>
  );
}
