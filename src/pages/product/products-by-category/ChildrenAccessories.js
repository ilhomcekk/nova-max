import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Cart } from "../../../component/Cart/Cart";
import ProductSkelet from "../../../component/loading/ProductSkelet";
import Title from "../../../component/Title/Title";
import { MContainer } from "../../../element/Elemens";
import { fetchChildrenAccessories } from "../../../redux/actions/productsByCategoryActions";
const id = 643;

const ChildrenAccessories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const products = useSelector(
    (state) => state.productsByCategory.children_accessories
  );
  const [params, setParams] = useState({
    id: id,
    page: 1,
    "per-page": 10,
  });

  const handleProducts = async () => {
    await dispatch(fetchChildrenAccessories(params));
    setLoading(false);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <MContainer>
      <Title name="Аксессуары для детей" />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mb-12 mt-8">
        {loading ? (
          <ProductSkelet length={40} />
        ) : (
          products?.data?.map((item, idx) => <Cart key={idx} product={item} />)
        )}
      </div>
      <button
        onClick={() => {
          navigate("/products-by-category/" + id);
        }}
        className="show__all"
      >
        Показать еще
      </button>
    </MContainer>
  );
};

export default ChildrenAccessories;