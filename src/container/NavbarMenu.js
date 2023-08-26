import React from "react";
import { Link, MContainer } from "../element/Elemens";
import "../assets/scss/NavbarMenu.scss";
import { useDispatch, useSelector } from "react-redux";
import { subCategoryFilter } from "../redux/actions/categoryActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { MdImportExport, MdOutlineSlideshow } from "react-icons/md";
import { HiOutlineTruck } from "react-icons/hi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
const language = window.localStorage.getItem("novamarkt-Content-language");

export default function NavbarMenu() {
  const dispatch = useDispatch();
  const navCategoryList = useSelector((state) => state.category.categoryList);
  // const navCategoryList = [
  //   {
  //     id: 1,
  //     path: "/top-category",
  //     name: "Популярные категории",
  //     nameUz: "Ommabop kategoriyalar",
  //     nameEn: "Popular categories",
  //     icon: <BiCategoryAlt size="20" className="mr-1" />,
  //   },
  //   {
  //     id: 2,
  //     path: "/deliveries",
  //     name: "Помощь покупателям",
  //     nameUz: "Sotuvchilarga yordam",
  //     nameEn: "Help for buyers",
  //     icon: <IoIosPeople size="20" className="mr-1" />,
  //   },
  //   {
  //     id: 3,
  //     path: "/export",
  //     name: "Помощь экспортёрам",
  //     nameUz: "Eksportchilarga yordam",
  //     nameEn: "Help for exporters",
  //     icon: <MdImportExport size="20" className="mr-1" />,
  //   },
  //   {
  //     id: 4,
  //     path: "/exhibitions",
  //     name: "Выставки",
  //     nameUz: "Ko'rgazmalar",
  //     nameEn: "Exhibitions",
  //     icon: <MdOutlineSlideshow size="20" className="mr-1" />,
  //   },
  //   {
  //     id: 5,
  //     path: "/ar-vr",
  //     name: "AR & VR шоу рум",
  //     nameUz: "Ko'rsatish xonasi",
  //     nameEn: "AR & VR show room",
  //     icon: <HiOutlineTruck size="20" className="mr-1" />,
  //   },
  // ];

  return (
    <MContainer className={`${navCategoryList?.length > 0 && "md:py-8 py-4"}`}>
      {/* <ul className="menu-list"> */}
      {/* {navCategoryList.map((category, index) => (
          <li key={index}>
            <Link
              className="flex items-center md:text-center"
              to={category.path}
            >
              {category.icon}
              {language === "ru" && category.name}
              {language === "uz" && category.nameUz}
              {language === "en" && category.nameEn}
            </Link>
          </li>
        ))} */}
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        loop
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          769: {
            slidesPerView: 5,
          },
          1440: {
            slidesPerView: 7,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {navCategoryList.map((category, index) => (
          <SwiperSlide className="!w-max">
            <li
              onClick={() => dispatch(subCategoryFilter(category.id))}
              key={index}
            >
              <Link
                className="block md:text-center"
                to={`/filter/${category.id}/page=1`}
              >
                {category.name}
              </Link>
            </li>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide className="!w-max">
          <li>
            <Link className="block md:text-center" to={`/`}>
              Осветительные приборы
            </Link>
          </li>
        </SwiperSlide>

        <SwiperSlide className="!w-max">
          <li>
            <Link className="block md:text-center" to={`/`}>
              Декор и картины
            </Link>
          </li>
        </SwiperSlide>

        <SwiperSlide className="!w-max">
          <li>
            <Link className="block md:text-center" to={`/`}>
              Кафельная плитка
            </Link>
          </li>
        </SwiperSlide>

        <SwiperSlide className="!w-max">
          <li>
            <Link className="block md:text-center" to={`/`}>
              Мебель
            </Link>
          </li>
        </SwiperSlide>

        <SwiperSlide className="!w-max">
          <li>
            <Link className="block md:text-center" to={`/`}>
              Сантехника
            </Link>
          </li>
        </SwiperSlide> */}
      </Swiper>
      {/* </ul> */}
    </MContainer>
  );
}
