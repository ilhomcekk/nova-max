const INITIAL_STATE = {
  list: [],
  categoryList: [],
  subCategory: [],
  popularCategory: [],
  regions: [],
  regions_sub: [],
  productsByCategory: [],
  loading: false,
  popularCategoryLoading: false,
  message: null,
  productsByCategoryPagination: null,
  sidebarShow: "responsive",
  data: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // auth
    case "fetch_categories_start":
      return { ...state, loading: true, message: "" };
    case "fetch_categories_error":
      return { ...state, message: payload, loading: false };
    case "fetch_categories_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
      };

    case "fetch_sub_categories_start":
      return { ...state, loading: true, message: "" };
    case "fetch_sub_categories_error":
      return { ...state, message: payload, loading: false };
    case "fetch_sub_categories_success":
      return {
        ...state,
        loading: false,
        subCategory: payload.data,
      };

    case "fetch_sub_category_filter_start":
      return { ...state, loading: true, message: "" };
    case "fetch_sub_category_filter_error":
      return { ...state, message: payload, loading: false };
    case "fetch_sub_category_filter_success":
      return {
        ...state,
        loading: false,
        subCategory: payload.data,
      };

    case "fetch_products_by_category_start":
      return { ...state, loading: true, message: "" };
    case "fetch_products_by_category_error":
      return { ...state, message: payload, loading: false };
    case "fetch_products_by_category_success":
      return {
        ...state,
        loading: false,
        productsByCategoryPagination: payload._meta,
        productsByCategory: payload.data,
      };

    case "fetch_get_regions_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_regions_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_regions_success":
      return {
        ...state,
        loading: false,
        regions: payload.data,
      };

    case "fetch_get_regions_sub_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_regions_sub_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_regions_sub_success":
      return {
        ...state,
        loading: false,
        regions_sub: payload.data,
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
