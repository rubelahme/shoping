import React from "react";

const ReviewItem = (props) => {
  const { name, img, quantity, seller, price, key } = props.data;
  return (
    <div className="row pt-4 pb-4">
      <div className="col-md-4">
        <div className="text-center pb-3">
          <img src={img} alt="" />
        </div>
      </div>
      <div className="col-md-8">
        <h5>{name}</h5>
        <p>Quantity: {quantity}</p>
        <p>By: {seller}</p>
        <p>Price: ${price}</p>
        <button
          onClick={() => props.removeHandel(key)}
          className="btn btn-warning fw-bold"
        >
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
