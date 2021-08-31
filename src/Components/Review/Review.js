import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Home/Cart/Cart";
import NavBar from "../Home/NavBar/NavBar";
import ReviewItem from "./ReviewItem";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const setData = getDatabaseCart();
    const dataKey = Object.keys(setData);
    const productData = dataKey.map((pd) => {
      const product = fakeData.find((keys) => keys.key === pd);
      product.quantity = setData[pd];
      return product;
    });
    setCart(productData);
  }, []);

  const removeHandel = (key) => {
    const newCart = cart.filter((pd) => pd.key !== key);
    setCart(newCart);
    removeFromDatabaseCart(key);
  };

  let history = useHistory();
  const ProceedCheckout = () => {
    history.push(`/shipment`);
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {cart?.map((pd) => (
              <ReviewItem
                data={pd}
                key={pd.key}
                removeHandel={removeHandel}
              ></ReviewItem>
            ))}
          </div>
          <div className="col-md-3">
            <Cart cart={cart}>
              <button
                onClick={ProceedCheckout}
                className="btn btn-warning text-white fw-bold form-control"
              >
                Proceed Checkout
              </button>
            </Cart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
