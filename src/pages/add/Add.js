import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MContainer } from "../../element/Elemens";
import "../../assets/scss/_add.scss";
import "../../assets/scss/_counter.scss";
import TabsMui from "@mui/material/Tabs";
import TabMui from "@mui/material/Tab";
import { ProgressBarLine } from "react-progressbar-line";
import Title from "../../component/Title/Title";
import { Navigation, Pagination, Scrollbar, A11y, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/lazy";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import {
  getProductOne,
  relatedProducts,
} from "../../redux/actions/productActions";
import {
  getCart,
  getCommentFilterWithDate,
  getCommentFilterWithRate,
  getComments,
  postCartAdd,
} from "../../redux/actions/cartActions";
import { Cart } from "../../component/Cart/Cart";
import { createFavorite } from "../../redux/actions/favoriteActions";
import { getRegions } from "../../redux/actions/categoryActions";
import parse from "html-react-parser";
import PreLoader from "../../component/PreLoader/PreLoader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RiHeartFill } from "react-icons/ri";
import { RiHeartLine } from "react-icons/ri";
import Button from "@mui/material/Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import NavbarMenu from "../../container/NavbarMenu";
import ErrorModal from "../../component/ErrorModal/ErrorModal";
import { ProductOrderLoading } from "../../component/loading/ProductOrderLoading";
import { toast } from "react-toastify";

