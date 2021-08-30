import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce(
    (total, pro) => total + pro.price * pro.quantity,
    0
  );
  const totals = cart.reduce((total, pro) => total + pro.quantity, 0);
  // let total = 0;
  // for (let i = 0; i < cart.length; i++) {
  //   const element = cart[i];
  //   total = total + element.price * element.quantity;
  // }
  const fullTotal = total.toFixed(2);
  let shipping = 0;
  if (total > 100) {
    shipping = 10;
  } else if (total > 80) {
    shipping = 7;
  } else if (total > 50) {
    shipping = 5;
  } else if (total > 30) {
    shipping = 3;
  } else if (total > 1) {
    shipping = 2;
  }

  let tax = 0;
  if (total > 100) {
    tax = (10 / 100) * 100;
  } else if (total > 50) {
    tax = (7 / 100) * 100;
  } else if (total > 20) {
    tax = (5 / 100) * 100;
  } else if (total > 10) {
    tax = (1 / 100) * 100;
  }
  const priceTotal = total + shipping + tax;
  const priceTotals = parseFloat(priceTotal).toFixed(2);
  return (
    <div className="p-0 m-0">
      <div className="text-center border-bottom">
        <h3 className=" fw-bold pt-5">Order Summery</h3>
        <h5>Add to Product: {cart.length}</h5>
        <h5>Total Quantity: {totals}</h5>
      </div>
      <div className="p-3">
        <p>
          Product Price: <strong>${fullTotal}</strong>{" "}
        </p>
        <p>
          Shipping Handing: <strong>${shipping.toFixed(2)}</strong>{" "}
        </p>
        <p>
          Vat + Tax: <strong>${tax.toFixed(2)}</strong>{" "}
        </p>
        <p className="text-danger">
          Total Price: <strong>${priceTotals}</strong>{" "}
        </p>
        {props.children}
      </div>
    </div>
  );
};

export default Cart;
