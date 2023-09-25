import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { MContainer } from "../../element/Elemens";
import "../../assets/scss/_product.scss";
import "../../assets/scss/_modal.scss";
import NavbarMenu from "../../container/NavbarMenu";
import { Cart } from "../../component/Cart/Cart";
import Title from "../../component/Title/Title";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/lazy";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsAll,
  getSliders,
  getBrands,
  getBanners,
  getPopularProducts,
} from "../../redux/actions/productActions";
import AddedRecentlyProducts from "./AddedRecentlyProducts";
import { Link, useNavigate } from "react-router-dom";
import ProductsViewed from "../../component/ProductsViewed/ProductsViewed";
import { Skeleton, useMediaQuery } from "@mui/material";
import { getNews } from "../../redux/actions/newsActions";
import SliderMobile from "../../component/Slider/SliderMobile";
import ProductSkelet from "../../component/loading/ProductSkelet";
import NewsCart from "../../component/Cart/NewsCart";
import { getCategory } from "../../redux/actions/categoryActions";
import MensFootwear from "./products-by-category/MensFootwear";
import WomensFootwear from "./products-by-category/WomensFootwear";
import MensClothing from "./products-by-category/MensClothing";
import WomensClothing from "./products-by-category/WomensClothing";
import Accessories from "./products-by-category/MensAccessories";
import NewProducts from "./NewProducts";
import MensAccessories from "./products-by-category/MensAccessories";
import WomensAccessories from "./products-by-category/WomensAccessories";
import ChildrenAccessories from "./products-by-category/ChildrenAccessories";
const language = window.localStorage.getItem("novamarkt-Content-language");

const API_URL = "https://admin-nova.ru";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getProductsAll());
    // dispatch(getPopularProducts({ page: 1, "per-page": 10 }));
    // dispatch(getBanners());
    // dispatch(getBrands());
    dispatch(getNews({ page: 1, "per-page": 6 }));
    // dispatch(getCategory());
  }, []);

  const popularProducts = useSelector((state) => state.product.popularProducts);
  const { popularProductsLoading } = useSelector((state) => state.product);
  const sliders = useSelector((state) => state.product.sliders);
  const { slidersLoading } = useSelector((state) => state.product);
  const gallery = [];
  const galleryImage = async () => {
    await sliders?.forEach((item) => {
      gallery.push({
        original: `https://admin-nova.ru${item?.photo}`,
      });
    });
  };
  // galleryImage();
  const get_brands = useSelector((state) => state.product.brands_main);
  const { brands_mainLoading } = useSelector((state) => state.product);
  const news = useSelector((state) => state.news.news);

  return (
    <>
      <NavbarMenu />
      <MContainer>
        {slidersLoading ? (
          <Skeleton className="!transform-none !mt-8" height={450} />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
            spaceBetween={30}
            pagination={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={1000}
            style={{ zIndex: "0", borderRadius: "15px" }}
            className="mySwiper2 banner-swiper-slide laptop-slider !mt-6"
          >
            {sliders?.map((slide, idx) => (
              <SwiperSlide
                key={idx}
                className="main-banner-swiper-slide relative"
              >
                <div>
                  <img
                    src={API_URL + slide.photo}
                    className="swiper-lazy !m-0"
                    style={{ borderRadius: "15px" }}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <SliderMobile />
      </MContainer>
      <div className="md:pt-16 pt-8 md:pb-16 pb-0">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={8000}
          spaceBetween={10}
          slidesPerView={7}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            769: {
              slidesPerView: 5,
            },
            1440: {
              slidesPerView: 7,
            },
          }}
          loop
          navigation
          className="brands swiper-brands"
        >
          {get_brands?.map((brand, index) => (
            <SwiperSlide
              style={{
                height: "100px",
              }}
              key={index}
            >
              {brands_mainLoading ? (
                <Skeleton
                  className="!transform-none"
                  width={"120px"}
                  height={"140px"}
                />
              ) : (
                <Link
                  className="brands-link md:shadow-none shadow-md"
                  to={`/products-by-brand/${brand?.id}`}
                >
                  <img
                    style={{ height: "100%", objectFit: "contain" }}
                    src={API_URL + brand?.photo}
                    alt=""
                  />
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      asdasd
      <MensClothing />
      sadadas
      <WomensClothing />
      <NewProducts />
      <MensFootwear />
      <WomensFootwear />
      <MensAccessories />
      <WomensAccessories />
      <ChildrenAccessories />
      {/* <MContainer className="md:py-12 py-8">
        <Title
          nameUz="Ommabop tovarlar"
          name="Популярные товары"
          nameEn="Popular goods"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {popularProductsLoading ? (
            <ProductSkelet length={10} />
          ) : (
            popularProducts?.map((product, index) => (
              <Cart product={product} key={index} />
            ))
          )}
        </div>
        {popularProducts?.length > 9 && (
          <button
            onClick={() => {
              navigate("/products/type=popular");
            }}
            className="show__all"
          >
            {language === "ru" && "Показать еще"}
            {language === "uz" && "Ko'proq ko'rish"}
            {language === "en" && "Show more"}
          </button>
        )}
      </MContainer> */}
      {/* <AddedRecentlyProducts /> */}
      {news?.length > 0 && (
        <MContainer className="md:py-12 py-8">
          <Title nameUz="Yangiliklar" nameEn="News" name="Новости" />
          <div className="news__boxes__products grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-7">
            {news?.map((item, idx) => (
              <NewsCart key={idx} item={item} />
            ))}
          </div>
        </MContainer>
      )}
      {/* <MContainer className="md:py-16 py-8">
        <Title
          nameUz="Yaqinda ko'rganlaringiz"
          name="Вы недавно смотрели"
          nameEn="Recently viewed"
        />
        <ProductsViewed />
      </MContainer> */}
    </>
  );
};

export default Product;
