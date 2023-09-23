import {
  MENS_FOOTWEAR,
  WOMENS_FOOTWEAR,
  MENS_CLOTHING,
  WOMENS_CLOTHING,
  MENS_ACCESSORIES,
  WOMENS_ACCESSORIES,
  CHILDREN_ACCESSORIES,
} from "../reducers/types";
import request from "../../helpers/requests";

export function fetchMensFootwear(params) {
  return async (dispatch) => {
    const { data } = await request.getProductByCategory(params);
    dispatch({ type: MENS_FOOTWEAR, payload: data });
  };
}
export function fetchWomensFootwear(params) {
  return async (dispatch) => {
    const { data } = await request.getProductByCategory(params);
    dispatch({ type: WOMENS_FOOTWEAR, payload: data });
  };
}
export function fetchMensClothing(params) {
  return async (dispatch) => {
    const { data } = await request.getProductByCategory(params);
    dispatch({ type: MENS_CLOTHING, payload: data });
  };
}
export function fetchWomensClothing(params) {
  return async (dispatch) => {
    const { data } = await request.getProductByCategory(params);
    dispatch({ type: WOMENS_CLOTHING, payload: data });
  };
}
export function fetchMensAccessories(params) {
  return async (dispatch) => {
    const { data } = await request.getProductByCategory(params);
    dispatch({ type: MENS_ACCESSORIES, payload: data });
  };
}
export function fetchWomensAccessories(params) {
  return async (dispatch) => {
    const { data } = await request.getProductByCategory(params);
    dispatch({ type: WOMENS_ACCESSORIES, payload: data });
  };
}
export function fetchChildrenAccessories(params) {
  return async (dispatch) => {
    const { data } = await request.getProductByCategory(params);
    dispatch({ type: CHILDREN_ACCESSORIES, payload: data });
  };
}

