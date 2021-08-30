import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Home/NavBar/NavBar";
import fakeData from "../../fakeData";

const DetailsPage = () => {
  const { key } = useParams();
  const product = fakeData.find((pd) => pd.key === key);
  console.log(product);
  const date = new Date();
  const newDate =
    date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
  return (
    <div>
      <NavBar></NavBar>
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <img src={product.img} alt="" />
          </div>
          <div className="col-md-6">
            <h5>{product.name}</h5>
            <h6>Category: {product.category}</h6>
            <p>by: {product.seller}</p>
            <h5>Price: ${product.price}</h5>
            <h5>
              Only <span className="text-danger">{product.stock}</span> left in
              stock
            </h5>
            <h6>Date: {newDate}</h6>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
