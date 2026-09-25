import {
  useCallback
} from "react";

import ProductCard from "./ProductCard";

import {
  useCart
} from "../context/CartContext";

import type {
  Product
} from "../types";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({
  products
}: ProductListProps) {
  const {
    addToCart
  } = useCart();

  const handleAddToCart =
    useCallback(
      (product: Product) => {
        addToCart(product);
      },
      [addToCart]
    );

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={
            handleAddToCart
          }
        />
      ))}
    </div>
  );
}