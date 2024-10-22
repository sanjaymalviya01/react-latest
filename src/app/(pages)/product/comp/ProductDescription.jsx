import React from "react";
import "./style.css";

function ProductDescription({ product }) {
  return (
    <div className="product-desc-main">
      <h3 className="product-desc-head">Product details</h3>
      <div className="product-desc-details">
        <div className="text-gray-600">
          <p>{product.description}</p>
        </div>

        <table className="product-desc-table">
          <tbody>
            <tr>
              <th className="product-desc-table-head">Brand</th>
              <th className="product-desc-table-data ">{product.brand}</th>
            </tr>
            <tr>
              <th className="product-desc-table-head">Warranty Information</th>
              <th className="product-desc-table-data ">
                {product.warrantyInformation}
              </th>
            </tr>
            <tr>
              <th className="product-desc-table-head">Weight</th>
              <th className="product-desc-table-data ">{product.weight} g</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductDescription;
