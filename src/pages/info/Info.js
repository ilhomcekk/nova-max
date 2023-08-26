import React, { useEffect, useState } from "react";
import { MContainer } from "../../element/Elemens";
import "../../assets/scss/_info.scss";
import SecondNavbar from "../../component/layout/SecondNavbar";
import { useDispatch, useSelector } from "react-redux";
import noimage from "../../assets/images/noimage.jpg";
import { getMe } from "../../redux/actions/userActions";
import "swiper/css/pagination";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import vector21 from "../../assets/images/Vector (21).png";
const API = "https://admin-nova.ru/";

export const Info = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMe());
  }, []);
  const userData = useSelector((state) => state.user.user);
  const { reduxToken } = useSelector((state) => state.user);
  useEffect(() => {
    if (!reduxToken) {
      navigate("/");
    }
  }, [reduxToken]);

  return (
    <>
      <SecondNavbar />
      <div className="back">
        <MContainer className="md:py-[8rem] py-16">
          <div className="info__boxes">
            <div className="box relative bg-white">
              {reduxToken && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => navigate("/cabinet")}
                  >
                    Изменить
                  </Button>
                </div>
              )}
              <div className="user">
                {userData.photo ? (
                  <img
                    className="!object-cover"
                    src={`${API}${userData?.photo}`}
                    alt=""
                  />
                ) : (
                  <img className="!object-cover" src={noimage} alt="" />
                )}
                <div className="user__name">{userData?.name}</div>
              </div>
              <div className="email">
                E-mail: <span>{userData?.email}</span>
              </div>
              <div className="b__user">
                <div className="phone">
                  Телефон: <span>{userData?.phone}</span>
                </div>
              </div>
            </div>
            <div
              className="box"
              style={{ background: "rgba(0, 82, 255, 0.2)" }}
            >
              <div className="name__title flex items-center gap-x-6">
                <div className="bg-white rounded-full px-4 py-4">
                  <img src={vector21} alt="" />
                </div>
                Доставка
              </div>
              <div className="inputs mt-auto !justify-start gap-x-2">
                <span className="c8">Ближайшая</span>
                не ожидается
              </div>
            </div>
            {/* <div className="box">
              <div className="delivery">
                <div className="delivery__title flex justify-between flex-wrap">
                  Банковские карты
                  {carts?.length > 0 && (
                    <Button
                      style={{
                        color: "#84A9C0",
                        fontSize: "12px",
                        border: "1px solid #84A9C0",
                        marginTop: "0.5rem",
                        marginLeft: "auto",
                      }}
                      onClick={() => setCardOpen(true)}
                    >
                      просматривать карты
                    </Button>
                  )}
                </div>
              </div>
              {cardOpen && (
                <div
                  className="fixed top-0 right-0 bottom-0 left-0"
                  style={{ background: "rgba(0,0,0,0.5)", zIndex: "99999" }}
                >
                  <div
                    className="absolute"
                    style={{
                      width: "50%",
                      height: "50%",
                      left: "auto",
                      right: "auto",
                      zIndex: "422334",
                      transform: "translate(50%,50%)",
                    }}
                  >
                    <IconButton
                      onClick={() => setCardOpen(false)}
                      className="z-10 !absolute !top-0 !right-0"
                    >
                      <IoIosClose size={32} />
                    </IconButton>
                    <Swiper
                      modules={[Navigation, Pagination, Scrollbar, A11y, Lazy]}
                      spaceBetween={10}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      lazy={true}
                    >
                      {carts?.map((cart, index) => (
                        <SwiperSlide
                          className="swiper-slide h-full bg-white shadow-2xl p-12"
                          key={index}
                        >
                          <CreditCard cart={cart} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              )}
              <div
                className="add__cart"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <i>
                  <AiOutlinePlus size={24} fill="#84A9C0" />
                </i>
                <p>Добавить карту</p>
              </div>
            </div> */}
          </div>
        </MContainer>
      </div>
      {/* <CartModal
        showModal={showModal}
        onClickCartData={(data) => {
          dispatch(createCard(data));
        }}
        onClickCartVerify={(number) => {
          dispatch(verifyCart(number));
        }}
        onCloseModal={() => {
          setShowModal(false);
        }}
      /> */}
    </>
  );
};

export default Info;
