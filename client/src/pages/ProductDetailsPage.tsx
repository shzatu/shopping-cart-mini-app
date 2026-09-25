import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import {
  getProductById
} from "../services/api";

import {
  useCart
} from "../context/CartContext";

import type {
  Product
} from "../types";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const {
    addToCart
  } = useCart();

  const [
    product,
    setProduct
  ] = useState<Product | null>(
    null
  );

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const product =
          await getProductById(
            Number(id)
          );

        setProduct(product);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load product."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        Loading product...
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page">
        <div className="error-box">
          {error ||
            "Product not found."}
        </div>

        <button
          className="secondary-button"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back
        </button>
      </main>
    );
  }

  return (
    <main className="page">
      <button
        className="back-button"
        onClick={() =>
          navigate(-1)
        }
      >
        ← Back
      </button>

      <div className="product-details">
        <img
          src={product.image}
          alt={product.name}
        />

        <div>
          <span className="category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="details-price">
            LKR{" "}
            {product.price.toLocaleString(
              "en-LK"
            )}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          <button
            className="primary-button large-button"
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to Cart
          </button>

          <Link
            to="/"
            className="text-link"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}