const API = `${process.env.REACT_APP_API_DOMAIN}`;
const language = window.localStorage.getItem("novamarkt-Content-language");

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "50%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Add = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    dispatch(getProductOne(id));
    dispatch(relatedProducts(id));
    dispatch(getComments(id));
  }, [id]);

  const currency = window.localStorage.getItem("novamarkt-Content-currency");

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [muiCharacterTab, setMuiCharacterTab] = useState(0);

  const handleCharacterTab = (e, value) => {
    setMuiCharacterTab(value);
  };

  const [showModal, setShowModal] = useState(false);
  const [sortComment, setSortComment] = useState();

  const productOne = useSelector((state) => state.product.data);
  const { dataLoading } = useSelector((state) => state.product);
  const { loading3 } = useSelector((state) => state.cart);
  const [favorite, setFavorite] = useState(productOne?.shop?.isFavorite);
  const comments = useSelector((state) => state.cart.commentList);
  const related_products = useSelector(
    (state) => state.product.related_products
  );
  const desc = String(productOne.description);
  const comp = String(productOne.composition);

  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(productOne.rating);
  const ratingAsync = async () => {
    await productOne.rating;
    if (productOne.rating !== null && productOne.rating !== undefined) {
      setRating(productOne.rating);
    }
  };

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };
  const [slice, setSlice] = useState(5);
  const handleSlice = (e) => {
    setSlice(e);
  };
  const [detailCount, setDetailCount] = useState(1);
  const [reviewsSlice, setReviewsSlice] = useState(3);
  const handleReviewSlice = (e) => {
    setReviewsSlice(e);
  };
  const minusCounter = (value) => {
    if (detailCount <= 1) {
    } else {
      setDetailCount(value - 1);
    }
  };
  const plusCounter = (value) => {
    setDetailCount(value + 1);
  };
  const colorPhoto = productOne.products?.find((item, index) => index === 0);
  let [sizesArr, setSizesArr] = useState();
  let [currentSizeId, setCurrentSizeId] = useState(0);
  const handleSizes = async () => {
    const sizes = await productOne?.filters?.find((item) => {
      return item.name === "Размер";
    });
    return setSizesArr(sizes);
  };
  handleSizes();
  const bgColorName = productOne?.color?.color;
  let gallery = [];

  const galleryImage = async () => {
    await productOne?.gallery?.forEach((item) => {
      gallery.push({
        original: `https://admin-nova.ru${item}`,
        thumbnail: `https://admin-nova.ru${item}`,
      });
    });
  };
  galleryImage();
  const productColors = [];
  const getProductColor = async () => {
    await productOne?.productColors?.forEach((item) => {
      productColors.push(item);
    });
  };
  getProductColor();
  const { option } = useSelector((state) => state.product);

  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    const category = productOne?.category_full_array?.find((item, idx) => {
      return idx === 0;
    });
    if (category) {
      setCategoryName(category);
    }
  }, [productOne, id]);
  // colorImage();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const { reduxToken } = useSelector((state) => state.user);
  const [favoriteAdd, setFavoriteAdd] = useState(false);
  const favoriteList = useSelector((state) => state.favorite.favoritiesList);
  const favoritesId = favoriteList?.map((item) => item.id);

  useEffect(() => {
    if (favoritesId?.includes(+productOne.id)) {
      setFavoriteAdd(true);
    } else {
      setFavoriteAdd(false);
    }
  }, [favoritesId, favoriteList]);

  const [price_old, setPriceOld] = useState();
  const handlePriceOld = async () => {
    let oldPrice =
      (await (productOne?.price / (100 - productOne?.discount))) * 100;
    if (
      oldPrice !== NaN &&
      oldPrice !== Infinity &&
      productOne?.price !== oldPrice &&
      productOne?.discount !== 0 &&
      productOne?.discount !== null
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

  const cartList = useSelector((state) => state.cart.list);
  const cartListId = cartList?.map((item) => item?.product?.id);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (cartListId?.includes(+productOne.id)) {
      setInCart(true);
    }
  }, [cartList, cartListId]);

  return (
    <>
      <ErrorModal
        showModal={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        text="Зарегистрируйтесь чтобы написать"
      />
      {dataLoading ? (
        <ProductOrderLoading />
      ) : (
        <div className="add-product pb-12" key={id}>
          <NavbarMenu />
          <MContainer className="!my-4 c8">
            <Link to="/">Главная страница / </Link>
            <Link to={`/products-by-category/${productOne.category?.id}`}>
              {productOne?.category ? productOne?.category.name : ""}
            </Link>
          </MContainer>
          <MContainer>
            <div className="product-list">
              <div
                className="product__img relative"
                style={{
                  disply: "flex",
                }}
              >
                <div
                  className="relative"
                  style={{ width: "-webkit-fill-available" }}
                >
                  <div
                    onClick={() => setOpenModal(false)}
                    className={`${
                      openModal ? "fixed" : "hidden"
                    } top-0 right-0 bottom-0 left-0`}
                    style={{ background: "rgba(0,0,0,0.5)", zIndex: "99999" }}
                  ></div>
                  <div
                    onClick={() => setOpenModal(true)}
                    className={`${
                      openModal ? "block" : "hidden"
                    } fixed h-3/5 w-3/5 mx-auto top-0 left-0 right-0 bg-white`}
                    style={{
                      transform: "translate(0%,50%)",
                      zIndex: "999999",
                    }}
                  >
                    <Swiper
                      modules={[Navigation, Pagination, Scrollbar, A11y, Lazy]}
                      spaceBetween={10}
                      slidesPerView={1}
                      navigation
                      loop
                      pagination={{ clickable: true }}
                      lazy={true}
                      style={{ height: "-webkit-fill-available" }}
                    >
                      {gallery.map((slider, index) => (
                        <SwiperSlide key={index} style={{ height: "80%" }}>
                          <img
                            data-src={`${slider.original}`}
                            alt=""
                            style={{ height: "-webkit-fill-available" }}
                            className="swiper-lazy !object-contain"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <ImageGallery
                    items={gallery}
                    autoPlay={true}
                    thumbnailPosition={"bottom"}
                    showPlayButton={false}
                    showBullets={true}
                    showFullscreenButton={false}
                    // renderFullscreenButton={(onClick, isFullscreen) => (
                    //   <button className="image-gallery-icon image-gallery-fullscreen-button">
                    //     <BsSearch
                    //       color="#ff1b1b"
                    //       fill="#ff1b1b"
                    //       size={28}
                    //       className="cursor-pointer"
                    //       onClick={onClick}
                    //       isFullscreen={isFullscreen}
                    //     />
                    //   </button>
                    // )}
                  />
                </div>
                {gallery.length < 1 && (
                  <img
                    src="https://admin-nova.ru//assets_files/images/no-photo.png"
                    alt=""
                  />
                )}
                {/* <slide-mobile className="mobile__slide" /> */}
                {/* <div className="loader__blur">
								<div className="loader__into">
									<div>
										<Loader />
									</div>
								</div>
							</div> */}
              </div>
              <div className="product__information">
                <div className="product__about !flex-col">
                  <div
                    className="cart-justify flex lg:flex-nowrap flex-wrap"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="w-full">
                      <h1 className="add-product-title flex justify-between">
                        {productOne?.name}
                      </h1>
                      <div
                        className="flex items-center lg:flex-nowrap flex-wrap"
                        style={{
                          gap: "20px",
                        }}
                      >
                        <div className="stars">
                          <ReactStars
                            edit={false}
                            count={5}
                            size={24}
                            activeColor="#1C54BE"
                            color={"#B4B4B4"}
                            value={rating}
                            onChange={ratingAsync()}
                          />
                        </div>
                        <div className="comment">
                          <div style={{ color: "#666" }}>
                            {productOne?.reviews?.length} отзывов
                          </div>
                        </div>
                        {/* {productOne?.shop && (
                          <div
                            className="flex items-center ml-auto hover:underline cursor-pointer"
                            onClick={() => {
                              if (!reduxToken) {
                                setShowErrorModal(true);
                              } else {
                                if (
                                  window.confirm(
                                    "Вы хотите, чтобы ваше первое слова было об этом товаре?"
                                  )
                                ) {
                                  dispatch(
                                    chatCreate({
                                      getter_id: productOne?.shop?.id,
                                      message: `Я хочу написать о товаре №${
                                        productOne?.id
                                      }, имя: ${productOne?.name}, линк: ${(
                                        <Link to={window.location.href}>
                                          {window.location.href}
                                        </Link>
                                      )}`,
                                      type_user: "shop",
                                    })
                                  );
                                  navigate(
                                    `/message/type=shop/${productOne?.shop?.id}`
                                  );
                                }
                              }
                            }}
                            style={{ color: "#FF1B1B" }}
                          >
                            <AiOutlineMessage
                              className="mr-1"
                              fill="#FF1B1B"
                              size={22}
                            />{" "}
                            Написать в магазин
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                  {sizesArr?.items?.length > 0 && (
                    <div className="font-bold my-3">Выберите</div>
                  )}
                  <TabsMui
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                    className="mui-sizes"
                  >
                    {sizesArr?.items?.map((item, idx) => (
                      <TabMui
                        onClick={() => setCurrentSizeId(item)}
                        label={item?.value}
                        className={`muiTab-size ${
                          item.value_id == currentSizeId?.value_id &&
                          "active-size"
                        }`}
                        key={idx}
                      >
                        <label>
                          <input
                            value={item.value_id}
                            name="size"
                            type="radio"
                          />
                          {item?.value}
                        </label>
                      </TabMui>
                    ))}
                  </TabsMui>
                </div>
                {productOne?.shop?.name && (
                  <div className="font-bold mb-4">
                    Магазин:{" "}
                    <Link
                      to={`/selleradres/${productOne?.shop?.id}`}
                      className="duration-200 ml-2 text-sm rounded-full border px-3 py-2"
                      style={{ borderColor: "#FF1B1B", color: "#FF1B1B" }}
                    >
                      {productOne?.shop?.name}
                    </Link>
                  </div>
                )}
                {productOne?.color?.name && (
                  <div className="font-bold mt-3">Выберите</div>
                )}
                {productOne?.color?.name && (
                  <TabsMui
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                    className="mui-colors"
                  >
                    {productOne?.color?.name && (
                      <TabMui
                        className="a-color active-color"
                        label={productOne?.color?.name}
                      ></TabMui>
                    )}
                    {productOne?.products?.map((color, idx) => (
                      <TabMui
                        onClick={() => navigate(`/add/${color?.id}`)}
                        key={idx}
                        className="a-color"
                        label={color?.color}
                      ></TabMui>
                    ))}
                  </TabsMui>
                )}
                <TabsMui
                  value={muiCharacterTab}
                  onChange={handleCharacterTab}
                  aria-label="basic tabs example"
                  className="muiCharacter w-full"
                >
                  <TabMui label="Описание" />
                  <TabMui label="Характеристики" />
                  <TabMui label="Отзывы" />
                </TabsMui>
                {muiCharacterTab === 0 && (
                  <div className="r__type" style={{ color: "#909090" }}>
                    {parse(desc !== "null" ? desc : "")}
                  </div>
                )}
                {muiCharacterTab === 1 && (
                  <div className="r__type w-full">
                    {productOne.productProperties?.length > 0 &&
                      productOne.productProperties?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-baseline lg:flex-nowrap flex-wrap gap-2 justify-between"
                        >
                          <div style={{ color: "#909090" }}>
                            {item.key_name}
                          </div>
                          <div
                            className="leading-none text-right"
                            style={{ color: "#909090" }}
                          >
                            {item.value_name?.split(",")?.map((item) => (
                              <div style={{ color: "#909090" }}>{item}</div>
                            ))}
                          </div>
                          {console.log(item.value_name?.split(","))}
                        </div>
                      ))}
                  </div>
                )}
                {muiCharacterTab === 2 && (
                  <>
                    <div className="rating-box !w-full">
                      <div className="comment">
                        <div className="order">{productOne?.rating}</div>
                        <p className="pb-5">
                          На основании {productOne?.reviews_count} отзыва
                        </p>
                        <div className="stars">
                          <ReactStars
                            value={productOne?.rating}
                            activeColor="#0052FF"
                          />
                        </div>
                      </div>
                      <div className="place">
                        <div className="lines">
                          <div className="flex flex-row w-full">
                            <ProgressBarLine
                              value={productOne?.review_separate?.rate_5 * 100}
                              strokeWidth={1}
                            />
                            <div className="w-4">
                              <h6 style={{ color: "#D9D9D9" }}>5</h6>
                            </div>
                          </div>
                        </div>
                        <div className="lines">
                          <div className="flex flex-row w-full">
                            <ProgressBarLine
                              value={productOne?.review_separate?.rate_4 * 100}
                              strokeWidth={1}
                            />
                            <div className="w-4">
                              <h6 style={{ color: "#D9D9D9" }}>4</h6>
                            </div>
                          </div>
                        </div>
                        <div className="lines">
                          <div className="flex flex-row w-full">
                            <ProgressBarLine
                              value={productOne?.review_separate?.rate_3 * 100}
                              strokeWidth={1}
                            />
                            <div className="w-4">
                              <h6 style={{ color: "#D9D9D9" }}>3</h6>
                            </div>
                          </div>
                        </div>
                        <div className="lines">
                          <div className="flex flex-row w-full">
                            <ProgressBarLine
                              value={productOne?.review_separate?.rate_2 * 100}
                              strokeWidth={1}
                            />
                            <div className="w-4">
                              <h6 style={{ color: "#D9D9D9" }}>2</h6>
                            </div>
                          </div>
                        </div>
                        <div className="lines">
                          <div className="flex flex-row w-full">
                            <ProgressBarLine
                              value={productOne?.review_separate?.rate_1 * 100}
                              strokeWidth={1}
                            />
                            <div className="w-4">
                              <h6 style={{ color: "#D9D9D9" }}>1</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-customer mt-8">
                      <Title
                        name="Отзывы"
                        nameUz="Sharhlar"
                        nameEn="Comments"
                      />
                      <span className="c8">Сортировать по: </span>
                      <span
                        onClick={() => (
                          dispatch(getCommentFilterWithRate(id)),
                          setSortComment(true)
                        )}
                        className={`${
                          sortComment === true && "border-b-2 border-gray-500"
                        } cursor-pointer c8`}
                      >
                        Оценке
                      </span>
                      <span
                        onClick={() => (
                          dispatch(getCommentFilterWithDate(id)),
                          setSortComment(false)
                        )}
                        className={`${
                          sortComment === false && "border-b-2 border-gray-500"
                        } cursor-pointer c8`}
                      >
                        Дате
                      </span>
                      <div
                        className="customer flex flex-wrap justify-between pt-4"
                        key={id}
                      >
                        <div className="c__box" key={id}>
                          <div className="c__box-title font-bold">
                            Отзывы покупателей{" "}
                            <span className="font-bold">
                              ({productOne?.reviews_count})
                            </span>
                          </div>
                          {loading3 && <PreLoader />}
                          {!loading3 &&
                            comments
                              ?.slice(0, reviewsSlice)
                              .map((review, idx) => (
                                <div key={idx} className="user__comment">
                                  <div className="user flex items-center">
                                    <div className="user__name mr-3">
                                      {review?.user?.name}
                                    </div>
                                    <div className="stars">
                                      <ReactStars
                                        value={review?.rate}
                                        edit={false}
                                        isHalf={true}
                                        color="#FF9500"
                                      />
                                    </div>
                                  </div>
                                  <p className="my-2 c8">{review?.review}</p>
                                  <div className="date__sale">
                                    <div className="date c8">
                                      {review?.date}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          {reviewsSlice < comments?.length &&
                            comments?.length > 3 && (
                              <button
                                onClick={() =>
                                  handleReviewSlice(comments?.length)
                                }
                                type="submit"
                                className="comment__btn"
                              >
                                Показать больше комментариев
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/* <p
                  className="flex items-center cursor-pointer my-4"
                  onClick={handleOpen2}
                >
                  <div className="flex items-center">
                    Информация о доставке{" "}
                    <BsChevronDown className="ml-2" size={22} />
                  </div>
                </p> */}
                <div>
                  <Modal
                    keepMounted
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                  >
                    <Box sx={style} className="add-modal">
                      <Typography
                        id="keep-mounted-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Информация о логистической компании
                      </Typography>
                      <Typography
                        id="keep-mounted-modal-description"
                        sx={{ mt: 2 }}
                      >
                        Логистическая компания - это предприятие, оказывающее
                        услуги по транспортировке, обработке и хранению грузов,
                        содействуя своим клиентам в процессе продвижения товаров
                        от производителя к потребителю. Логистика, как наука,
                        впервые появилась в армии – в интендантской службе.
                        Поскольку конкурентная борьба в современном бизнесе по
                        остроте своей сродни военным действиям, достижения этой
                        науки быстро были восприняты коммерсантами.
                      </Typography>
                    </Box>
                  </Modal>
                </div>
                {/* <ModalAddress /> */}
                <div className="product__buttons mt-4">
                  {/* <Link to="" id="buy">
                  Купить
                </Link> */}
                  {/* <button
                    onClick={() => {
                      dispatch(addCompare({ product_id: productOne?.id }));
                      navigate("/compare");
                    }}
                    id="delete"
                  >
                    Сравнить
                  </button> */}
                </div>
              </div>
              <div className="product-a-cart">
                <div className="a-header">
                  <img className="a-img" src={API + productOne?.photo} alt="" />
                  <div>
                    {productOne?.name}
                    {currentSizeId?.value && (
                      <>
                        <div style={{ color: "#909090" }}>Выбранный размер</div>
                        <div className="a-selected-size">
                          {currentSizeId?.value}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="a-body">
                  <div className="product__order">
                    <button
                      className="product__increment"
                      onClick={() => {
                        minusCounter(detailCount);
                      }}
                    >
                      -
                    </button>
                    <p>{detailCount}</p>
                    <button
                      className="product__decrement"
                      onClick={() => {
                        plusCounter(detailCount);
                      }}
                    >
                      +
                    </button>
                  </div>
                  {productOne?.brand?.photo && (
                    <div
                      className="flex items-center gap-2"
                      style={{ color: "#909090" }}
                    >
                      Бренд:{" "}
                      <img
                        style={{
                          minHeight: "50px",
                          minWidth: "50px",
                          height: "50px",
                          width: "50px",
                          objectFit: "contain",
                        }}
                        src={API + productOne?.brand?.photo}
                        alt=""
                      />
                      {/* <span style={{ fontWeight: "700", color: "#263146" }}>
                      {productOne?.amount}
                    </span> */}
                    </div>
                  )}
                </div>
                <div className="a-other">
                  <div className="flex items-center flex-wrap">
                    <div style={{ color: "#909090" }}>Стоимость</div>
                    <div className="product__price">
                      {productOne?.price?.toLocaleString("ru-RU") + " " + "₽"}
                    </div>
                    {price_old && (
                      <span className="price_old" style={{ color: "#909090" }}>
                        {price_old + " ₽"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between">
                    <div style={{ color: "#909090" }}>Доставка</div>
                    <div className="text-lg font-700">
                      {categoryName?.name !== "Мебель"
                        ? "Доставка бесплатная"
                        : "Индивидуально"}
                    </div>
                  </div>
                  {productOne?.discount && (
                    <div className="flex flex-wrap items-center justify-between">
                      <div style={{ color: "#909090" }}>Скидка</div>
                      <div className="font-700">{productOne?.discount} %</div>
                    </div>
                  )}
                </div>
                <div className="a-footer">
                  <Button
                    id="a-button"
                    startIcon={
                      <AiOutlineShoppingCart
                        size={20}
                        color="#1649A4"
                        fill="#1649A4"
                      />
                    }
                    style={{ color: "white", padding: "8px 22px" }}
                    onClick={() => {
                      if (currentSizeId) {
                        dispatch(
                          postCartAdd({
                            "filter_value_id[0]": currentSizeId?.value_id,
                            product_id: productOne?.id,
                            amount: detailCount,
                          })
                        );
                      }
                      if (sizesArr?.items?.length > 0 && !currentSizeId) {
                        toast.error("Выберите размер/комплектацию/вид товара");
                      }
                      if (!currentSizeId && !sizesArr) {
                        dispatch(
                          postCartAdd({
                            product_id: productOne?.id,
                            amount: detailCount,
                          })
                        );
                      }
                      dispatch(getCart());
                    }}
                  >
                    {inCart ? "В корзине" : "В корзину"}
                  </Button>
                  {favoriteAdd === true ? (
                    <RiHeartFill
                      className="cursor-pointer !p-0 add-heart-icon"
                      onClick={() =>
                        dispatch(createFavorite({ product_id: productOne?.id }))
                      }
                      fill="#1649A4"
                      size={32}
                    />
                  ) : (
                    <RiHeartLine
                      className="cursor-pointer !p-0 add-heart-icon"
                      onClick={() =>
                        dispatch(createFavorite({ product_id: productOne?.id }))
                      }
                      size={32}
                      fill="#1649A4"
                    />
                  )}
                </div>
              </div>
            </div>
          </MContainer>
          <MContainer className="c-products pb-8">
            <Title name="Похожие товары" />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {related_products?.slice(0, slice).map((related, idx) => (
                <Cart key={idx} product={related} />
              ))}
            </div>
            <div className="advertising__button mt-8 text-center">
              {slice !== related_products?.length ||
                (slice > 5 && (
                  <button
                    onClick={() => handleSlice(related_products?.length)}
                    className="show__button mb-4"
                  >
                    Показать еще
                  </button>
                ))}
            </div>
          </MContainer>
          {/* <MContainer>
          <div className="question__title">
            Отзывы и вопросы{" "}
          </div>
          <div className="question">
            <div className="q__box">
              <div className="comment">
                <div className="order">{productOne?.reviews_count}</div>
                <p className="pb-5">
                  На основании {productOne?.reviews_count} отзыва
                </p>
                <div className="stars">
                  <ReactStars />
                </div>
              </div>
              <div className="place">
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_5 * 100}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>5</h6>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_4 * 100}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>4</h6>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_3 * 100}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>3</h6>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_2 * 100}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>2</h6>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_1 * 100}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>1</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="q__box">
              <div className="box">
                <div className="protsent">
                  <Circle
                    progress={35}
                    textColor="#fff"
                    progressColor="#fff"
                    bgColor="rgba(16, 0, 0, 0.16)"
                    roundedStroke={true}
                  />
                  <DonutChart />
                  <Progress />
                  </div>
                <p>Barcha sotuvlar</p>
              </div>
              <div className="box">
                <Circle
                  progress={35}
                  textColor="#fff"
                  progressColor="#fff"
                  bgColor="rgba(16, 0, 0, 0.16)"
                  roundedStroke={true}
                />
                <Progress />
                <p>Barcha sotuvlar</p>
              </div>
              <div className="box">
                <Circle
                  progress={35}
                  textColor="#fff"
                  progressColor="#fff"
                  bgColor="rgba(16, 0, 0, 0.16)"
                  roundedStroke={true}
                />
                <Progress />
                <p>Barcha sotuvlar</p>
              </div>
            </div>
          </div>
        </MContainer> */}
          {/* <MContainer className="mb-12">
          <div className="recently-products">
            <Title name="Вы недавно смотрели" />
            <ProductsViewed />
          </div>
        </MContainer> */}
        </div>
      )}
      {/* <AddPageDelivery
        regions={regions}
        regions_sub={regions_sub}
        amount={detailCount}
        showModal={showModal}
        onCloseModal={() => {
          setShowModal(false);
        }}
        onClickRegionId={(data) => {
          dispatch(getRegionsSub(data));
        }}
      /> */}
    </>
  );
};

export default Add;
