import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Cart } from "../../component/Cart/Cart";
import ProductSkelet from "../../component/loading/ProductSkelet";
import { MContainer } from "../../element/Elemens";
import { getPopularProducts } from "../../redux/actions/productActions";

const PopularProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const metaNumber = search ? parseInt(search?.match(/\d+/)[0]) : 1;
  const [params, setParams] = useState({
    page: +metaNumber,
    "per-page": 10,
  });

  useEffect(() => {
    let newParams = {
      ...params,
      page: +metaNumber,
      "per-page": 10,
    };
    dispatch(getPopularProducts(newParams));
  }, [metaNumber]);

  const onPageChange = (value, page) => {
    navigate(`?page=${page}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const { popularProducts } = useSelector((state) => state.product);
  const { popularProductsPagination } = useSelector((state) => state.product);
  const { popularProductsLoading } = useSelector((state) => state.product);

  return (
    <>
      <MContainer>
        <div className="pages-link c8 mt-4">
          <Link to="/">Главная страница / </Link>
          <Link to="">Популярные товары</Link>
        </div>
      </MContainer>
      <MContainer style={{ minHeight: "60vh" }}>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mb-12 mt-8">
          {popularProductsLoading ? (
            <ProductSkelet length={40} />
          ) : (
            popularProducts?.map((item, idx) => (
              <Cart key={idx} product={item} />
            ))
          )}
        </div>
        {popularProducts?.length > 0 && !popularProductsLoading && (
          <div className="flex items-center justify-center mb-12">
            <Pagination
              count={popularProductsPagination?.pageCount}
              page={popularProductsPagination?.currentPage}
              onChange={onPageChange}
              color="error"
            />
          </div>
        )}
      </MContainer>
    </>
  );
};

export default PopularProducts;
