import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  CartProvider
} from "./context/CartContext";

import Header from "./components/Header";
import CartSidebar from "./components/CartSidebar";

import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />

        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/products/:id"
            element={
              <ProductDetailsPage />
            }
          />

          <Route
            path="/checkout"
            element={
              <CheckoutPage />
            }
          />

          <Route
            path="/orders"
            element={
              <OrdersPage />
            }
          />
        </Routes>

        <CartSidebar />
      </CartProvider>
    </BrowserRouter>
  );
}