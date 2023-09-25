import React, { useState, useEffect } from "react";
import "../assets/scss/_navbar.scss";
import "../assets/scss/_modal.scss";
import { MContainer, MLink, MNavbar, MNav } from "../element/Elemens";
import { HiUser } from "react-icons/hi";
import { IoMdCube } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { IoCart } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { AiOutlineShopping, AiOutlineRight } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";
import { RiHeartFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  IconButton,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import {
  getCategory,
  subCategoryFilter,
} from "../redux/actions/categoryActions";
import { getFavoriteAll } from "../redux/actions/favoriteActions";
import { getCart } from "../redux/actions/cartActions";
import { getMe, getlogo } from "../redux/actions/userActions";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { getProductsByFilter } from "../redux/actions/filterActions";
import ProfileModal from "../component/NoneProfileModal/ProfileModal";
import { BsTelephone } from "react-icons/bs";
import ErrorModal from "../component/ErrorModal/ErrorModal";
import { getBrands, getSliders } from "../redux/actions/productActions";
const URL = "https://admin-nova.ru/";
const language = window.localStorage.getItem("novamarkt-Content-language");

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [filterProduct, setFilterProduct] = useState({ query: "" });

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const [fixedNavbar, setFixedNavbar] = useState(false);
  const [fixedNavbarResponse, setFixedNavbarResponse] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [subCategoryState, setSubCategoryState] = useState();
  const [notification, setNotification] = useState(false);
  const [uopenMenuMobile, setUopenMenuMobile] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openMenuSearch, setOpenMenuSearch] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const handleShowProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleNotification = () => {
    setNotification((value) => !value);
  };

  const changeScrollNavbar = () => {
    if (window.scrollY >= 45) {
      setFixedNavbar(true);
    } else {
      setFixedNavbar(false);
    }
  };

  window.addEventListener("scroll", changeScrollNavbar);
  const changeScrollNavbarResponse = () => {
    if (window.scrollY >= 50) {
      setFixedNavbarResponse(true);
    } else {
      setFixedNavbarResponse(false);
    }
  };
  window.addEventListener("scroll", changeScrollNavbarResponse);

  const handleSelected = () => {
    setOpenCategory((value) => !value);
    setSubCategoryState(false);
  };
  const openMenuMobile = (value) => {
    setUopenMenuMobile(value);
  };
  const openProfileMenuFun = (value) => {
    setOpenProfileMenu(value);
  };
  const matches = useMediaQuery("(min-width:767px)");

  useEffect(() => {
    dispatch(getFavoriteAll());
    dispatch(getCart());
    dispatch(getMe());
    dispatch(getlogo());
    dispatch(getBrands());
  }, []);


  useEffect(() => {
    if (matches == true) {
      dispatch(getSliders());
    }
  }, [matches]);

  const favoriteList = useSelector((state) => state.favorite.favoritiesList);
  const cartList = useSelector((state) => state.cart.list);
  const productFelter = useSelector((state) => state.filter.list);
  const navCategoryList = useSelector((state) => state.category.list);
  const subCategory = useSelector((state) => state.category.subCategory);
  const call_center = useSelector((state) => state.user.call);
  const { reduxToken } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.category);
  const logo = useSelector((state) => state.user.logo);
  const { logoLoading } = useSelector((state) => state.user);

  const handleLogout = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      navigate("/");
      dispatch(logout());
    }
  };
  const [showFavorite, setShowFavorite] = useState(false);

  useEffect(() => {
    if(navCategoryList?.length === 0)
    dispatch(getCategory())
  },[navCategoryList])

  return (
    <>
      <ErrorModal
        text="Зарегистрируйтесь"
        onClose={() => setShowFavorite(false)}
        showModal={showFavorite}
      />
      <div className="navbar">
        <ProfileModal
          showModal={showProfileModal}
          onClose={handleShowProfileModal}
          text={"Зарегистрируйтесь, чтобы посмотреть"}
        />
        <div className="navbar__nav">
          <MNavbar
            positionFixed={fixedNavbar}
            positionFixedResponse={fixedNavbarResponse}
            className="!py-4"
          >
            <MContainer>
              <div className="navbar__item__global">
                <div className="nav__item__brand">
                  <MLink to="/">
                    <div className="nav__logo">
                      {logoLoading ? (
                        <Skeleton
                          className="!transform-none"
                          width="100%"
                          height="100%"
                        />
                      ) : (
                        <img
                          className={`nav__logo`}
                          src={URL + logo?.photo}
                          alt="NovaMax"
                        />
                      )}
                    </div>
                  </MLink>
                  <div className="nav__item__category relative">
                    {openCategory ? (
                      <IoMdClose fill="#02308C" size={20} />
                    ) : (
                      <BiCategoryAlt fill="#02308C" size={20} />
                    )}
                    <div
                      onClick={handleSelected}
                      className="px-2 category__title"
                      style={{ color: "#02308C" }}
                    >
                      {language === "ru" && "Категории"}
                      {language === "uz" && "Kategoriya"}
                      {language === "en" && "Category"}
                    </div>
                    <IoMdArrowDropdown fill="#02308C" size={20} />
                  </div>
                </div>
                {openCategory && (
                  <div
                    onClick={() => setOpenCategory(false)}
                    style={{ zIndex: "9", background: "rgba(0,0,0, 0.5)" }}
                    className="fixed top-0 right-0 bottom-0 left-0 h-full w-full"
                  ></div>
                )}
                {openCategory ? (
                  <div
                    className="nav__category__menu"
                    style={{ left: "0%", top: 0 }}
                  >
                    <div
                      onClick={() => setOpenCategory(false)}
                      className="flex items-center cursor-pointer gap-x-2 pb-4"
                    >
                      <IoMdClose />
                      Закрыть окно
                    </div>
                    {loading
                      ? [...Array(8)].map((item, idx) => (
                          <Skeleton
                            key={idx}
                            width="100%"
                            className="!transform-none !mb-4"
                            style={{ minHeight: "60px", height: "60px" }}
                          />
                        ))
                      : navCategoryList?.map((category, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              navigate(`/category/${category.id}`);
                              setOpenCategory(false);
                            }}
                            className={`flex items-center category__li tracking-[2px] !text-base ${
                              category?.name === "Премиум" &&
                              "!bg-[#4501BB] !text-[#fff] !font-bold !italic"
                            }`}
                          >
                            <img
                              className="mr-3"
                              src={URL + category.photo}
                              style={{
                                filter:
                                  category?.name === "Премиум" &&
                                  "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(227deg) brightness(106%) contrast(101%)",
                              }}
                              alt=""
                            />
                            {category.name}
                          </li>
                        ))}
                    <ul
                      className={`sub__category ${subCategoryState && "open"}`}
                    >
                      <div
                        onClick={() => {
                          dispatch(subCategoryFilter());
                          setSubCategoryState(false);
                        }}
                        className="flex items-center cursor-pointer gap-x-2 px-6 py-4 bg-white"
                      >
                        <MdOutlineArrowBackIosNew />
                        Назад
                      </div>
                      {subCategory?.map((sub, idx) => (
                        <li className="relative" key={idx}>
                          <Link
                            className="flex items-center"
                            to={`/filter/${sub.id}/page=1`}
                            onClick={() => {
                              setOpenCategory(false);
                              dispatch(subCategoryFilter(sub.id));
                            }}
                          >
                            <img
                              className="mr-3"
                              src={`${URL}${sub.photo}`}
                              alt=""
                            />
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div
                    className="nav__category__menu"
                    style={{ left: "-100%", top: 0 }}
                  ></div>
                )}
                <div className={`nav__item__search ml-8`}>
                  <div className="relative flex search__input">
                    <input
                      type="search"
                      onChange={(e) => {
                        let newFilter = {
                          ...filterProduct,
                          query: e.target.value,
                        };
                        setFilterProduct(newFilter);
                        dispatch(getProductsByFilter(newFilter));
                      }}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        navigate(`/search/product/${e.target.value}/1`)
                      }
                      className={`po-product py-2 w-full text-sm text-white rounded-md pl-4 pr-8 text-gray-900`}
                      placeholder="Я ищу..."
                    />
                    <span
                      onClick={() => {
                        navigate(`/search/product/${filterProduct.query}/1`);
                        setOpenMenuSearch(false);
                      }}
                      className="flex items-center justify-center pr-2"
                    >
                      <IoIosSearch
                        fill="#02308C"
                        className="hover:fill-white cursor-pointer"
                        size={26}
                      />
                    </span>
                    <div className="search__category">
                      {productFelter.map((product, idx) => (
                        <Link
                          key={idx}
                          to={`/add/${product.id}`}
                          onClick={() => setOpenMenuSearch(false)}
                          className="search__text"
                        >
                          <img src={URL + product.photo} alt="" />
                          {product.name}
                          <span>{product.price} ₽</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="nav__item__icons ml-6">
                  <MLink to={`/deliveries`}>
                    <MNav className={`nav__router__link`}>
                      <IoMdCube fill="#02308C" size={28} />
                      <span>
                        {language === "ru" && "Доставка"}
                        {language === "uz" && "Dostavka"}
                        {language === "en" && "Delivery"}
                      </span>
                    </MNav>
                  </MLink>
                  <MLink
                    to={`${reduxToken ? "/selected" : ""}`}
                    onClick={() => {
                      if (!reduxToken) {
                        setShowProfileModal(true);
                      }
                    }}
                  >
                    <MNav className={`nav__router__link`}>
                      <Badge
                        badgeContent={favoriteList?.length}
                        className="!mt-0"
                        color="error"
                      >
                        <RiHeartFill fill="#02308C" size={28} />
                      </Badge>
                      <span>
                        {language === "ru" && "Избранные"}
                        {language === "uz" && "Sevimlilar"}
                        {language === "en" && "Favorites"}
                      </span>
                    </MNav>
                  </MLink>
                  <MLink
                    onClick={() => {
                      dispatch(getCart());
                      if (!reduxToken) {
                        setShowProfileModal(true);
                      }
                    }}
                    to={`${reduxToken ? "/basket" : ""}`}
                  >
                    <MNav className={`nav__router__link `}>
                      <Badge
                        badgeContent={cartList?.length}
                        color="error"
                        className="!mt-0"
                      >
                        <IoCart fill="#02308C" size={28} />
                      </Badge>
                      <span>
                        {language === "ru" && "Корзина"}
                        {language === "uz" && "Savatcha"}
                        {language === "en" && "Basket"}
                      </span>
                    </MNav>
                  </MLink>

                  <MLink
                    to={`${reduxToken ? "/cabinet" : ""}`}
                    onClick={() => {
                      if (!reduxToken) {
                        setShowProfileModal(true);
                      }
                    }}
                    className="infopage_link relative"
                  >
                    <MNav
                      className={`nav__router__link ${
                        splitLocation[1] === "profile" ? "active" : ""
                      } nav__item__icon__rigth`}
                    >
                      <HiUser fill="#02308C" size={28} />
                      <span style={{ textAlign: "center" }}>
                        {user?.name || "Войти"}
                      </span>
                    </MNav>
                    {reduxToken && (
                      <div className="openProfile">
                        <div className="profile__dropdown">
                          <Link to="/cabinet" className="profile__header">
                            <div
                              className="profile__image"
                              style={{ width: "25px" }}
                            >
                              {user?.photo ? (
                                <img
                                  src={`${URL}${user?.photo}`}
                                  alt=""
                                  className=""
                                  style={{
                                    borderRadius: "50%",
                                    minWidth: "25px",
                                    height: "25px",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://admin-nova.ru//assets_files/images/user.png"
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="profile__title">
                              {user?.name || "Нету данных"}
                            </div>
                          </Link>
                          <div className="profile__bottom">
                            <ul className="profile__ul">
                              <li className="profile__item">
                                <Link to="/deliverycart">
                                  <AiOutlineRight />
                                  Мои заказы
                                </Link>
                              </li>
                              {/* <li className="profile__item">
                                <Link to="/message">
                                  <AiOutlineRight />
                                  Мои сообщения
                                </Link>
                              </li> */}
                              <li className="profile__item">
                                <Link to="/selected">
                                  <AiOutlineRight />
                                  Избранные товара
                                </Link>
                              </li>
                              {reduxToken ? (
                                <li
                                  className="profile__item"
                                  onClick={handleLogout}
                                >
                                  <AiOutlineRight />
                                  Выйти
                                </li>
                              ) : (
                                <li className="profile__item">
                                  <Link to="/firstregister">
                                    <AiOutlineRight />
                                    Войти
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </MLink>
                </div>
                <div className="navbar__menu__inner">
                  <IconButton
                    style={{ padding: "0" }}
                    onClick={() => {
                      if (!reduxToken) {
                        setShowFavorite(true);
                      } else {
                        navigate("/cabinet");
                      }
                    }}
                  >
                    <FaRegUser
                      fill="#02308C"
                      className="menu__inner__icons"
                      size={28}
                    />
                  </IconButton>
                  <Link to="/basket">
                    <AiOutlineShopping
                      className="menu__inner__icons"
                      size={34}
                      fill="#02308C"
                    />
                  </Link>
                  <IconButton
                    onClick={() => setOpenMenuSearch(true)}
                    style={{ padding: "0" }}
                  >
                    <FiSearch
                      stroke="#02308C"
                      className="menu__inner__icons"
                      size={32}
                    />
                  </IconButton>
                  <IconButton
                    style={{ padding: "0" }}
                    onClick={() => setOpenCategory(true)}
                  >
                    <FiMenu
                      stroke="#02308C"
                      className="menu__inner__icons"
                      size={36}
                    />
                  </IconButton>
                </div>
              </div>
            </MContainer>
          </MNavbar>
        </div>
      </div>
      {notification ? (
        <div
          onClick={handleNotification}
          className="w-full h-full fixed top-0 bottom-0"
          style={{ zIndex: "999" }}
        ></div>
      ) : null}
      {uopenMenuMobile ? (
        <div
          className={`uopenMenuMobile ${uopenMenuMobile ? "open" : ""}`}
          style={{ opacity: "1", visibility: "inherit", top: "0px" }}
        >
          <IconButton
            style={{ padding: "0" }}
            className="uopenMenuMobile-close-icon absolute"
            onClick={() => openMenuMobile(false)}
          >
            <IoIosClose fill="#fff" size={32} />
          </IconButton>
          <ul>
            {navCategoryList.map((category, index) => (
              <li>
                <Link
                  to={`/filter/${category.id}/page=1`}
                  onClick={() => setUopenMenuMobile(false)}
                  key={index}
                >
                  <img
                    src={`${URL}/${category.photo}`}
                    alt=""
                    className="mr-3"
                  />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={`uopenMenuMobile`}
          style={{ opacity: "0", visibility: "hidden", top: "-30px" }}
        ></div>
      )}
      {openMenuSearch ? (
        <div
          className={`search-menu-mobile ${
            openMenuSearch ? "search-open" : ""
          }`}
          style={{ opacity: "1", visibility: "inherit", top: "0px" }}
        >
          <IconButton
            style={{ padding: "0" }}
            className="search-menu-mobile-close-icon absolute"
            onClick={() => setOpenMenuSearch(false)}
          >
            <IoIosClose fill="#fff" size={32} />
          </IconButton>
          <div className={`nav__item__search ml-8`}>
            <div className="relative flex search__input">
              <input
                type="search"
                onChange={(e) => {
                  let newFilter = {
                    ...filterProduct,
                    query: e.target.value,
                  };
                  setFilterProduct(newFilter);
                  dispatch(getProductsByFilter(newFilter));
                }}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  navigate(`/search/product/${e.target.value}/1`)
                }
                className={`po-product py-2 w-full text-sm text-white rounded-md pl-4 pr-8 text-gray-900`}
                placeholder="Я ищу..."
              />
              <span
                onClick={() => {
                  navigate(`/search/product/${filterProduct.query}/1`);
                  setOpenMenuSearch(false);
                }}
                className="flex items-center justify-center pr-2"
              >
                <IoIosSearch
                  fill="#717171"
                  className="hover:fill-slate-700 cursor-pointer"
                  size={26}
                />
              </span>
              <div className="search__category">
                {productFelter.map((product, idx) => (
                  <Link
                    key={idx}
                    to={`/add/${product.id}`}
                    onClick={() => setOpenMenuSearch(false)}
                    className="search__text"
                  >
                    <img src={URL + product.photo} alt="" />
                    {product.name}
                    <span>{product.price}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`search-menu-mobile`}
          style={{ opacity: "0", visibility: "hidden", top: "-30px" }}
        ></div>
      )}
      {openProfileMenu ? (
        reduxToken ? (
          <div
            className={`openProfileMenu ${openProfileMenu ? "open" : ""}`}
            style={{ opacity: "1", visibility: "inherit", top: "0px" }}
          >
            <IconButton
              style={{ padding: "0" }}
              className="openProfileMenu-close-icon absolute"
              onClick={() => openProfileMenuFun(false)}
            >
              <IoIosClose fill="gray" size={32} />
            </IconButton>
            <ul>
              <li onClick={() => openProfileMenuFun(false)}>
                <Link to="/deliverycart">Мои заказы</Link>
              </li>
              <li onClick={() => openProfileMenuFun(false)}>
                <Link to="/selected">Избранные товара</Link>
              </li>
              <li onClick={() => openProfileMenuFun(false)}>
                <Link to="/contacts">Контакты</Link>
              </li>
              <li>
                <a
                  className="flex items-center gap-2"
                  href={`tel:${call_center?.content
                    ?.replace(/\(|\)| /g, "")
                    ?.split(" ")
                    .join("")}`}
                >
                  <BsTelephone fill="#717171b3" size={16} />
                  {call_center?.content}
                </a>
              </li>
              <li
                style={{
                  color: "rgba(113, 113, 113, 0.7)",
                  padding: "8px 22px",
                }}
                onClick={handleLogout}
              >
                Выйти
              </li>
            </ul>
          </div>
        ) : (
          <div
            className={`openProfileMenu2 ${openProfileMenu ? "open" : ""}`}
            onClick={() => setOpenProfileMenu(false)}
            style={{ opacity: "1", visibility: "inherit", top: "0px" }}
          >
            <IconButton
              style={{ padding: "0" }}
              className="openProfileMenu-close-icon absolute"
              onClick={() => openProfileMenuFun(false)}
            >
              <IoIosClose fill="gray" size={32} />
            </IconButton>
            <ul className="bg-white py-10" style={{ width: "95%" }}>
              <div className="flex flex-col items-center justify-center gap-4">
                <Button
                  variant="outlined"
                  className="!w-full"
                  color="primary"
                  onClick={() => {
                    navigate("/firstregister");
                  }}
                >
                  Зарегистрироваться
                </Button>
                <Button
                  variant="contained"
                  className="!w-full"
                  color="primary"
                  onClick={() => {
                    navigate("/firstregister");
                  }}
                >
                  Войти
                </Button>
              </div>
            </ul>
          </div>
        )
      ) : (
        <div
          className={`openProfileMenu`}
          style={{ opacity: "0", visibility: "hidden", top: "-30px" }}
        ></div>
      )}
    </>
  );
};

export default Navbar;
