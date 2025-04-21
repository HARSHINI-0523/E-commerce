import "./Products.css";
import { useState, useEffect } from "react";
import Product from "../product/Product";

function Products() {
  let [products, setProducts] = useState([]);

  async function getProducts() {
    let res = await fetch("http://localhost:4000/product-api/products");
    let productsData = await res.json();
    setProducts(productsData.payload);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5">
        {products.map((productObj) => (
          <div className="col" key={productObj.id}>
            <Product productObj={productObj} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
