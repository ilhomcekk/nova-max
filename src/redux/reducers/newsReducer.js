const INITIAL_STATE = {
  news: [],
  last_news: [],
  questions: [],
  // list: [],
  loading: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
};

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case "fetch_news_start":
      return { ...state, loading: true, message: "" };
    case "fetch_news_error":
      return { ...state, message: payload, loading: false };
    case "fetch_news_success":
      return {
        ...state,
        loading: false,
        news: payload.data,
      };

    case "fetch_last_news_start":
      return { ...state, loading: true, message: "" };
    case "fetch_last_news_error":
      return { ...state, message: payload, loading: false };
    case "fetch_last_news_success":
      return {
        ...state,
        loading: false,
        last_news: payload.data,
      };

    case "fetch_get_news_one_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_news_one_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_news_one_success":
      return {
        ...state,
        loading: false,
        data: payload.data,
      };

    case "fetch_get_questions_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_questions_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_questions_success":
      return {
        ...state,
        loading: false,
        questions: payload.data,
      };

    case "sidebar_toggle":
      return { ...state, ...rest };
    default:
      return state;
  }
};
