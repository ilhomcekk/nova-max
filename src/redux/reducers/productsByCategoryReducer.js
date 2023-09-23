import {
  MENS_FOOTWEAR,
  WOMENS_FOOTWEAR,
  MENS_CLOTHING,
  WOMENS_CLOTHING,
  MENS_ACCESSORIES,
  WOMENS_ACCESSORIES,
  CHILDREN_ACCESSORIES,
} from "./types";

const initialState = {
  mens_footwear: [],
  womens_footwear: [],
  mens_clothing: [],
  womens_clothing: [],
  accessories: [],
  mens_accessories: [],
  womens_accessories: [],
  children_accessories: [],
};

export const productsByCategory = (state = initialState, action) => {
  switch (action.type) {
    case MENS_FOOTWEAR:
      return { ...state, mens_footwear: action.payload };
    case WOMENS_FOOTWEAR:
      return { ...state, womens_footwear: action.payload };
    case MENS_CLOTHING:
      return { ...state, mens_clothing: action.payload };
    case WOMENS_CLOTHING:
      return { ...state, womens_clothing: action.payload };
    case MENS_ACCESSORIES:
      return { ...state, mens_accessories: action.payload };
    case WOMENS_ACCESSORIES:
      return { ...state, womens_accessories: action.payload };
    case CHILDREN_ACCESSORIES:
      return { ...state, children_accessories: action.payload };
    default:
      return state;
  }
};
