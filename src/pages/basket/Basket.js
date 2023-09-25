import React, { useEffect, useState } from "react";
import Title from "../../component/Title/Title";
import Counter from "../../component/Counter/Counter";
import { MContainer, Link } from "../../element/Elemens";
import { toast } from "react-toastify";
import { VscTrash } from "react-icons/vsc";
import "../../assets/scss/_basket.scss";
import {
  postCartAdd,
  postCartRemove,
  postCartMinus,
  postCartClear,
  getCart,
} from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import request from "../../helpers/requests";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/lazy";
import { getDelivery, getPayment } from "../../redux/actions/productActions";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { returnStep } from "../../redux/actions/orderActions";
const URL = "https://admin-nova.ru/";

const Basket = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [address, setAddress] = useState(user?.last_address);
  const [receiver, setReceiver] = useState(0);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [openBox, setOpenBox] = useState(false);
  const cartList = useSelector((state) => state.cart.list);

  useEffect(() => {
    dispatch(getDelivery());
    dispatch(getPayment());
  }, []);

  const { oneCart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [oneCart]);

  const { step } = useSelector((state) => state.order);
  const { pay } = useSelector((state) => state.order);
  const { payLoading } = useSelector((state) => state.order);

  let total_amount = 0;

  cartList?.forEach((item) => {
    total_amount += item?.price;
  });

  // cart
  const sendOrder = (params) => {
    dispatch({ type: "fetch_send_order_start", payload: params });

    request
      .sendOrder(params)
      .then(({ data }) => {
        dispatch({ type: "fetch_send_order_success", payload: data });
        // payment_id === 4 && navigate("/deliverycart");
        window.localStorage.removeItem("novamarkt_order_id");
        window.localStorage.removeItem("novamarkt_order_receipt_id");
        toast.success("Успешно пошел на заказ");
      })
      .catch(({ response }) => {
        let message1 = response.data.errors?.address && "Адрес: Заполните поле";
        let message2 =
          response.data.errors?.delivery_id && "Выберите способ доставки";
        let message3 =
          response.data.errors?.payment_id && "Выберите способ оплаты";
        let message4 =
          response.data?.name === "Unauthorized" && "Зарегистрируйтесь";
        let message5 =
          response.data?.errors?.cart && response.data?.errors?.cart;
        toast.error(message1);
        toast.error(message2);
        toast.error(message3);
        toast.error(message4);
        toast.error(message5);

        dispatch({ type: "fetch_send_order_error", payload: message1 });
      });
  };

  const createCheck = (params) => {
    dispatch({ type: "create_check_start", payload: params });

    request
      .createCheck(params)
      .then(({ data }) => {
        dispatch({ type: "create_check_success", payload: data });
      })
      .catch(({ response }) => {
        let message = response && response?.data?.errors?.message;
        toast.error(message);

        dispatch({ type: "create_check_error", payload: message });
      });
  };

  const payOrder = (params) => {
    dispatch({ type: "post_pay_order_start", payload: params });

    request
      .payOrder(params)
      .then(({ data }) => {
        dispatch({ type: "post_pay_order_success", payload: data });
      })
      .catch(({ response }) => {
        dispatch({ type: "post_pay_order_error", payload: response });
      });
  };

  const order_id = window.localStorage.getItem("novamarkt_order_id");
  const order_receipt_id = window.localStorage.getItem(
    "novamarkt_order_receipt_id"
  );
  const orderSend = useSelector((state) => state.order.orderSend);

  useEffect(() => {
    if (step === true) {
      createCheck({ order_id: order_id });
      payOrder({
        order_id: orderSend.id,
      });
      if (pay?.pay_url) {
        // window.location.href = pay.pay_url;
        dispatch(returnStep());
      }
    }
  }, [step, pay, payLoading]);

  const [sidebarTop, setSidebarTop] = useState(undefined);

  useEffect(() => {
    const chatEl = document
      .querySelector(".total__box")
      .getBoundingClientRect();
    setSidebarTop(chatEl.top);
  }, []);

  useEffect(() => {
    if (!sidebarTop) return;

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [sidebarTop]);

  const isSticky = (e) => {
    const chatEl = document.querySelector(".total__box");
    const scrollTop = window.scrollY;
    if (scrollTop >= sidebarTop - 10) {
      chatEl.classList.add("is-sticky");
    } else {
      chatEl.classList.remove("is-sticky");
    }
  };

  return (
    <>
      <MContainer>
        <div className="pages-link mt-4">
          <Link className="c8" to="/">
            Главная страница /{" "}
          </Link>
          <Link className="c8" to="">
            Корзина
          </Link>
        </div>
      </MContainer>
      <MContainer className="md:py-8 py-4">
        <Title name="Корзина" />
        <div className="grid grid-cols-10 gap-4 pb-6">
          <div className="col-span-7">
            {cartList?.length > 0
              ? cartList?.map((cart, index) => (
                  <div key={index}>
                    <div className="basket__item">
                      <VscTrash
                        className="korzina-trash"
                        fill="#FF1B1B"
                        size={28}
                        onClick={() => {
                          dispatch(
                            postCartRemove({ product_id: cart.product.id })
                          );
                        }}
                      />
                      <div className="basket__left">
                        <Link
                          to={`/add/${cart?.product?.id}`}
                          className="basket__image relative"
                        >
                          <img src={`${URL}${cart.product?.photo}`} alt="" />
                          {cart.product?.discount ? (
                            <div className="basket-discount absolute bottom-0 right-0">
                              {cart.product?.discount}%
                            </div>
                          ) : null}
                        </Link>
                        <div className="basket__box">
                          <div className="grid-item">
                            <h4 className="mb-4">{cart.product?.name}</h4>
                            <h5 className="mb-4">
                              <span className="flex flex-wrap">
                                {cart.product?.color?.name}{" "}
                                {cart.productFilter?.map((item) => (
                                  <div
                                    style={{
                                      height: "max-content",
                                      width: "max-content",
                                      color: "#fff",
                                      fontSize: "14px",
                                      padding: "1px",
                                      marginLeft: "2px",
                                      background: "#131e3d",
                                    }}
                                  >
                                    {item?.value_ru}
                                  </div>
                                ))}
                              </span>
                            </h5>
                            <div className="basket__price">
                              {cart.product?.price_old ? (
                                <span className="basket-price_old">
                                  {cart.product?.price_old?.toLocaleString(
                                    "ru-RU"
                                  )}{" "}
                                  ₽
                                </span>
                              ) : null}
                              <h3>
                                {cart.product?.price?.toLocaleString("ru-RU")} ₽
                              </h3>
                            </div>
                          </div>
                          <div className="grid-item">
                            {cart?.delivery && (
                              <div className="bank">
                                В Россия через {cart?.delivery}
                              </div>
                            )}
                          </div>
                          <div className="grid-item self-end">
                            <div className="basket__count">
                              <Counter
                                product_id={cart.product?.id}
                                count_product={cart.amount}
                                onClickIncrement={(product_id) => {
                                  dispatch(postCartMinus({ product_id }));
                                }}
                                onClickDecrement={(product_id_count) => {
                                  dispatch(
                                    postCartAdd({
                                      amount: 1,
                                      product_id: product_id_count,
                                    })
                                  );
                                  dispatch(getCart());
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : "Ваша корзина пуста"}
            {cartList?.length > 0 && (
              <div className="flex justify-end mt-8">
                <Button
                  onClick={() => {
                    dispatch(postCartClear());
                  }}
                  variant="outlined"
                >
                  Очистить корзину
                </Button>
              </div>
            )}
            <div className="basket__delivery mt-8">
              <div className={`basket-50 mt-4`}>
                <h5>Способ доставки</h5>
                <div className="choosed__adress mt-4">
                  Россия, {address && address}
                </div>
                <TextField
                  id="outlined-basic"
                  label={address || "Напишите адрес"}
                  value={address}
                  className="inputProps !mt-4 select bg-none w-full"
                  variant="outlined"
                  size="small"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className={`login__box !mt-0`}>
                <div className="login__title">
                  <h4>Ваши данные</h4>
                  {user.phone ? null : <Link to="/firstregister">Войти</Link>}
                </div>
                <div className="message mt-4">
                  <label htmlFor="input6">Получать буду не я</label>
                  <input
                    onClick={() => setOpenBox((value) => !value)}
                    id="input6"
                    type="checkbox"
                    onChange={(e) => setReceiver(e.target.checked ? 1 : 0)}
                  />
                </div>
                <div className={`${openBox ? "!hidden" : "!block"}`}>
                  <div className="mt-4">
                    <div className="login__item mr-2">
                      <h5>Имя</h5>
                      <input
                        type="text"
                        value={user.name}
                        placeholder="Ваше имя"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="login__item w-full mt-4 mr-2">
                      <h5>Контактный телефон</h5>
                      <input
                        type="tel"
                        value={user.phone}
                        placeholder="Телефон"
                      />
                    </div>
                  </div>
                  <div className="login__item mt-4">
                    <h5>Электронная почта</h5>
                    <input
                      type="email"
                      value={user.email}
                      placeholder="E-mail"
                    />
                  </div>
                </div>
                <div className={`${openBox ? "!block" : "!hidden"}`}>
                  <div className="mt-4">
                    <div className="login__item mr-2">
                      <h5>Имя</h5>
                      <input
                        type="text"
                        placeholder={"Ваше имя"}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="login__item mt-4 mr-2">
                      <h5>Контактный телефон</h5>
                      <input
                        type="tel"
                        placeholder={"Телефон"}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="login__item mt-4">
                    <h5>Электронная почта</h5>
                    <input
                      type="email"
                      placeholder="E-mail"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="total__box">
              <div className="flex justify-between mt-4">
                <h5 className="total__left">Товары ({cartList?.length})</h5>
                <p className="total__right">
                  {total_amount?.toLocaleString("ru-RU")} ₽
                </p>
              </div>
              <div className="flex justify-between flex-wrap mt-2"></div>
              <div className="flex justify-between items-center flex-wrap mt-4">
                <h5 className="total__title">Итого</h5>
                <div>{total_amount?.toLocaleString("ru-RU")} ₽</div>
              </div>
              <div className="my-5">
                <button
                  onClick={() => {
                    sendOrder({
                      address: address,
                      name,
                      email,
                      phone,
                      receiver,
                      delivery_id: 5,
                      payment_id: 6,
                    });
                    dispatch(getCart());
                  }}
                  className="total__button"
                >
                  Заказать
                </button>
              </div>
              <div className="total__agree">
                <label className="basket__spec flex items-center">
                  <input defaultChecked className="mr-2" type="checkbox" />
                  <span>
                    Согласен с правилами пользования торговой площадкой и правилами возврата
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </MContainer>
    </>
  );
};

export default Basket;
