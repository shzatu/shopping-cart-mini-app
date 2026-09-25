import {
  useCallback,
  useState
} from "react";

import {
  createOrder
} from "../services/api";

import type {
  Order,
  OrderPayload
} from "../types";

type CheckoutStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export function useCheckout() {
  const [
    status,
    setStatus
  ] = useState<CheckoutStatus>("idle");

  const [
    errorMessage,
    setErrorMessage
  ] = useState("");

  const [
    createdOrder,
    setCreatedOrder
  ] = useState<Order | null>(null);

  const placeOrder = useCallback(
    async (
      orderData: OrderPayload
    ): Promise<Order | null> => {
      setStatus("loading");
      setErrorMessage("");
      setCreatedOrder(null);

      try {
        await new Promise(resolve =>
          setTimeout(resolve, 1200)
        );

        const order =
          await createOrder(orderData);

        setCreatedOrder(order);
        setStatus("success");

        return order;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to place the order.";

        setErrorMessage(message);
        setStatus("error");

        return null;
      }
    },
    []
  );

  return {
    status,
    errorMessage,
    createdOrder,
    placeOrder
  };
}