import {
  useEffect,
  useMemo,
  useRef
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useCart
} from "../context/CartContext";

export default function CartSidebar() {
  const navigate =
    useNavigate();

  const {
    items,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  const promoInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      promoInputRef.current?.focus();
    }
  }, [isCartOpen]);

  const {
    subtotal,
    shipping,
    tax,
    total
  } = useMemo(() => {
    const subtotal =
      items.reduce(
        (sum, item) =>
          sum +
          item.price *
            item.quantity,
        0
      );

    const shipping =
      subtotal > 0 ? 1000 : 0;

    const tax =
      subtotal * 0.1;

    const total =
      subtotal +
      shipping +
      tax;

    return {
      subtotal,
      shipping,
      tax,
      total
    };
  }, [items]);

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="cart-overlay">
      <aside className="cart-sidebar">
        <div className="cart-header">
          <h2>Your Cart</h2>

          <button
            className="close-button"
            onClick={closeCart}
          >
            ×
          </button>
        </div>

        <input
          ref={promoInputRef}
          className="input"
          placeholder="Promo code"
        />

        {items.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>

            <button
              className="secondary-button"
              onClick={closeCart}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">
                    <strong>
                      {item.name}
                    </strong>

                    <p>
                      LKR{" "}
                      {item.price.toLocaleString(
                        "en-LK"
                      )}
                    </p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                      >
                        +
                      </button>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <strong>
                  LKR{" "}
                  {subtotal.toLocaleString(
                    "en-LK"
                  )}
                </strong>
              </div>

              <div>
                <span>Shipping</span>
                <strong>
                  LKR{" "}
                  {shipping.toLocaleString(
                    "en-LK"
                  )}
                </strong>
              </div>

              <div>
                <span>Tax</span>
                <strong>
                  LKR{" "}
                  {tax.toLocaleString(
                    "en-LK"
                  )}
                </strong>
              </div>

              <div className="total-row">
                <span>Total</span>
                <strong>
                  LKR{" "}
                  {total.toLocaleString(
                    "en-LK"
                  )}
                </strong>
              </div>

              <button
                className="primary-button"
                onClick={() => {
                  closeCart();
                  navigate("/checkout");
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}