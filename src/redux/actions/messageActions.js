import requests from "../../helpers/requests";

export const getDocument = () => (dispatch) => {
  dispatch({ type: "fetch_documents_start" });

  requests
    .getDocument()
    .then(({ data }) => {
      dispatch({ type: "fetch_documents_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_documents_error", payload: response });
    });
};
