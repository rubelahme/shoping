import React, { useEffect, useState } from "react";
import "./ProductShop.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProductShop = (props) => {
  const { name, price, category, img, key, seller, stock } = props.data;

  const date = new Date();
  const newDate =
    date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="productShop">
      <div className="productShop-left">
        <div className="row  pt-5 pb-5">
          <div className="col-md-4 ">
            <img className="img-fluid" src={img} alt="" />
          </div>
          <div className="col-md-8 pt-3">
            <h5 className="productName">
              <Link to={`ProductDetails/${key}`}>{name}</Link>
            </h5>
            <h4>
              <small>Category</small>:{" "}
              <span className="text-uppercase fs-5 fw-bold">{category}</span>
            </h4>
            <h6>by: {seller}</h6>
            <div className="row">
              <div className="col-md-7">
                <h6>
                  Price: <strong>${price}</strong>
                </h6>
                <h5>Only {stock} left in stock - Order soon</h5>
              </div>
              <div className="col-md-5">
                <h6 className="pb-2">Date: {newDate}</h6>
                <p> Time: {time.toLocaleTimeString()}</p>
              </div>
            </div>
            <div>
              <button
                className="CartButton"
                onClick={() => props.handelCart(props.data)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShop;
