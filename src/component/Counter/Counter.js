import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../assets/scss/_counter.scss";

const Counter = ({
  product_id,
  count_product,
  onClickIncrement,
  onClickDecrement,
}) => {
  const [counter, setCounter] = useState(1);

  //increase counter
  const decrease = () => {
    onClickDecrement(product_id);
  };

  //decrease counter
  const increase = () => {
    onClickIncrement(product_id);
  };

  return (
    <div className="product__order">
      <button className="product__increment" onClick={increase}>
        -
      </button>
      <p>{count_product ? count_product : 0}</p>
      <button className="product__decrement" onClick={decrease}>
        +
      </button>
    </div>
  );
};

export default Counter;
