import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const returnStep = () => (dispatch) => {
  dispatch({ type: "return_step" });
};

export const waitOplataStatus = (params) => (dispatch) => {
  dispatch({ type: "fetch_wait_oplata_status_start", payload: params });

  requests
    .waitOplataStatus(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_wait_oplata_status_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_wait_oplata_status_error", payload: response });
    });
};

export const pendingStatus = (params) => (dispatch) => {
  dispatch({ type: "fetch_pending_status_start", payload: params });

  requests
    .pendingStatus(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_pending_status_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_pending_status_error", payload: response });
    });
};

export const acceptedStatus = (params) => (dispatch) => {
  dispatch({ type: "fetch_accepted_status_start", payload: params });

  requests
    .acceptedStatus(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_accepted_status_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_accepted_status_error", payload: response });
    });
};

export const canceledStatus = (params) => (dispatch) => {
  dispatch({ type: "fetch_canceled_status_start", payload: params });

  requests
    .canceledStatus(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_canceled_status_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_canceled_status_error", payload: response });
    });
};

export const waitSendStatus = (params) => (dispatch) => {
  dispatch({ type: "fetch_wait_send_status_start", payload: params });

  requests
    .waitSendStatus(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_wait_send_status_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_wait_send_status_error", payload: response });
    });
};

export const orderSendStatus = (params) => (dispatch) => {
  dispatch({ type: "fetch_order_send_status_start", payload: params });

  requests
    .orderSendStatus(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_order_send_status_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_order_send_status_error", payload: response });
    });
};

export const waitReviewStatus = (params) => (dispatch) => {
  dispatch({ type: "fetch_wait_review_status_start", payload: params });

  requests
    .waitReviewStatus(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_wait_review_status_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_wait_review_status_error", payload: response });
    });
};

export const endOrderStatus = (params) => (dispatch) => {
  dispatch({ type: "fetch_end_order_status_start", payload: params });

  requests
    .endOrderStatus(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_end_order_status_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_end_order_status_error", payload: response });
    });
};

export const getTransaction = () => (dispatch) => {
  dispatch({ type: "fetch_get_transaction_start" });

  requests
    .getTransaction()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_transaction_success", payload: data });
    })
    .catch(({ response }) => {
      let message =
        (response && response.data.message) ||
        dispatch({ type: "fetch_get_transaction_error", payload: message });
    });
};

export const postRefund = (params) => (dispatch) => {
  dispatch({ type: "create_refund_start", payload: params });

  requests
    .postRefund(params)
    .then(({ data }) => {
      dispatch({ type: "create_refund_success", payload: data });
      toast.success("Успешно");
    })
    .catch(({ response }) => {
      const message = response && response.data.errors.order_product_id[0];
      toast.error(message);
      dispatch({ type: "create_refund_error", payload: message });
    });
};

export const refundList = () => (dispatch) => {
  dispatch({ type: "fetch_refunds_start" });

  requests
    .refundList()
    .then(({ data }) => {
      dispatch({ type: "fetch_refunds_success", payload: data });
    })
    .catch(({ response }) => {
      let message =
        (response && response.data.message) ||
        dispatch({ type: "fetch_refunds_error", payload: message });
    });
};
