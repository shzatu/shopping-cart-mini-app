import {
  Link
} from "react-router-dom";

import {
  useCart
} from "../context/CartContext";

export default function Header() {
  const {
    cartItemCount,
    openCart
  } = useCart();

  return (
    <header className="header">
      <Link
        to="/"
        className="logo"
      >
        MiniShop
      </Link>

      <nav className="nav">
        <Link to="/">
          Home
        </Link>

        <Link to="/orders">
          My Orders
        </Link>

        <button
          className="cart-button"
          onClick={openCart}
        >
          🛒 Cart
          <span className="cart-badge">
            {cartItemCount}
          </span>
        </button>
      </nav>
    </header>
  );
}