import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const ProductEffectAPI = () => {
  const [products, setproducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      setproducts(await response.json());
      //console.log((data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  let navigate = useNavigate();

  return (
    <>
      <div>
        <h2 className="h2style">List of Products</h2>
        <div className="addbuton">
          <button
            type="button"
            class="btn btn-success"
            className="addbutton"
            onClick={() => navigate("/newProduct")}
          >
            <i class="bi bi-plus">+</i> Add Product
          </button>
        </div>

        <div className="container-fluid mt-5">
          <div className="row text-center">
            {products.map((curProd) => {
              return (
                <div className="col-10 col-md-4 mt-5" key={curProd.id}>
                  <div className="card p-2">
                    <div className="d-flex align-items-center">
                      <div className="image">
                        {" "}
                        <img
                          src={curProd.imageURL}
                          className="rounded"
                          width="155"
                        />{" "}
                      </div>
                      <div className="ml-3 w-100">
                        <h4 className="mb-0 mt-0 textLeft">{curProd.name} </h4>
                        <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                          <div className="d-flex flex-column">
                            <span className="articles">
                              {curProd.description}
                            </span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductEffectAPI;
