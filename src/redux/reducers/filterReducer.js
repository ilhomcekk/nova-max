const INITIAL_STATE = {
  list: [],
  shopList: [],
  brand_list: [],
  productsByBrand: [],
  logistSort: [],
  productsByPhoto: [],
  loading: false,
  loading2: false,
  productsByBrandPagination: {},
  searchPagination: null,
  galleryPagination: null,
  productsByPhotoPagination: null,
  message: null,
  sidebarShow: "responsive",
  data: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // auth
    case "fetch_products_filter_start":
      return { ...state, loading: true, message: "" };
    case "fetch_products_filter_error":
      return { ...state, message: payload, loading: false };
    case "fetch_products_filter_success":
      return {
        ...state,
        loading: false,
        searchPagination: payload._meta,
        list: payload.data,
      };

    case "products_by_photo_start":
      return { ...state, loading: true, message: "" };
    case "products_by_photo_error":
      return { ...state, message: payload, loading: false };
    case "products_by_photo_success":
      return {
        ...state,
        loading: false,
        productsByPhotoPagination: payload._meta,
        productsByPhoto: payload.data,
      };

    // auth
    case "fetch_product_gallery_start":
      return { ...state, loading2: true, message: "" };
    case "fetch_product_gallery_error":
      return { ...state, message: payload, loading2: false };
    case "fetch_product_gallery_success":
      return {
        ...state,
        loading2: false,
        galleryPagination: payload._meta,
        list: payload.data,
      };

    case "fetch_product_price_down_start":
      return { ...state, loading2: true, message: "" };
    case "fetch_product_price_down_error":
      return { ...state, message: payload, loading2: false };
    case "fetch_product_price_down_success":
      return {
        ...state,
        loading2: false,
        list: payload.data,
      };

    case "fetch_product_price_up_start":
      return { ...state, loading2: true, message: "" };
    case "fetch_product_price_up_error":
      return { ...state, message: payload, loading2: false };
    case "fetch_product_price_up_success":
      return {
        ...state,
        loading2: false,
        list: payload.data,
      };

    case "fetch_product_sort_new_start":
      return { ...state, loading2: true, message: "" };
    case "fetch_product_sort_new_error":
      return { ...state, message: payload, loading2: false };
    case "fetch_product_sort_new_success":
      return {
        ...state,
        loading2: false,
        list: payload.data,
      };

    case "fetch_category_brand_start":
      return { ...state, loading: true, message: "" };
    case "fetch_category_brand_error":
      return { ...state, message: payload, loading: false };
    case "fetch_category_brand_success":
      return {
        ...state,
        loading: false,
        productsByBrandPagination: payload._meta,
        productsByBrand: payload.data,
      };

    case "fetch_get_brands_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_brands_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_brands_success":
      return {
        ...state,
        loading: false,
        brand_list: payload.data,
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
