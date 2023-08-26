import React, { useState } from "react";
import { MContainer } from "../../element/Elemens";
import "../../assets/scss/_deliverycart.scss";
import SecondNavbar from "../../component/layout/SecondNavbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  postRefund,
  endOrderStatus,
  waitOplataStatus,
  waitSendStatus,
  orderSendStatus,
  waitReviewStatus,
  refundList,
  pendingStatus,
  acceptedStatus,
  canceledStatus,
  // payOrder,
} from "../../redux/actions/orderActions";
import { MdCancelScheduleSend } from "react-icons/md";
import Button from "@mui/material/Button";
import PreLoader from "../../component/PreLoader/PreLoader";
import { createChatAdmin, getMe } from "../../redux/actions/userActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { AiOutlineComment } from "react-icons/ai";
import { createComment } from "../../redux/actions/cartActions";
import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import request from "../../helpers/requests";
const URL = `${process.env.REACT_APP_API_DOMAIN}`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #e6e6e6",
  background: "#fff",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #e6e6e6",
  background: "#fff",
  boxShadow: 24,
  p: 4,
};

const DeliveryCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const [filter, setFilter] = useState({ status: 0 });
  const [active, setActive] = useState("");
  const [returnProduct, setReturnProduct] = useState(false);

  const [product_id, setProductId] = useState();
  const [productIdByComment, setProductIdByComment] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const handleOpen2 = (order) => {
    setOpen2(true);
    setProductId(order);
  };
  const handleOpen3 = (e) => {
    setOpen3(true);
    setProductIdByComment(e);
  };
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);

  useEffect(() => {
    dispatch(refundList());
    dispatch(waitSendStatus());
    dispatch(orderSendStatus());
    dispatch(waitReviewStatus());
    dispatch(endOrderStatus());
    dispatch(waitOplataStatus());
    dispatch(getMe());
  }, []);
  const [rate, setRate] = useState("");
  const [review, setReview] = useState("");
  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  const { loading } = useSelector((state) => state.order);
  const profile = useSelector((state) => state.user.user);

  const refunds = useSelector((state) => state.order.refundList);

  // orders by status
  const pendingStatusList = useSelector((state) => state.order.pendingStatus);
  const acceptedStatusList = useSelector((state) => state.order.acceptedStatus);
  const canceledStatusList = useSelector((state) => state.order.canceledStatus);
  const waitOplataStatusList = useSelector(
    (state) => state.order.waitOplataStatus
  );
  const waitSendStatusList = useSelector((state) => state.order.waitSendStatus);
  const orderSendStatusList = useSelector(
    (state) => state.order.orderSendStatus
  );
  const waitReviewStatusList = useSelector(
    (state) => state.order.waitReviewStatus
  );
  const endOrderStatusList = useSelector(
    (state) => state.order.waitOplataStatus
  );
  const orderList = useSelector((state) => state.order.list);
  const { pay } = useSelector((state) => state.order);
  const { payLoading } = useSelector((state) => state.order);

  useEffect(() => {
    if (pay?.pay_url) {
      window.location.href = `${pay?.pay_url}`;
    }
  }, [pay]);

  const handlePrice = (item) => {
    let price = 0;
    item?.orderProducts?.forEach((item) => {
      price += item?.amount * item?.price;
    });
    return price?.toLocaleString("ru-RU");
  };

  const [selectedOrder, setSelectedOrder] = React.useState("Ожидает принятия");

  const handleChange = (event) => {
    setSelectedOrder(event.target.value);
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={payLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SecondNavbar />
      <div className="back">
        <MContainer className="md:pb-16 md:pt-4 py-8 delivery-carts">
          <div className="delivery-cart__title">
            Мои заказы{" "}
            <FormControl size="small" style={{ minWidth: "220px" }}>
              <InputLabel id="demo-simple-select-label">
                Статус заказа
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOrder}
                label="Статус заказа"
                onChange={handleChange}
              >
                <MenuItem
                  onClick={() => {
                    setFilter(0);
                    dispatch(pendingStatus());
                    setReturnProduct(false);
                  }}
                  value="Ожидает принятия"
                  defaultChecked={true}
                >
                  В ожидании
                  <span className="order-span">
                    {pendingStatusList?.length}
                  </span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilter(1);
                    dispatch(acceptedStatus());
                    setReturnProduct(false);
                  }}
                  value="Принятые"
                >
                  Принятые
                  <span className="order-span">
                    {acceptedStatusList?.length}
                  </span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilter(2);
                    dispatch(canceledStatus());
                    setReturnProduct(false);
                  }}
                  value="Отмененные"
                >
                  Отмененные
                  <span className="order-span">
                    {canceledStatusList?.length}
                  </span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilter(3);
                    setReturnProduct(false);
                    dispatch(waitSendStatus());
                  }}
                  value="На доставке"
                >
                  На доставке
                  <span className="order-span">
                    {waitSendStatusList?.length}
                  </span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilter(4);
                    setReturnProduct(false);
                    dispatch(orderSendStatus());
                  }}
                  value="В пути"
                >
                  В пути
                  <span className="order-span">
                    {orderSendStatusList?.length}
                  </span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setReturnProduct(true);
                    setFilter("");
                  }}
                  value="Возвраты"
                >
                  Возвраты
                  <span className="order-span">{refunds?.length}</span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilter(5);
                    dispatch(endOrderStatus());
                    setReturnProduct(false);
                  }}
                  value="Завершенные заказы"
                >
                  Завершенные заказы
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          {loading && <PreLoader />}
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box style={style} className="p-4">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Message
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                  >
                    <TextField
                      onChange={(e) => setMessage(e.target.value)}
                      fullWidth
                      label="Ваше сообшение"
                      id="fullWidth"
                    />
                  </Box>
                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={() =>
                        dispatch(
                          postRefund({
                            order_product_id: product_id,
                            message: message,
                          })
                        )
                      }
                      variant="contained"
                    >
                      Сохранить
                    </Button>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
          <div>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box style={style2}>
                <div
                  style={{ maxHeight: "500px" }}
                  className="modal-cart overflow-y-auto"
                >
                  {product_id?.map((item, idx) => (
                    <div className="cart-box flex border" key={idx}>
                      <img
                        className="modal-img mr-4"
                        src={URL + item.product?.photo}
                        alt=""
                      />
                      <div>
                        <div className="md:text-2xl">{item.product?.name}</div>
                        <div className="md:text-2xl">{item.product?.price}</div>
                      </div>
                      <Button
                        variant="contained"
                        className="!normal-case !h-max !ml-auto !mt-auto"
                        onClick={(e) => handleOpen3(e.target.value)}
                        value={item.product?.id}
                      >
                        Для этого
                      </Button>
                    </div>
                  ))}
                </div>
              </Box>
            </Modal>
          </div>
          <div>
            <Modal
              open={open3}
              onClose={handleClose3}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box style={style} className="p-4 customer">
                <div
                  className="c__box bg !ml-0 !w-full"
                  style={{ background: "#84A9C0" }}
                >
                  <div className="box__title">У вас есть отзыв</div>
                  <ReactStars
                    onChange={ratingChanged}
                    value={0}
                    count={5}
                    size={24}
                    activeColor="#FF9500"
                  />
                  <textarea
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                    placeholder="Ваш отзыв"
                  ></textarea>
                  <button
                    onClick={() => {
                      dispatch(
                        createComment({
                          review: review,
                          rate: rate,
                          product_id: productIdByComment,
                        })
                      );
                      handleClose3();
                      // dispatch(getComments(id));
                    }}
                  >
                    Отправить вопрос
                  </button>
                </div>
              </Box>
            </Modal>
          </div>
          {!loading && (
            <div className="order__carts">
              {returnProduct === false
                ? orderList?.map((order, index) => (
                    <>
                      <div key={index} className="zakaz my-10">
                        <h1 className="!m-0 !p-0">Заказ №{order.id}</h1>
                        {/* <span>Доставка: {order.delivery?.name}</span> */}
                        {/* <span>{order.phone}</span> */}
                        <span>Адрес: {order.address}</span>
                      </div>
                      {order?.orderProducts?.map((item, idx) => (
                        <div
                          className="cart delivery__cart !bg-white"
                          key={idx}
                        >
                          <div className="cart__img">
                            <Link
                              to={`/add/${item?.product?.id}`}
                              className="image relative"
                            >
                              {!item?.product?.photo ? (
                                <img
                                  src="https://admin-nova.ru//assets_files/images/no-photo.png"
                                  alt="Product"
                                />
                              ) : (
                                <img
                                  src={`${URL}${item?.product?.photo}`}
                                  alt="not found"
                                />
                              )}
                            </Link>
                            <div className="cart__info">
                              <div>
                                <div className="title">
                                  {item?.product?.name}
                                </div>
                                {item?.product?.color?.name && (
                                  <div className="flex items-center">
                                    Цвет:
                                    <p className="my-2 ml-1 !text-center text-sm !text-black p-1">
                                      {item?.product?.color?.name}
                                    </p>
                                  </div>
                                )}
                                {item?.product?.brand?.name && (
                                  <p>Бренд: {item?.product?.brand?.name}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="order !pt-0">
                            {order.amount ? (
                              <p>
                                Количество:{" "}
                                <span>
                                  {order?.amount} {item?.product?.unit?.name}
                                </span>
                              </p>
                            ) : null}
                            <div className="dostavka__dostavka">
                              Доставка: {order.delivery?.name}
                            </div>
                            <div className="font-bold date-order-date">
                              Дата заказа: {order.date?.split(" ")[0]}
                            </div>
                          </div>
                          <div className="price">
                            <span id="price">
                              {item?.product?.price?.toLocaleString("ru-RU")} ₽
                              {/* {item?.product?.currency?.name} */}
                            </span>
                            <span className="text-right oplata__oplata">
                              Оплата: {order.payment?.name}
                            </span>
                            {/* {order.status === 5 && ( */}
                            {/* <Button
                            onClick={() => handleOpen(order.id)}
                            className="!w-max !ml-auto"
                          >
                            Сделать возврат
                          </Button> */}
                            {/* )} */}
                          </div>
                        </div>
                      ))}
                      {/* <OrderCart key={index} order={order} /> */}
                      <div className="total md:flex items-center justify-between">
                        <div className="whitespace-nowrap">
                          Общая сумма:
                          {/* <span>{order.price?.toLocaleString("ru-RU")} ₽</span> */}
                          <span>{handlePrice(order)} ₽</span>
                        </div>
                        {/* <div className="!text-2xl">
                          Оплата: {order.payment?.name}
                        </div> */}
                        <span className="md:block flex justify-between !text-lg !text-black">
                          {order.status === 5 && (
                            <Button
                              startIcon={<AiOutlineComment />}
                              className="!normal-case md:!text-base !text-sm md:!p-auto !px-2"
                              variant="contained"
                              onClick={() => handleOpen2(order.orderProducts)}
                              value={order.id}
                            >
                              Оставить отзыв
                            </Button>
                          )}
                          {order.status === 5 && (
                            <Button
                              onClick={() => {
                                dispatch(
                                  createChatAdmin({
                                    name: profile.name,
                                    email: profile.email,
                                    message: `Я хочу отменить заказ №${order.id}`,
                                  })
                                );
                                navigate("/message/admin");
                              }}
                              className="!ml-2 !w-max !ml-auto !normal-case md:!text-base !text-sm md:!p-auto !px-2"
                              variant="contained"
                              startIcon={<MdCancelScheduleSend />}
                              style={{ background: "#84A9C0" }}
                            >
                              Отменить заказ
                            </Button>
                          )}
                          {order.status === 0 && order.payment?.id === 6 && (
                            <Button
                              onClick={() => {
                                payOrder({
                                  order_id: order.id,
                                });
                              }}
                              variant="outlined"
                              color="primary"
                            >
                              Оплатить
                            </Button>
                          )}
                        </span>
                      </div>
                    </>
                  ))
                : refunds?.map((item) => (
                    <div className="cart delivery__cart" key={item.id}>
                      <div className="cart__img">
                        <div className="image relative">
                          <img src={URL + item?.product?.photo} alt="Product" />
                        </div>
                        <div className="cart__info">
                          <div>
                            <p className="my-2">{item?.product?.name}</p>
                            <p className="my-2">Причина: {item?.message}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </MContainer>
      </div>
    </div>
  );
};

export default DeliveryCart;
