import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css"; 

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const allProducts = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("product_")) {
        const product = JSON.parse(localStorage.getItem(key));
        allProducts.push({ id: key.split("_")[1], ...product });
      }
    }
    setProducts(allProducts);
  }, []);

  return (
    <div className="products-container">
      <button className="home-button" onClick={() => navigate("/")}>
        Home
      </button>
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.image} alt={product.title} className="product-image" />
              <h2>{product.title}</h2>
              <p>{product.category}</p>
              <p className="price">${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
