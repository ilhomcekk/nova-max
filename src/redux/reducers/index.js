import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import categories from "./categoryReducer";
import newsReducer from "./newsReducer";
import favoriteReducer from "./favoriteReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import filterReducer from "./filterReducer";
import orderReducer from "./orderReducer";
import { productsByCategory } from "./productsByCategoryReducer";
// import messageReducer from "./messageReducer";

const reducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categories,
  news: newsReducer,
  favorite: favoriteReducer,
  cart: cartReducer,
  user: userReducer,
  filter: filterReducer,
  order: orderReducer,
  productsByCategory: productsByCategory,
  // message: messageReducer,
});

export default reducer;
