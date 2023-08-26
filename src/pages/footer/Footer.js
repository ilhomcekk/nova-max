import React from "react";
import { FooterLink, MContainer } from "../../element/Elemens";
import "../../assets/scss/_footer.scss";
import { FaTelegramPlane, FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import f1 from "../../assets/images/f1.jpg";
import f2 from "../../assets/images/f2.jpg";
import { IoIosArrowDropupCircle } from "react-icons/io";
import Vkontact from "../../assets/images/vk-svgrepo-com.svg";
import { useSelector } from "react-redux";
const URL = "https://admin-nova.ru/";

const Footer = () => {
  const logo = useSelector((state) => state.user.logo);
  return (
    <div className="footer__back">
      <div className="container mx-auto px-md-8 px-4">
        <MContainer>
          <div className="footer__box grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
            <div className="footer__logo">
              <FooterLink to="/">
                <img
                  className="h-[50px] min-w-[215px] mb-4"
                  src={URL + logo?.photo}
                  alt=""
                />
              </FooterLink>
              <div className="footer__title">
                <h5>Мы в соцсетях</h5>
              </div>
              <div className="footer__soc flex items-center mt-4 gap-3">
                <a href="https://t.me/NovaMaxMarket">
                  <FaTelegramPlane
                    onMouseOut={({ target }) => (target.style.fill = "#02308C")}
                    onMouseOver={({ target }) =>
                      (target.style.fill = "#02308C")
                    }
                    size={30}
                    fill="#02308C"
                  />
                </a>
                <a
                  href="https://instagram.com/novamax.ru?igshid=NjIwNzIyMDk2Mg=="
                  className="ml-3"
                >
                  <BsInstagram
                    onMouseOut={({ target }) => (target.style.fill = "#02308C")}
                    onMouseOver={({ target }) =>
                      (target.style.fill = "#02308C")
                    }
                    size={30}
                    fill="#02308C"
                  />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100094729346512&mibextid=LQQJ4d"
                  className="ml-3"
                >
                  <FaFacebookF
                    onMouseOut={({ target }) => (target.style.fill = "#02308C")}
                    onMouseOver={({ target }) =>
                      (target.style.fill = "#02308C")
                    }
                    size={30}
                    fill="#02308C"
                  />
                </a>
                <a href="https://vk.com/novamaxmarket" className="ml-3">
                  <img className="vkontact" src={Vkontact} alt="" />
                </a>
              </div>
            </div>
            <div>
              <div className="footer__title">
                <h5>Покупателям</h5>
              </div>
              <ul className="footer__ul">
                <li className="footer__li">
                  <FooterLink to="/deliveries">Доставка</FooterLink>
                </li>
                <li className="footer__li">
                  <FooterLink to="/returnproduct">Возврат товара</FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <div className="footer__title">
                <h5>Компания</h5>
              </div>
              <ul className="footer__ul">
                <li className="footer__li">
                  <FooterLink to="/contacts">Контакты</FooterLink>
                </li>
                <li className="footer__li">
                  <FooterLink to="/questions">FAQ</FooterLink>
                </li>
                <li className="footer__li">
                  <FooterLink to="/offer">
                    Политика конфиденциальности
                  </FooterLink>
                </li>
              </ul>
            </div>
            <div className="response__app">
              <div className="footer__title">
                <h5>Мобильные устройства</h5>
              </div>
              <a href="https://apps.apple.com/tr/app/novamax/id1598321940">
                <img className="footer-link-app" src={f2} alt="" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.nova.max.ru">
                <img className="footer-link-app" src={f1} alt="" />
              </a>
              <div className="flex flex-col mt-2">
                <div className="flex items-center justify-end mt-auto">
                  <IoIosArrowDropupCircle
                    className="cursor-pointer"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    fill="#02308C"
                    size={56}
                  />
                </div>
              </div>
            </div>
          </div>
        </MContainer>
      </div>
    </div>
  );
};

export default Footer;
