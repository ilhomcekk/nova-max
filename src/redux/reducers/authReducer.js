const INITIAL_STATE = {
  list: [],
  loginStep: 0,
  loading: false,
  token: null,
  registerToken: null,
  message: null,
  sidebarShow: "responsive",
  data: {},
  userInfo: {},
  userPhoto: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // auth
    case "auth_password_start":
      return { ...state, loading: true, message: "" };
    case "auth_password_error":
      return { ...state, message: payload, loading: false };
    case "auth_password_success":
      window.localStorage.setItem("novamarktToken", payload.data.token);
      return {
        ...state,
        message: "",
        loading: false,
        loginStep: 1,
        token: payload.data.token,
      };

    case "auth_get_code_start":
      return { ...state, loading: true, message: "" };
    case "auth_get_code_error":
      return { ...state, message: payload, loading: false };
      case "auth_get_code_success":
      window.localStorage.setItem("novamarktToken", payload.data.token);
      return {
        ...state,
        loading: false,
        token: payload.data.token,
        loginStep: 3,
      };

    // Login
    case "auth_login_start":
      return { ...state, loading: true, message: "", success: false };
    case "auth_login_error":
      return { ...state, message: payload, loading: false };
    case "auth_login_success":
      window.localStorage.setItem("novamarktToken", payload.token);
      return {
        ...state,
        loading: false,
        token: payload.token,
        loginStep: 2,
      };

    case "remove_account_start":
      return { ...state, loading: true, message: "" };
    case "remove_account_error":
      return { ...state, message: payload, loading: false };
    case "remove_account_success":
      return {
        ...state,
        loading: false,
      };

    case "back_to_password":
      return {
        ...state,
        loginStep: 0,
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
