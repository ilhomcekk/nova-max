// import "./functions.scss";
import React, { lazy } from "react";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreLoader from "./component/PreLoader/PreLoader";
import Navbar from "./container/Navbar";
import ScrollToTop from "./container/ScrollTop";
import Footer from "./pages/footer/Footer";
import NewProductsPage from "./pages/product/NewProductsPage";
const Product = lazy(() => import("./pages/product/Product"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));
const Info = lazy(() => import("./pages/info/Info"));
const DeliveryCart = lazy(() => import("./pages/deliverycart/DeliveryCart"));
const Selected = lazy(() => import("./pages/selected/Selected"));
const Basket = lazy(() => import("./pages/basket/Basket"));
const Deliveries = lazy(() => import("./pages/delivery/Deliveries"));
const ReturnProduct = lazy(() => import("./pages/returnProduct/ReturnProduct"));
const Offer = lazy(() => import("./pages/offer/Offer"));
const Cabinet = lazy(() => import("./pages/cabinet/Cabinet"));
const Questions = lazy(() => import("./pages/questions/Questions"));
const Contacts = lazy(() => import("./pages/contacts/Contacts"));
const MNews = lazy(() => import("./pages/marketNews/MNews"));
const Add = lazy(() => import("./pages/add/Add"));
const Filter = lazy(() => import("./pages/filter/Filter"));
const SubFilter = lazy(() => import("./pages/filter/SubFilter"));
const FirstRegister = lazy(() => import("./pages/register/FirstRegister"));
const SecondRegister = lazy(() => import("./pages/register/SecondRegister"));
const Recovery = lazy(() => import("./pages/register/Recovery"));
const Register = lazy(() => import("./pages/register/Register"));
const SearchProduct = lazy(() => import("./pages/searchPage/SearchProduct"));
const ProductsByCategory = lazy(() =>
  import("./pages/product/ProductsByCategory")
);
const Category = lazy(() => import("./pages/category/Category"));
const PopularProducts = lazy(() => import("./pages/product/PopularProducts"));
const RecentlyProducts = lazy(() => import("./pages/product/RecentlyProducts"));
const ProductsByBrand = lazy(() =>
  import("./pages/searchPage/ProductsByBrand")
);

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position="top-center" />
      <Navbar />
      <Suspense
        fallback={
          <div className="fixed top-0 left-0 bg-white h-full w-full z-[100]">
            <PreLoader
              absolute={"fixed"}
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/products-by-brand/:id" element={<ProductsByBrand />} />
          <Route path="/search/product/:slug/:id" element={<SearchProduct />} />
          <Route path="/search/product/:id" element={<SearchProduct />} />
          <Route path="/products/type=popular" element={<PopularProducts />} />
          <Route path="/products/type=new" element={<NewProductsPage />} />
          <Route
            path="/products/type=recently"
            element={<RecentlyProducts />}
          />
          <Route path="/info" element={<Info />} />
          <Route path="/deliverycart" element={<DeliveryCart />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/selected" element={<Selected />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/add/:id" element={<Add />} />
          <Route
            path="/products-by-category/:id"
            element={<ProductsByCategory />}
          />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/returnproduct" element={<ReturnProduct />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/mnews/:id" element={<MNews />} />
          <Route path="/filter/:id/:slug" element={<Filter />} />
          <Route
            path="/filter/:id/sub-category/:id/:slug"
            element={<SubFilter />}
          />
          <Route path="/offer" element={<Offer />} />
          <Route path="/second-register" element={<SecondRegister />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/firstregister" element={<FirstRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
