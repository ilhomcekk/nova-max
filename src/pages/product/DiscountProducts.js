import React, { useEffect, useState } from "react";
import { Cart } from "../../component/Cart/Cart";
import { getProductsAll } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { MContainer, MLink, ShowAllLink } from "../../element/Elemens";
import Title from "../../component/Title/Title";
import PreLoader from "../../component/PreLoader/PreLoader";
const language = window.localStorage.getItem("novamarkt-Content-language");

export default function DiscountProducts() {
  const dispatch = useDispatch();
  const [productList2, setProductList2] = useState(5);

  useEffect(() => {
    dispatch(getProductsAll());
  }, []);

  const { loading } = useSelector((state) => state.product);
  const productsList = useSelector((state) => state.product.list);
  const discountProducts = productsList?.filter(
    (item) => item.discount && item
  );

  return (
    <>
      {discountProducts?.length > 0 && (
        <MContainer className="md:py-12 py-8">
          <Title
            nameUz="Chegirmali tovarlar"
            nameEn="Discounted goods"
            name="Товары со скидкой"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {discountProducts?.slice(0, productList2).map((product, index) => (
              <Cart key={index} product={product} />
            ))}
          </div>
          {loading && <PreLoader />}
          {productList2 !== discountProducts?.length && (
            <button
              onClick={() => setProductList2(discountProducts?.length)}
              className="show__all mt-8"
            >
              {language === "ru" && "Показать еще"}
              {language === "uz" && "Ko'proq ko'rish"}
              {language === "en" && "Show more"}
            </button>
          )}
        </MContainer>
      )}
    </>
  );
}
