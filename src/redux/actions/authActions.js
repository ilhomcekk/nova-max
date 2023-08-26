import requests from "../../helpers/requests";
import { toast } from "react-toastify";

// auth
export const authSignUp = (params) => (dispatch) => {
  dispatch({ type: "auth_password_start", payload: params });

  requests
    .authSignUp(params)
    .then(({ data }) => {
      dispatch({ type: "auth_password_success", payload: data });
    })
    .catch(({ response }) => {
      let message1 =
        response.data.errors.phone && response.data.errors.phone[0];
      let message2 =
        response.data.errors.password && response.data.errors.password[0];
      toast.error(message1);
      toast.error(message2);
      dispatch({ type: "auth_password_error", payload: message1 });
    });
};

export const postGetCode = (params) => (dispatch) => {
  dispatch({ type: "auth_get_code_start", payload: params });

  requests
    .postGetCode(params)
    .then(({ data }) => {
      dispatch({ type: "auth_get_code_success", payload: data });
      toast.success("Успешно");
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Login error";
      toast.error(message);

      dispatch({ type: "auth_get_code_error", payload: message });
    });
};

const authSignIn = (params) => (dispatch) => {
  dispatch({ type: "auth_login_start", payload: params });

  requests
    .authSignIn(params)
    .then(({ data }) => {
      dispatch({ type: "auth_login_success", payload: data });
      toast.success("Успешно");
      window.location.reload();
    })
    .catch(({ response }) => {
      let message =
        (response && response.data.message) || "Не верный логин и/или пароль";
      toast.error(message);
      // toast.error("Вам нужно зарегистрироваться");

      dispatch({ type: "auth_login_error", payload: message });
    });
};

export const removeAccount = (params) => (dispatch) => {
  dispatch({ type: "remove_account_start", payload: params });

  requests
    .removeAccount(params)
    .then(({ data }) => {
      dispatch({ type: "remove_account_success", payload: data });
      window.location.reload();
      window.localStorage.removeItem("novamarktToken");
      toast.success("Успешно");
    })
    .catch(({ response }) => {
      let message =
        (response && response.data.message) || "Не удалось удалить аккаунт";
      toast.error(message);

      dispatch({ type: "remove_account_error", payload: message });
    });
};

// logout
export const logout = (params) => (dispatch) => {
  dispatch({ type: "logout", payload: params });
  window.localStorage.removeItem("novamarktToken");
  window.location.reload();
};
