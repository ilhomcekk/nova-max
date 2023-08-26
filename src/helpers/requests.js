import axios from "axios";

// const URL = en;
// const URL = `${process.env.REACT_APP_API_DOMAIN}api`;
// const URL = `https://miss.nolikvid.uz/api`;
const URL = `https://admin-nova.ru/api`;

const token = window.localStorage.getItem("novamarktToken");

const language = window.localStorage.getItem("novamarkt-Content-language");
const region = window.localStorage.getItem("novamarkt-Content-region");
const currency = window.localStorage.getItem("novamarkt-Content-currency");
const langFunc = () => {
  if (language === null) {
    window.location.reload();
  }
};
langFunc();

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-language": "ru",
    "Content-region": region,
    // "Content-currency": currency,
  },
};

const packageData = (data) => {
  const form = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const childKey in data[key]) {
        form.append(`${key}[${childKey}]`, data[key][childKey]);
      }
    } else {
      form.append(key, data[key]);
    }
  }
  return form;
};

const request = {
  // Регистрация/Авторизация start --------------
  authSignUp: (params) =>
    axios.post(`${URL}/user/sign-up`, packageData(params)),
  authSignIn: (params) =>
    axios.post(`${URL}/user/sign-in`, packageData(params)),
  getMe: () => axios.get(`${URL}/user/profile`, config),
  postGetCode: (params) =>
    axios.post(`${URL}/user/send-code`, packageData(params), config),
  removeAccount: (params) =>
    axios.post(`${URL}/user/remove-account`, params, config),
  recoveryAccount: (params) =>
    axios.post(`${URL}/user/recover-password`, packageData(params)),
  recoveryCode: (params) =>
    axios.post(`${URL}/user/accept-recover-code`, packageData(params)),

  // Товары start => Сортировка =========================
  getCategory: () => axios.get(`${URL}/category?type=product`, config),
  getSubCategoriesAll: (id) =>
    axios.get(`${URL}/category/sub-category?id=${id}`, config),
  subCategoryFilter: (id) =>
    axios.get(`${URL}/category/filter?category_id=${id}`, config),
  getProductsByCategory: (id, params) =>
    axios.get(`${URL}/product/by-category?id=${id}`, { params, ...config }),
  getPopularCategory: () => axios.get(`${URL}/category?type=product&popular=1`),
  getProductsByBrand: (id, params) =>
    axios.get(`${URL}/product/by-brand?id=${id}`, { params }),
  relatedProducts: (id) =>
    axios.get(`${URL}/product/related-products?product_id=${id}`, config),
  getProductGalleryAll: (id, params) =>
    axios.get(`${URL}/product/by-filter?category_id=${id}`, {
      params,
      ...config,
    }),
  getProductPriceDown: () => axios.get(`${URL}/product?sort=price_down`),
  getProductPriceUp: () => axios.get(`${URL}/product?sort=price_up`),
  getProductSortNew: () => axios.get(`${URL}/product?sort=new`),
  getRecentlyProducts: (params) =>
    axios.get(`${URL}/product?sort=recently`, { params, ...config }),
  getPopularProducts: (params) =>
    axios.get(`${URL}/product?sort=popular`, { params }),
  // // Товары end => =========================

  getRegions: () => axios.get(`${URL}/category?type=region`, config),
  getRegionsSub: (id) => axios.get(`${URL}/category/sub-category?id=${id}`),

  getProductsAll: (params) => axios.get(`${URL}/product`, { params }, config),
  getProductOne: (id) => axios.get(`${URL}/product/detail?id=${id}`, config),
  // Слайдер =========================
  getSliders: () => axios.get(`${URL}/slider?type=site`),
  getSlidersMobile: () => axios.get(`${URL}/slider?type=mobile`),
  getBanners: () => axios.get(`${URL}/banner`),
  getLastNews: () => axios.get(`${URL}/news/last`),
  getProductsRecentlyViewed: () => axios.get(`${URL}/product/recently-viewed`),
  createFavorite: (params) =>
    axios.post(`${URL}/product/set-favorite`, packageData(params), config),

  getFavoriteAll: () => axios.get(`${URL}/product/favorites`, config),
  // Корзинка start =========================
  getCart: () => axios.get(`${URL}/cart`, config),
  pendingStatus: (params) => axios.get(`${URL}/order?status=0`, config),
  acceptedStatus: (params) => axios.get(`${URL}/order?status=1`, config),
  canceledStatus: (params) => axios.get(`${URL}/order?status=2`, config),
  waitSendStatus: (params) => axios.get(`${URL}/order?status=3`, config),
  orderSendStatus: (params) => axios.get(`${URL}/order?status=4`, config),
  endOrderStatus: (params) => axios.get(`${URL}/order?status=5`, config),
  waitOplataStatus: (params) => axios.get(`${URL}/order?status=6`, config),
  waitReviewStatus: (params) => axios.get(`${URL}/order?status=9`, config),
  postCartAdd: (params) =>
    axios.post(`${URL}/cart/add`, packageData(params), config),
  decrementProduct: (params) => axios.post(`${URL}/cart/add`, params, config),
  postCartMinus: (params) => axios.post(`${URL}/cart/minus`, params, config),
  postCartRemove: (id) => axios.post(`${URL}/cart/remove`, id, config),
  postCartClear: (params) => axios.post(`${URL}/cart/clear`, params, config),
  updateProfile: (params) =>
    axios.post(`${URL}/user/update`, packageData(params), config),
  changePhone: (params) =>
    axios.post(`${URL}/user/change-phone`, packageData(params), config),
  changePhoneCode: (params) =>
    axios.post(`${URL}/user/accept-change-code`, packageData(params), config),
  changePassword: (params) =>
    axios.post(`${URL}/user/change-password`, packageData(params), config),
  // Корзинка end =========================
  // Новости start =========================
  getNewsDetail: (id) => axios.get(`${URL}/news/detail?id=${id}`),
  getNewsLast: () => axios.get(`${URL}/news/last`),
  getNews: (params) => axios.get(`${URL}/news`, { params, ...config }),
  getNewsSearch: () => axios.get(`${URL}/news/search?query=test`),
  getProductSearch: (params) =>
    axios.get(`${URL}/product/search`, { params, ...config }),
  // Новости end =========================
  // // Справочник start -----------------
  // Заказы start =========================
  getOrder: () => axios.get(`${URL}/order`),
  sendOrder: (params) => axios.post(`${URL}/order/send`, params, config),
  payOrder: (params) =>
    axios.post(`${URL}/payment/pay`, packageData(params), config),
  createCheck: (params) =>
    axios.post(`${URL}/order/set-receipt`, params, config),
  createOplata: (params) =>
    axios.post(`${URL}/order/pay-receipt`, params, config),
  // Заказы end =========================
  getComments: (id) =>
    axios.get(`${URL}/product/reviews?product_id=${id}`, config),
  createComment: (params) =>
    axios.post(`${URL}/product/set-review`, params, config),
  getCommentFilterWithRate: (id) =>
    axios.get(`${URL}/product/reviews?product_id=${id}&sort_rating=asc`),
  getCommentFilterWithDate: (id) =>
    axios.get(`${URL}/product/reviews?product_id=${id}&sort_date=asc`),
  getBrands: () => axios.get(`${URL}/brand`),
  // Магазин
  createChatAdmin: (params) =>
    axios.post(`${URL}/feedback/send`, packageData(params), config),
  callCenter: () => axios.get(`${URL}/settings/call-center`),
  getlogo: () => axios.get(`${URL}/settings/logo`),
  getDelivery: () => axios.get(`${URL}/delivery`, config),
  getPayment: () => axios.get(`${URL}/category?type=payment`, config),
  // Транзакции
  getTransaction: () => axios.get(`${URL}/transaction`, config),
  // Возвраты
  postRefund: (params) =>
    axios.post(`${URL}/order/refund-send`, params, config),
  refundList: () => axios.get(`${URL}/order/refunds`, config),
  // Частые вопросы
  getQuestions: () => axios.get(`${URL}/question`),
  // Мои договора
  getDocument: () => axios.get(`${URL}/chat/documents`, config),
};

export default request;
