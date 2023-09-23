import React, { useEffect, useState } from "react";
import { Cart } from "../../component/Cart/Cart";
import {
  getProductsAll,
  getProductSortNew,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { MContainer, MLink, ShowAllLink } from "../../element/Elemens";
import Title from "../../component/Title/Title";
import PreLoader from "../../component/PreLoader/PreLoader";
import ProductSkelet from "../../component/loading/ProductSkelet";
import { useNavigate } from "react-router-dom";
const language = window.localStorage.getItem("novamarkt-Content-language");

export default function NewProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    page: 1,
    "per-page": 10,
  });

  useEffect(() => {
    dispatch(getProductSortNew(params));
  }, []);

  const { loading } = useSelector((state) => state.product);
  const productsList = useSelector((state) => state.product.newList);

  return (
    <>
      <MContainer className="md:py-12 py-8">
        <Title name="Новые товары" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {loading ? (
            <ProductSkelet length={10} />
          ) : (
            productsList?.map((product, index) => (
              <Cart key={index} product={product} />
            ))
          )}
        </div>
        <button
          className="show__all mt-8"
          onClick={() => navigate("/products/type=new")}
        >
          {language === "ru" && "Показать еще"}
          {language === "uz" && "Ko'proq ko'rish"}
          {language === "en" && "Show more"}
        </button>
      </MContainer>
    </>
  );
}
