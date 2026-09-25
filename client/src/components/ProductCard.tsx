import {
  memo
} from "react";

import {
  Link
} from "react-router-dom";

import type {
  Product
} from "../types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (
    product: Product
  ) => void;
};

function ProductCard({
  product,
  onAddToCart
}: ProductCardProps) {
  return (
    <article className="product-card">
      <Link
        to={`/products/${product.id}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-card-content">
        <span className="category">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="product-title"
        >
          {product.name}
        </Link>

        <p className="product-price">
          LKR{" "}
          {product.price.toLocaleString(
            "en-LK"
          )}
        </p>

        <button
          className="primary-button"
          onClick={() =>
            onAddToCart(product)
          }
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default memo(ProductCard);