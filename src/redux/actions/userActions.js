import requests from "../../helpers/requests";
import { toast } from "react-toastify";

// user
export const getMe = (params) => (dispatch) => {
  dispatch({ type: "fetch_user_start", payload: params });

  requests
    .getMe(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_user_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response?.data?.message) || "User not found";
      // toast.error(message);
      // toast.error("Вам нужно зарегистрироваться");

      dispatch({ type: "fetch_user_error", payload: message });
    });
};

export const recoveryAccount = (params) => (dispatch) => {
  dispatch({ type: "post_recovery_account_start", payload: params });

  requests
    .recoveryAccount(params)
    .then(({ data }) => {
      dispatch({ type: "post_recovery_account_success", payload: data });
    })
    .catch(({ response }) => {
      let message = response.data.errors.phone && response.data.errors.phone[0];
      toast.error(message);

      dispatch({ type: "post_recovery_account_error", payload: message });
    });
};

export const recoveryCode = (params) => (dispatch) => {
  dispatch({ type: "post_recovery_code_start", payload: params });

  requests
    .recoveryCode(params)
    .then(({ data }) => {
      dispatch({ type: "post_recovery_code_success", payload: data });
    })
    .catch(({ response }) => {
      let message = response.data.errors.code && response.data.errors.code[0];
      toast.error(message);

      dispatch({ type: "post_recovery_code_error", payload: message });
    });
};

export const updateProfile = (params) => (dispatch) => {
  dispatch({ type: "update_profile_start", payload: params });

  requests
    .updateProfile(params)
    .then(({ data }) => {
      dispatch({ type: "update_profile_success", payload: data });
      toast.success("Успешно");
    })
    .catch(({ response }) => {
      let message1 =
        response.data.errors.email && response.data.errors.email[0];
      let message2 =
        response.data.errors.gender && response.data.errors.gender[0];
      let message3 =
        response.data.errors.phone && response.data.errors.phone[0];
      toast.error(message1);
      toast.error(message2);
      toast.error(message3);

      dispatch({ type: "update_profile_error", payload: message1 });
    });
};

export const changePhone = (params) => (dispatch) => {
  dispatch({ type: "change_phone_start", payload: params });

  requests
    .changePhone(params)
    .then(({ data }) => {
      dispatch({ type: "change_phone_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "change_phone_error", payload: response });
    });
};

export const changePhoneCode = (params) => (dispatch) => {
  dispatch({ type: "change_phone_code_start", payload: params });

  requests
    .changePhoneCode(params)
    .then(({ data }) => {
      dispatch({ type: "change_phone_code_success", payload: data });
      toast.success("Успешно");
      window.location.reload();
    })
    .catch(({ response }) => {
      let message1 =
        response.data.errors.email && response.data.errors.email[0];
      toast.error(message1);

      dispatch({ type: "change_phone_code_error", payload: message1 });
    });
};

export const changePassword = (params) => (dispatch) => {
  dispatch({ type: "change_password_start", payload: params });

  requests
    .changePassword(params)
    .then(({ data }) => {
      dispatch({ type: "change_password_success", payload: data });
      toast.success("Успешно");
      window.location.reload();
    })
    .catch(({ response }) => {
      let message1 =
        response.data.errors.password_current &&
        response.data.errors.password_current;
      let message2 =
        response.data.errors.password_new && response.data.errors.password_new;
      let message3 =
        response.data.errors.password_compare &&
        response.data.errors.password_compare;
      toast.error(message1);
      toast.error(message2);
      toast.error(message3);
      dispatch({ type: "change_password_error", payload: response });
    });
};

export const createChatAdmin = (params) => (dispatch) => {
  dispatch({ type: "create_send_admin_start", payload: params });

  requests
    .createChatAdmin(params)
    .then(({ data }) => {
      dispatch({ type: "create_send_admin_success", payload: data });
      toast.success("Ваше сообщение было отправлено");
    })
    .catch(({ response }) => {
      let message1 =
        response?.data?.errors?.name &&
        "name: " + response?.data?.errors?.name[0];
      let message2 =
        response?.data?.errors?.email &&
        "email:" + response?.data?.errors?.email[0];
      let message3 =
        response?.data?.errors?.message &&
        "comment:" + response?.data?.errors?.message[0];
      toast.error(message1);
      toast.error(message2);
      toast.error(message3);
      dispatch({ type: "create_send_admin_error", payload: response });
    });
};

export const callCenter = () => (dispatch) => {
  dispatch({ type: "fetch_call_center_start" });

  requests
    .callCenter()
    .then(({ data }) => {
      dispatch({ type: "fetch_call_center_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_call_center_error", payload: response });
    });
};

export const getlogo = () => (dispatch) => {
  dispatch({ type: "fetch_logo_start" });

  requests
    .getlogo()
    .then(({ data }) => {
      dispatch({ type: "fetch_logo_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_logo_error", payload: response });
    });
};
