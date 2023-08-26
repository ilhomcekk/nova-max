import React, { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { getSlidersMobile } from "../../redux/actions/productActions";
import { Swiper, SwiperSlide } from "swiper/react";
const API_URL = "https://admin-nova.ru";

const SliderMobile = () => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:767px)");
  useEffect(() => {
    if (matches == true) {
      dispatch(getSlidersMobile());
    }
  }, [matches]);
  const slidersMobile = useSelector((state) => state.product.slidersMobile);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
      spaceBetween={5}
      pagination={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
      }}
      navigation={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      speed={1500}
      style={{ zIndex: "0" }}
      className="mySwiper2 banner-swiper-slide !mt-6 mobile-slider"
    >
      {slidersMobile?.map((slide, idx) => (
        <SwiperSlide key={idx} className="main-banner-swiper-slide relative">
          <div>
            <img
              src={API_URL + slide.photo}
              className="swiper-lazy !m-0"
              alt=""
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderMobile;
