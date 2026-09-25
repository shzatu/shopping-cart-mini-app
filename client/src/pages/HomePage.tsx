import {
  useEffect,
  useMemo,
  useState
} from "react";

import ProductList from "../components/ProductList";

import {
  getProducts
} from "../services/api";

import type {
  Product
} from "../types";

export default function HomePage() {
  const [
    products,
    setProducts
  ] = useState<Product[]>([]);

  const [
    category,
    setCategory
  ] = useState("All");

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState("");

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    getProducts()
      .then(data => {
        if (!cancelled) {
          setProducts(data);
        }
      })
      .catch(error => {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load products."
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories =
    useMemo(() => {
      const values = products.map(
        product => product.category
      );

      return [
        "All",
        ...Array.from(
          new Set(values)
        )
      ];
    }, [products]);

  const filteredProducts =
    useMemo(() => {
      if (category === "All") {
        return products;
      }

      return products.filter(
        product =>
          product.category ===
          category
      );
    }, [
      products,
      category
    ]);

  return (
    <main className="page">
      <section className="hero">
        <span className="hero-label">
          WELCOME!
        </span>

        <h1>
          Find something you'll love.
        </h1>

      </section>

      <section>
        <div className="section-heading">
          <div>
            <h2>Products</h2>
            <p>
              Browse our collection.
            </p>
          </div>
        </div>

        <div className="category-list">
          {categories.map(
            item => (
              <button
                key={item}
                className={
                  category === item
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            )
          )}
        </div>

        {loading && (
          <div className="message">
            Loading products...
          </div>
        )}

        {error && (
          <div className="error-box">
            <strong>
              Unable to load products
            </strong>
            <p>{error}</p>
          </div>
        )}

        {!loading &&
          !error && (
            <ProductList
              products={
                filteredProducts
              }
            />
          )}
      </section>
    </main>
  );
}