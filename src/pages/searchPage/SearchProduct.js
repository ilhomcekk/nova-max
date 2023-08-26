import { Button, Pagination } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Cart } from "../../component/Cart/Cart";
import PreLoader from "../../component/PreLoader/PreLoader";
import NavbarMenu from "../../container/NavbarMenu";
import { MContainer } from "../../element/Elemens";
import { getProductsByFilter } from "../../redux/actions/filterActions";

const SearchProduct = () => {
  const { id } = useParams();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [params, setParams] = useState({
    query: slug,
    page: id,
    "per-page": 20,
  });
  useEffect(() => {
    let newParams = {
      ...params,
      page: 1,
      query: slug || "",
    };
    setParams(newParams);
    dispatch(getProductsByFilter(newParams));
  }, [slug]);

  useEffect(() => {
    let newParams = {
      ...params,
      page: id,
    };
    setParams(newParams);
    dispatch(getProductsByFilter(newParams));
  }, [id]);

  const onPageChange = (event, value) => {
    navigate(`/search/product/${slug}/${value}`);
    let newParams = {
      ...params,
      page: value,
    };
    setParams(newParams);
    dispatch(getProductsByFilter(newParams));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const productFelter = useSelector((state) => state.filter.list);
  const { searchPagination } = useSelector((state) => state.filter);
  const { loading } = useSelector((state) => state.filter);

  return (
    <>
      <NavbarMenu />
      <MContainer>
        <div className="text-center flex items-center justify-center flex-wrap text-gray-500 mt-4">
          Поиск по запросу "{" "}
          <div className="text-black font-bold">
            {slug ? slug : "Все товары"}
          </div>{" "}
          "
        </div>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mb-12 mt-6">
              {productFelter?.map((product) => (
                <Cart product={product} />
              ))}
            </div>
            <div className="flex items-center justify-center my-8">
              <Pagination
                onChange={onPageChange}
                count={searchPagination?.pageCount}
                page={searchPagination?.currentPage}
                defaultPage={searchPagination?.currentPage}
                color="error"
              />
            </div>
          </>
        )}
      </MContainer>
    </>
  );
};

export default SearchProduct;
