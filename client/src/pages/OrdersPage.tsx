import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getOrders
} from "../services/api";

import type {
  Order
} from "../types";

export default function OrdersPage() {
  const navigate =
    useNavigate();

  const [
    email,
    setEmail
  ] = useState(
    localStorage.getItem(
      "customerEmail"
    ) || ""
  );

  const [
    orders,
    setOrders
  ] = useState<Order[]>([]);

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    error,
    setError
  ] = useState("");

  const [
    search,
    setSearch
  ] = useState("");

  async function loadOrders(
    customerEmail: string
  ) {
    if (!customerEmail.trim()) {
      setError(
        "Enter your email address."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data =
        await getOrders(
          customerEmail
        );

      setOrders(data);

      localStorage.setItem(
        "customerEmail",
        customerEmail
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const savedEmail =
      localStorage.getItem(
        "customerEmail"
      );

    if (savedEmail) {
      loadOrders(savedEmail);
    }
  }, []);

  const filteredOrders =
    useMemo(() => {
      return orders.filter(order =>
        order.orderId
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [orders, search]);

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

      <h1>My Orders</h1>

      <p className="muted">
        Enter the email used during
        checkout to track your orders.
      </p>

      <div className="order-search">
        <input
          className="input"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={event =>
            setEmail(
              event.target.value
            )
          }
        />

        <button
          className="primary-button"
          onClick={() =>
            loadOrders(email)
          }
        >
          Find Orders
        </button>
      </div>

      {loading && (
        <div className="message">
          Loading orders...
        </div>
      )}

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {orders.length > 0 && (
        <input
          className="input"
          placeholder="Search by Order ID"
          value={search}
          onChange={event =>
            setSearch(
              event.target.value
            )
          }
        />
      )}

      <div className="orders-list">
        {filteredOrders.map(
          order => (
            <article
              className="order-card"
              key={order.orderId}
            >
              <div className="order-header">
                <div>
                  <span className="muted">
                    Order ID
                  </span>

                  <h2>
                    {order.orderId}
                  </h2>
                </div>

                <span className="status-badge">
                  {order.status}
                </span>
              </div>

              <p>
                Date:{" "}
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>

              <p>
                Payment:{" "}
                <strong>
                  {order.paymentStatus}
                </strong>
              </p>

              <p>
                Fulfillment:{" "}
                <strong>
                  {order.fulfillment
                    .method ===
                  "delivery"
                    ? "Delivery"
                    : "Pickup"}
                </strong>
              </p>

              <div className="ordered-items">
                <h3>
                  Ordered Items
                </h3>

                {order.items.map(
                  item => (
                    <div
                      className="ordered-item"
                      key={
                        item.productId
                      }
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
                  )
                )}
              </div>

              <div className="summary-total">
                <span>
                  Total
                </span>

                <strong>
                  LKR{" "}
                  {order.total.toLocaleString(
                    "en-LK"
                  )}
                </strong>
              </div>
            </article>
          )
        )}
      </div>

      {!loading &&
        email &&
        filteredOrders.length === 0 && (
          <div className="message">
            No orders found.
          </div>
        )}
    </main>
  );
}