const INITIAL_STATE = {
  list: [],
  popularList: [],
  newList: [],
  sliders: [],
  banners: [],
  products_viewed: [],
  related_products: [],
  brands_main: [],
  deliveryList: [],
  paymentList: [],
  unitList: [],
  loading: false,
  newListPagination: {},
  bannersLoading: false,
  slidersLoading: false,
  brands_mainLoading: false,
  dataLoading: false,
  popularProductsLoading: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
  is_data: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // auth
    case "fetch_products_start":
      return { ...state, loading: true, message: "" };
    case "fetch_products_error":
      return { ...state, message: payload, loading: false };
    case "fetch_products_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
      };

    case "fetch_popular_products_start":
      return { ...state, popularProductsLoading: true, message: "" };
    case "fetch_popular_products_error":
      return { ...state, message: payload, popularProductsLoading: false };
    case "fetch_popular_products_success":
      return {
        ...state,
        popularProductsLoading: false,
        popularProductsPagination: payload._meta,
        popularProducts: payload.data,
      };

    case "fetch_recently_products_start":
      return { ...state, loading: true, message: "" };
    case "fetch_recently_products_error":
      return { ...state, message: payload, loading: false };
    case "fetch_recently_products_success":
      return {
        ...state,
        loading: false,
        recentlyProductsPagination: payload._meta,
        recentlyProducts: payload.data,
      };

    case "fetch_new_products_start":
      return { ...state, loading: true, message: "" };
    case "fetch_new_products_error":
      return { ...state, message: payload, loading: false };
    case "fetch_new_products_success":
      return {
        ...state,
        loading: false,
        newList: payload.data,
        newListPagination: payload?._meta,
      };

    // Fetch product one
    case "fetch_product_one_start":
      return { ...state, dataLoading: true, message: "" };
    case "fetch_product_one_error":
      return { ...state, message: payload, dataLoading: false };
    case "fetch_product_one_success":
      return {
        ...state,
        dataLoading: false,
        is_data: 1,
        option: payload.data.category.option,
        data: payload.data,
      };

    // sliders
    case "fetch_sliders_start":
      return { ...state, slidersLoading: true, message: "" };
    case "fetch_sliders_error":
      return { ...state, message: payload, slidersLoading: false };
    case "fetch_sliders_success":
      return {
        ...state,
        slidersLoading: false,
        sliders: payload.data,
      };

    case "fetch_sliders_mobile_start":
      return { ...state, loading: true, message: "" };
    case "fetch_sliders_mobile_error":
      return { ...state, message: payload, loading: false };
    case "fetch_sliders_mobile_success":
      return {
        ...state,
        loading: false,
        slidersMobile: payload.data,
      };

    case "fetch_banners_start":
      return { ...state, bannersLoading: true, message: "" };
    case "fetch_banners_error":
      return { ...state, message: payload, bannersLoading: false };
    case "fetch_banners_success":
      return {
        ...state,
        bannersLoading: false,
        banners: payload.data,
      };
    // products viewed
    case "fetch_products_viewed_start":
      return { ...state, loading: true, message: "" };
    case "fetch_products_viewed_error":
      return { ...state, message: payload, loading: false };
    case "fetch_products_viewed_success":
      return {
        ...state,
        loading: false,
        products_viewed: payload.data,
      };

    case "fetch_related_products_start":
      return { ...state, loading: true, message: "" };
    case "fetch_related_products_error":
      return { ...state, message: payload, loading: false };
    case "fetch_related_products_success":
      return {
        ...state,
        loading: false,
        related_products: payload.data,
      };

    // brands
    case "fetch_get_brands_start":
      return { ...state, brands_mainLoading: true, message: "" };
    case "fetch_get_brands_error":
      return { ...state, message: payload, brands_mainLoading: false };
    case "fetch_get_brands_success":
      return {
        ...state,
        brands_mainLoading: false,
        brands_main: payload.data,
      };

    case "fetch_get_delivery_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_delivery_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_delivery_success":
      return {
        ...state,
        loading: false,
        deliveryList: payload.data,
      };

    case "fetch_get_payment_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_payment_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_payment_success":
      return {
        ...state,
        loading: false,
        paymentList: payload.data,
      };

    // profile
    case "logout":
      return { ...INITIAL_STATE };

    //sidebar toggle reducer
    case "sidebar_toggle":
      return { ...state, ...rest };

    /* other */
    default:
      return state;
  }
};
