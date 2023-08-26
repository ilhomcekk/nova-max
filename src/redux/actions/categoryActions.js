import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const getCategory = () => (dispatch) => {
  dispatch({ type: "fetch_categories_start" });

  requests
    .getCategory()
    .then(({ data }) => {
      dispatch({ type: "fetch_categories_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      // toast.error(message);

      dispatch({ type: "fetch_categories_error", payload: message });
    });
};

export const getSubCategoriesAll = (id) => (dispatch) => {
  dispatch({ type: "fetch_sub_categories_start", payload: id });

  requests
    .getSubCategoriesAll(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_sub_categories_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_sub_categories_error", payload: message });
    });
};

export const subCategoryFilter = (id) => (dispatch) => {
  dispatch({ type: "fetch_sub_category_filter_start", payload: id });

  requests
    .subCategoryFilter(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_sub_category_filter_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      // toast.error(message);

      dispatch({ type: "fetch_sub_category_filter_error", payload: message });
    });
};

export const getProductsByCategory = (id, params) => (dispatch) => {
  dispatch({ type: "fetch_products_by_category_start", payload: id, params });

  requests
    .getProductsByCategory(id, params)
    .then(({ data }) => {
      dispatch({ type: "fetch_products_by_category_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      // toast.error(message);

      dispatch({ type: "fetch_products_by_category_error", payload: message });
    });
};

export const getRegions = () => (dispatch) => {
  dispatch({ type: "fetch_get_regions_start" });

  requests
    .getRegions()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_regions_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      // toast.error(message);

      dispatch({ type: "fetch_get_regions_error", payload: message });
    });
};

export const getRegionsSub = (id) => (dispatch) => {
  dispatch({ type: "fetch_get_regions_sub_start" });

  requests
    .getRegionsSub(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_regions_sub_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      // toast.error(message);

      dispatch({ type: "fetch_get_regions_sub_error", payload: message });
    });
};
