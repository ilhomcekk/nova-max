import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const getNews = (params) => (dispatch) => {
  dispatch({ type: "fetch_news_start", payload: params });

  requests
    .getNews(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_news_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "News not";
      // toast.error(message);

      dispatch({ type: "fetch_news_error", payload: message });
    });
};

export const getLastNews = (params) => (dispatch) => {
  dispatch({ type: "fetch_last_news_start", payload: params });

  requests
    .getLastNews(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_last_news_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "News not";
      // toast.error(message);

      dispatch({ type: "fetch_last_news_error", payload: message });
    });
};

export const getNewsDetail = (id) => (dispatch) => {
  dispatch({ type: "fetch_get_news_one_start", payload: id });

  requests
    .getNewsDetail(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_news_one_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      // toast.error(message);

      dispatch({ type: "fetch_get_news_one_error", payload: message });
    });
};

export const getQuestions = () => (dispatch) => {
  dispatch({ type: "fetch_get_questions_start" });

  requests
    .getQuestions()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_questions_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      // toast.error(message);

      dispatch({ type: "fetch_get_questions_error", payload: message });
    });
};
