import React, { useEffect } from "react";
import { MLink } from "../../element/Elemens";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import "../../assets/scss/_cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { createFavorite } from "../../redux/actions/favoriteActions";
import { getCart, postCartAdd } from "../../redux/actions/cartActions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import { IoCart } from "react-icons/io5";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import heartSvg1 from "../../assets/images/Stroke 1 (2).svg";
import heartSvg2 from "../../assets/images/Group 2059.svg";
const token = window.localStorage.getItem("novamarktToken");

export const Cart = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [price_old, setPriceOld] = useState();
  const handlePriceOld = async () => {
    let oldPrice = (await (product?.price / (100 - product?.discount))) * 100;
    if (
      oldPrice !== NaN &&
      oldPrice !== Infinity &&
      product?.price !== oldPrice &&
      product?.discount !== 0 &&
      product?.discount !== null
    ) {
      await setPriceOld(
        oldPrice?.toLocaleString("ru-RU", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      );
    } else {
      setPriceOld(undefined);
    }
  };
  handlePriceOld();
  const [show, setShow] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const currency = window.localStorage.getItem("novamarkt-Content-currency");
  const { oneCart } = useSelector((state) => state.favorite);
  const { toBuy } = useSelector((state) => state.cart);
  const { reduxToken } = useSelector((state) => state.user);
  const language = window.localStorage.getItem("novamarkt-Content-language");
  const [favorite, setFavorite] = useState(false);
  const favoriteList = useSelector((state) => state.favorite.favoritiesList);
  const favoritesId = favoriteList?.map((item) => item.id);

  useEffect(() => {
    if (toBuy === true) {
      dispatch(getCart());
    }
  }, [toBuy]);

  useEffect(() => {
    if (favoritesId?.includes(+product.id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favoritesId, favoriteList]);

  const cartList = useSelector((state) => state.cart.list);
  const cartListId = cartList?.map((item) => item?.product?.id);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (cartListId?.includes(+product.id)) {
      setInCart(true);
    }
  }, [cartList, cartListId]);

  return (
    <>
      <ErrorModal
        text="Зарегистрируйтесь чтобы добавить в корзину"
        onClose={() => setShow(false)}
        showModal={show}
      />
      <ErrorModal
        text="Зарегистрируйтесь чтобы добавить в избранное"
        onClose={() => setShowFavorite(false)}
        showModal={showFavorite}
      />
      <div className="cart__box shadow-xl">
        <div className="cart__image overflow-hidden">
          <Link to={"/add/" + product?.id}>
            <img
              src={`https://admin-nova.ru/${product?.photo}`}
              alt="not found"
            />
          </Link>
          {/* <Link to={"/add/" + product?.id} className="fast__review">
            Быстрый просмотр
          </Link> */}
          {product?.discount ? (
            <span className="skidka">{product?.discount} %</span>
          ) : null}
          {favorite ? (
            <Button
              className="heart"
              onClick={() => {
                if (!reduxToken) {
                  setShowFavorite(true);
                } else {
                  dispatch(createFavorite({ product_id: product.id }));
                }
              }}
            >
              <img src={heartSvg1} alt="" />
            </Button>
          ) : (
            <Button
              className="heart"
              onClick={() => {
                if (!reduxToken) {
                  setShowFavorite(true);
                } else {
                  dispatch(createFavorite({ product_id: product.id }));
                }
              }}
            >
              <img src={heartSvg2} alt="" />
            </Button>
          )}
        </div>
        <div className="cart__info">
          <div className="flex items-start justify-between mt-3">
            <Link
              to={`/filter/${product.category?.id}/page=1`}
              className="cart__cat duration-300 hover:underline"
            >
              {product?.category?.name}
            </Link>
            {/* <div className="cart__brand">{product.brand?.name}</div> */}
          </div>
          <div className="cart__title">
            <MLink to={`/add/${product?.id}`}>
              {language === "ru" && product?.name_ru}
              {language === "uz" && product?.name_uz}
              {language === "en" && product?.name_en}
            </MLink>
            {product?.price !== false && (
              <div className="cart__price">
                <h5>
                  {currency === "Сум" && product?.price
                    ? product?.price?.toLocaleString("ru-RU") + " " + "₽"
                    : undefined}
                  {currency === "У.е." && product?.price_usd
                    ? product?.price_usd + " " + "У.е."
                    : undefined}
                </h5>
                {price_old && (
                  <p className="">
                    {price_old} ₽
                    {/* {product?.price_old
                    ? product?.price_old + product?.currency?.name
                    : ""} */}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="cart__add">
            <Button
              variant={`${inCart ? "contained" : "outlined"}`}
              className="add"
              size="large"
              endIcon={<IoCart fill={`${inCart ? "#fff" : "#02308C"}`} />}
              onClick={() => {
                if (!reduxToken) {
                  setShow(true);
                } else {
                  dispatch(postCartAdd({ product_id: product.id, amount: 1 }));
                }
              }}
            >
              {inCart ? (
                <span className="!text-white">В корзине</span>
              ) : (
                <span className="!text-[#02308c]">В корзину</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
