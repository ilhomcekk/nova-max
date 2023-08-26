import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsViewed } from "../../redux/actions/productActions";
import { Cart } from "../Cart/Cart";
import ProductSkelet from "../loading/ProductSkelet";

const ProductsViewed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsViewed());
  }, []);
  const products_viewed = useSelector((state) => state.product.products_viewed);
  const { loading } = useSelector((state) => state.product);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
      {loading ? (
        <ProductSkelet length={10} />
      ) : (
        products_viewed.map((view, idx) => <Cart key={idx} product={view} />)
      )}
    </div>
  );
};

export default ProductsViewed;
