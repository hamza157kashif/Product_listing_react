import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { productid } = useParams();
  const [product, setproduct] = useState([]);

  const getProduct = async () => {
    try {
      let reqLink = "http://localhost:8080/products/";
      reqLink = reqLink.concat(productid);
      const response = await fetch(reqLink);
      setproduct(await response.json());
      //console.log((data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="container-fluid mt-5">
      <div className="row text-center">
        <div className="col-10 col-md-4 mt-5" key={product.id}>
          <div className="card p-2">
            <div className="d-flex align-items-center">
              <div className="image">
                {" "}
                <img
                  src={product.imageURL}
                  className="rounded"
                  width="150"
                />{" "}
              </div>
              <div className="ml-3 w-100">
                <h4 className="mb-0 mt-0 textLeft">{product.name} </h4>
                <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                  <div className="d-flex flex-column">
                    <span className="articles">{product.description}</span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
