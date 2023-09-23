import { Pagination } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Cart } from "../../component/Cart/Cart";
import ProductSkelet from "../../component/loading/ProductSkelet";
import NavbarMenu from "../../container/NavbarMenu";
import { MContainer } from "../../element/Elemens";
import { getProductsByBrand } from "../../redux/actions/filterActions";
const API = `${process.env.REACT_APP_API_DOMAIN}`;

const ProductsByBrand = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const metaNumber = search ? parseInt(search?.match(/\d+/)[0]) : 1;

  const [pagination, setPagination] = useState({
    page: metaNumber,
    "per-page": 15,
  });
  useEffect(() => {
    let newPagination = {
      ...pagination,
      page: metaNumber,
    };
    dispatch(getProductsByBrand(id, newPagination));
  }, [metaNumber]);

  useEffect(() => {
    dispatch(getProductsByBrand(id, pagination));
  }, [id]);

  const onPageChange = (event, value) => {
    navigate(`?page=${value}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const products = useSelector((state) => state.filter.productsByBrand);
  const { productsByBrandPagination } = useSelector((state) => state.filter);
  const { loading } = useSelector((state) => state.filter);

  return (
    <>
      <NavbarMenu />
      <MContainer>
        <div className="text-center flex items-center justify-center flex-wrap gap-2 text-gray-500 mt-4">
          Продукты - {products[0]?.brand?.name}
          <img
            style={{ height: "50px", width: "auto" }}
            src={API + products[0]?.brand?.photo}
            alt=""
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mb-12 mt-6">
          {loading ? (
            <ProductSkelet length={15} />
          ) : (
            products?.map((product) => <Cart product={product} />)
          )}
        </div>
        <div className="flex items-center justify-center my-8">
          <Pagination
            onChange={onPageChange}
            count={productsByBrandPagination?.pageCount}
            page={metaNumber}
            defaultPage={productsByBrandPagination?.currentPage}
            color="error"
          />
        </div>
      </MContainer>
    </>
  );
};

export default ProductsByBrand;
