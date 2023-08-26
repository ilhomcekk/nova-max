const INITIAL_STATE = {
  list: [],
  messageList: [],
  adminList: [],
  chatUsers: [],
  chatMarkets: [],
  chatAdmin: [],
  currencyList: [],
  notificationList: [],
  newNotificationList: [],
  chatDetail: [],
  cartList: [],
  logo: {},
  loading: false,
  recoveryAccountLoading: false,
  recoveryAccountStep: 0,
  recoveryCodeLoading: false,
  message: null,
  reduxToken: null,
  sidebarShow: "responsive",
  data: {},
  user: {},
  call: {},
  readed: {},
  transaction: {},
  detailData: {},
  changePhone: {},
  changePhoneStep: 0,
  changePhoneStepLoading: false,
  logoLoading: false,
  step: false,
  stepChat: false,
  chatRoomStep: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // user
    case "fetch_user_start":
      return { ...state, loading: true, message: "" };
    case "fetch_user_error":
      return { ...state, message: payload, loading: false };
    case "fetch_user_success":
      return {
        ...state,
        loading: false,
        reduxToken: payload.data.token,
        user: payload.data,
      };

    case "post_recovery_account_start":
      return { ...state, recoveryAccountLoading: true, message: "" };
    case "post_recovery_account_error":
      return { ...state, message: payload, recoveryAccountLoading: false };
    case "post_recovery_account_success":
      return {
        ...state,
        recoveryAccountLoading: false,
        recoveryAccountStep: 1,
        recoveryAccount: payload.data,
      };

    case "post_recovery_code_start":
      return { ...state, recoveryCodeLoading: true, message: "" };
    case "post_recovery_code_error":
      return { ...state, message: payload, recoveryCodeLoading: false };
    case "post_recovery_code_success":
      return {
        ...state,
        recoveryCodeLoading: false,
        recoveryAccountStep: 2,
        recoveryCode: payload.data,
      };

    case "update_profile_start":
      return { ...state, loading: true, message: "" };
    case "update_profile_error":
      return { ...state, message: payload, loading: false };
    case "update_profile_success":
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case "change_phone_start":
      return {
        ...state,
        loading: true,
        changePhoneStep: 0,
        changePhoneStepLoading: true,
        message: "",
      };
    case "change_phone_error":
      return {
        ...state,
        message: payload,
        changePhoneStep: 0,
        changePhoneStepLoading: false,
        loading: false,
      };
    case "change_phone_success":
      return {
        ...state,
        loading: false,
        changePhone: payload,
        changePhoneStep: 1,
        changePhoneStepLoading: false,
      };

    case "change_phone_code_start":
      return { ...state, loading: true, message: "" };
    case "change_phone_code_error":
      return { ...state, message: payload, loading: false };
    case "change_phone_code_success":
      return {
        ...state,
        loading: false,
      };

    case "change_password_start":
      return { ...state, loading: true, message: "" };
    case "change_password_error":
      return { ...state, message: payload, loading: false };
    case "change_password_success":
      return {
        ...state,
        loading: false,
      };

    case "create_card_user_start":
      return { ...state, loading: true, message: "" };
    case "create_card_user_error":
      return { ...state, message: payload, step: false, loading: false };
    case "create_card_user_success":
      window.localStorage.setItem("card_id", payload.data.id);
      const newList = [...state.cartList, payload.data && payload.data];
      return {
        ...state,
        loading: false,
        cartList: newList,
        step: payload?.data?.message ? false : true,
      };

    case "create_verify_cart_start":
      return { ...state, loading: true, message: "" };
    case "create_verify_cart_error":
      return { ...state, message: payload, loading: false };
    case "create_verify_cart_success":
      window.localStorage.removeItem("card_id");
      return {
        ...state,
        loading: false,
        data: payload.data,
      };

    case "create_send_admin_start":
      return { ...state, loading: true, message: "" };
    case "create_send_admin_error":
      return { ...state, message: payload, loading: false };
    case "create_send_admin_success":
      return {
        ...state,
        loading: false,
        adminList: payload.data,
      };
    case "fetch_call_center_start":
      return { ...state, loading: true, message: "" };
    case "fetch_call_center_error":
      return { ...state, message: payload, loading: false };
    case "fetch_call_center_success":
      return {
        ...state,
        loading: false,
        call: payload.data,
      };

    case "fetch_logo_start":
      return { ...state, logoLoading: true, message: "" };
    case "fetch_logo_error":
      return { ...state, message: payload, logoLoading: false };
    case "fetch_logo_success":
      return {
        ...state,
        logoLoading: false,
        logo: payload.data,
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
