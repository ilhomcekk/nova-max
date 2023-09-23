import React from "react";
import "../../assets/scss/_delivery.scss";
import image39 from "../../assets/images/cargo.avif";
import image40 from "../../assets/images/Vector (16).png";
import image41 from "../../assets/images/Vector (17).png";
import image42 from "../../assets/images/Vector (18).png";
import { MContainer } from "../../element/Elemens";
import Title from "../../component/Title/Title";
import NavbarMenu from "../../container/NavbarMenu";

const Delivery = () => {
  return (
    <>
      <NavbarMenu />
      <MContainer>
        <Title m="mt-4 !mb-8" name="Доставка" />
        <div className="delivery-boxes min-h-[50vh]">
          <div className="delivery__box">
            <div className="box_title">Доставка по всей России</div>
            <div className="d__boxes">
              <div className="d__box">
                <img src={image40} alt="not found" />
                <p>Подарок к каждому заказу</p>
              </div>
              <div className="d__box">
                <img src={image41} alt="not found" />
                <p>Гарантия сохранности товара во время доставки</p>
              </div>
              <div className="d__box">
                <img src={image42} alt="not found" />
                <p>Гарантированная доставка до 14 дней</p>
              </div>
            </div>
          </div>
          <div className="delivery__box">
            <img src={image39} alt="not found" />
          </div>
        </div>
      </MContainer>
    </>
  );
};

export default Delivery;
