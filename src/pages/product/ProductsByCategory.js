import { Pagination } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Cart } from "../../component/Cart/Cart";
import PreLoader from "../../component/PreLoader/PreLoader";
import NavbarMenu from "../../container/NavbarMenu";
import { MContainer } from "../../element/Elemens";
import { getProductsByCategory } from "../../redux/actions/categoryActions";

const ProductsByCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [params, setParams] = useState({ page: 1, "per-page": 40 });
  useEffect(() => {
    dispatch(getProductsByCategory(id, params));
  }, [id]);

  const onPageChange = (event, value) => {
    let newParams = {
      ...params,
      page: value,
    };
    setParams(newParams);
    dispatch(getProductsByCategory(id, newParams));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const productsByCategory = useSelector(
    (state) => state.category.productsByCategory
  );
  const { productsByCategoryPagination } = useSelector(
    (state) => state.category
  );
  const { loading } = useSelector((state) => state.category);

  return (
    <>
      <NavbarMenu />
      <MContainer style={{ minHeight: "60vh" }}>
        <div className="flex items-center gap-4 flex-wrap justify-center text-center text-lg mt-8">
          <div>Категория: {productsByCategory[0]?.category?.name}</div>
        </div>
        {loading ? (
          <PreLoader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mb-12 mt-6">
            {productsByCategory?.map((product) => (
              <Cart product={product} />
            ))}
          </div>
        )}
        <div className="flex items-center justify-center my-8">
          <Pagination
            page={params.page}
            count={productsByCategoryPagination?.pageCount}
            onChange={onPageChange}
            color="error"
          />
        </div>
      </MContainer>
    </>
  );
};

export default ProductsByCategory;
