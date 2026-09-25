import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useCart
} from "../context/CartContext";

import {
  useCheckout
} from "../hooks/useCheckout";

import type {
  FulfillmentMethod,
  OrderPayload
} from "../types";

export default function CheckoutPage() {
  const navigate =
    useNavigate();

  const {
    items,
    clearCart
  } = useCart();

  const {
    status,
    errorMessage,
    createdOrder,
    placeOrder
  } = useCheckout();

  const [
    fullName,
    setFullName
  ] = useState("");

  const [
    email,
    setEmail
  ] = useState("");

  const [
    phone,
    setPhone
  ] = useState("");

  const [
    method,
    setMethod
  ] =
    useState<FulfillmentMethod>(
      "delivery"
    );

  const [
    address,
    setAddress
  ] = useState("");

  const [
    city,
    setCity
  ] = useState("");

  const [
    province,
    setProvince
  ] = useState("");

  const [
    postalCode,
    setPostalCode
  ] = useState("");

  const [
    country,
    setCountry
  ] = useState("Sri Lanka");

  const [
    validationError,
    setValidationError
  ] = useState("");

  const subtotal =
    items.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  const shipping =
    method === "delivery"
      ? 1000
      : 0;

  const tax =
    subtotal * 0.1;

  const total =
    subtotal +
    shipping +
    tax;

  function validateForm(): boolean {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      setValidationError(
        "Please complete your name, email and phone number."
      );

      return false;
    }

    if (
      method === "delivery" &&
      (
        !address.trim() ||
        !city.trim() ||
        !province.trim() ||
        !postalCode.trim() ||
        !country.trim()
      )
    ) {
      setValidationError(
        "Please complete all shipping address details for delivery."
      );

      return false;
    }

    setValidationError("");

    return true;
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const orderData: OrderPayload = {
      customer: {
        fullName,
        email,
        phone
      },

      fulfillment: {
        method,
        address,
        city,
        province,
        postalCode,
        country
      },

      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    const order =
      await placeOrder(orderData);

    if (order) {
      localStorage.setItem(
        "customerEmail",
        email
      );

      clearCart();
    }
  }

  if (status === "success" &&
      createdOrder) {
    return (
      <main className="page">
        <div className="success-card">
          <div className="success-icon">
            ✓
          </div>

          <h1>Order Successful!</h1>

          <p>
            Your order has been placed
            successfully.
          </p>

          <div className="order-id">
            Order ID:
            <strong>
              {createdOrder.orderId}
            </strong>
          </div>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/orders")
            }
          >
            View My Orders
          </button>

          <button
            className="secondary-button"
            onClick={() =>
              navigate("/")
            }
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="page">
        <div className="failure-card">
          <div className="failure-icon">
            ×
          </div>

          <h1>
            Order Failed
          </h1>

          <p>
            We couldn't place your
            order.
          </p>

          <div className="error-box">
            {errorMessage}
          </div>

          <button
            className="primary-button"
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>

          <button
            className="secondary-button"
            onClick={() =>
              navigate("/")
            }
          >
            ← Back to Shopping
          </button>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
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

        <div className="message">
          Your cart is empty.
        </div>
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

      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <section className="form-section">
            <h2>
              Customer Details
            </h2>

            <input
              className="input"
              placeholder="Full Name"
              value={fullName}
              onChange={event =>
                setFullName(
                  event.target.value
                )
              }
              required
            />

            <input
              className="input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={event =>
                setEmail(
                  event.target.value
                )
              }
              required
            />

            <input
              className="input"
              placeholder="Phone Number"
              value={phone}
              onChange={event =>
                setPhone(
                  event.target.value
                )
              }
              required
            />
          </section>

          <section className="form-section">
            <h2>
              Fulfillment
            </h2>

            <label className="radio-row">
              <input
                type="radio"
                checked={
                  method ===
                  "delivery"
                }
                onChange={() =>
                  setMethod(
                    "delivery"
                  )
                }
              />
              Delivery
            </label>

            <label className="radio-row">
              <input
                type="radio"
                checked={
                  method === "pickup"
                }
                onChange={() =>
                  setMethod("pickup")
                }
              />
              Pickup
            </label>
          </section>

          {method ===
            "delivery" && (
            <section className="form-section">
              <h2>
                Shipping Address
              </h2>

              <input
                className="input"
                placeholder="Address"
                value={address}
                onChange={event =>
                  setAddress(
                    event.target.value
                  )
                }
                required
              />

              <input
                className="input"
                placeholder="City"
                value={city}
                onChange={event =>
                  setCity(
                    event.target.value
                  )
                }
                required
              />

              <input
                className="input"
                placeholder="Province"
                value={province}
                onChange={event =>
                  setProvince(
                    event.target.value
                  )
                }
                required
              />

              <input
                className="input"
                placeholder="Postal Code"
                value={postalCode}
                onChange={event =>
                  setPostalCode(
                    event.target.value
                  )
                }
                required
              />

              <input
                className="input"
                placeholder="Country"
                value={country}
                onChange={event =>
                  setCountry(
                    event.target.value
                  )
                }
                required
              />
            </section>
          )}

          {validationError && (
            <div className="error-box">
              {validationError}
            </div>
          )}

          <button
            className="primary-button large-button"
            type="submit"
            disabled={
              status === "loading"
            }
          >
            {status === "loading"
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </form>

        <aside className="review-card">
          <h2>
            Order Summary
          </h2>

          {items.map(item => (
            <div
              className="review-item"
              key={item.id}
            >
              <span>
                {item.name} ×{" "}
                {item.quantity}
              </span>

              <strong>
                LKR{" "}
                {(
                  item.price *
                  item.quantity
                ).toLocaleString(
                  "en-LK"
                )}
              </strong>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>
              LKR{" "}
              {subtotal.toLocaleString(
                "en-LK"
              )}
            </strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong>
              LKR{" "}
              {shipping.toLocaleString(
                "en-LK"
              )}
            </strong>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <strong>
              LKR{" "}
              {tax.toLocaleString(
                "en-LK"
              )}
            </strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>
              LKR{" "}
              {total.toLocaleString(
                "en-LK"
              )}
            </strong>
          </div>
        </aside>
      </div>
    </main>
  );
}