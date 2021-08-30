import React from "react";
import "./Shop.scss";
import fakeData from "../../../fakeData";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ProductShop from "../ProductShop/ProductShop";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../../utilities/databaseManager";
import { useEffect } from "react";

const Shop = () => {
  const fastItem = fakeData.slice(0, 10);
  const [products, setProducts] = useState(fastItem);
  console.log(setProducts);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const setData = getDatabaseCart();
    const king = Object.keys(setData);
    const productKey = king.map((pd) => {
      const ProductData = fakeData.find((keys) => keys.key === pd);
      ProductData.quantity = setData[pd];
      return ProductData;
    });
    setCart(productKey);
  }, []);

  const handelCart = (product) => {
    const addToKeys = product.key;
    const sameProduct = cart.find((pd) => pd.key === addToKeys);
    let countItem = 1;
    let newCart;
    if (sameProduct) {
      countItem = sameProduct.quantity + 1;
      sameProduct.quantity = countItem;
      const Others = cart.filter((keys) => keys.key !== addToKeys);
      newCart = [...Others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, countItem);
  };

  const history = useHistory();

  const Review = () => {
    history.push(`/review`);
  };

  return (
    <div className="Shop">
      <div className="row">
        <div className="col-md-9 p-0 bigProduct">
          {products?.map((pd) => (
            <ProductShop
              data={pd}
              key={pd.key}
              handelCart={handelCart}
            ></ProductShop>
          ))}
        </div>
        <div className="col-md-3 p-0 m-0">
          <Cart cart={cart}>
            <div>
              <button
                onClick={Review}
                className="btn btn-warning text-white fw-bold form-control"
              >
                Review Order
              </button>
            </div>
          </Cart>
        </div>
        <div className="col-md-9 smallProduct">
          {products.map((pd) => (
            <ProductShop
              data={pd}
              key={pd.key}
              handelCart={handelCart}
            ></ProductShop>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
