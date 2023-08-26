import React, { useEffect, useState } from "react";
import { Cart } from "../../component/Cart/Cart";
import {
  getProductsAll,
  getRecentlyProducts,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { MContainer, MLink, ShowAllLink } from "../../element/Elemens";
import Title from "../../component/Title/Title";
import PreLoader from "../../component/PreLoader/PreLoader";
import { useNavigate } from "react-router-dom";
import ProductSkelet from "../../component/loading/ProductSkelet";
const language = window.localStorage.getItem("novamarkt-Content-language");

export default function AddedRecentlyProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    page: 1,
    "per-page": 10,
  });

  useEffect(() => {
    dispatch(getRecentlyProducts(filter));
  }, []);

  const { loading } = useSelector((state) => state.product);

  const productsList = useSelector((state) => state.product.recentlyProducts);

  return (
    <MContainer className="md:py-12 py-8">
      <Title
        nameUz="Yaqinda qo'shilgan tovarlar"
        name="Недавно добавленные товары"
        nameEn="Recently added products"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {loading ? (
          <ProductSkelet length={10} />
        ) : (
          productsList?.map((product, index) => (
            <Cart key={index} product={product} />
          ))
        )}
      </div>
      {productsList?.length > 9 && (
        <button
          onClick={() => {
            navigate("/products/type=recently");
          }}
          className="show__all"
        >
          {language === "ru" && "Показать еще"}
          {language === "uz" && "Ko'proq ko'rish"}
          {language === "en" && "Show more"}
        </button>
      )}
    </MContainer>
  );
}
