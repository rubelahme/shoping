import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import Cart from "../Home/Cart/Cart";
import NavBar from "../Home/NavBar/NavBar";
import ReviewItem from "./ReviewItem";
import Imagone from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [item, setItem] = useState(false);

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
  const PlaceOrder = () => {
    setCart([]);
    processOrder();
    setItem(true);
  };
  let thankYou;
  if (item) {
    thankYou = <img src={Imagone} alt="Imagone" />;
  }

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
            {item && thankYou}
          </div>
          <div className="col-md-3">
            <Cart cart={cart}>
              <button
                onClick={PlaceOrder}
                className="btn btn-warning text-white fw-bold form-control"
              >
                Place Order
              </button>
            </Cart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
