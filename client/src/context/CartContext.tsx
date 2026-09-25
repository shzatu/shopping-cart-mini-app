import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode
} from "react";

import type {
  CartAction,
  CartState,
  Product
} from "../types";

const initialState: CartState = {
  items: []
};

function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        item =>
          item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1
                }
              : item
          )
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: 1
          }
        ]
      };
    }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
        )
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1
                }
              : item
          )
          .filter(
            item => item.quantity > 0
          )
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          item =>
            item.id !== action.payload
        )
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
}

type CartContextValue = {
  items: CartState["items"];
  cartItemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product) => void;
  increaseQuantity: (
    id: number
  ) => void;
  decreaseQuantity: (
    id: number
  ) => void;
  removeFromCart: (
    id: number
  ) => void;
  clearCart: () => void;
};

const CartContext =
  createContext<CartContextValue | undefined>(
    undefined
  );

export function CartProvider({
  children
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  const [
    isCartOpen,
    setIsCartOpen
  ] = useState(false);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const addToCart = useCallback(
    (product: Product) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: product
      });
    },
    []
  );

  const increaseQuantity = useCallback(
    (id: number) => {
      dispatch({
        type: "INCREASE_QUANTITY",
        payload: id
      });
    },
    []
  );

  const decreaseQuantity = useCallback(
    (id: number) => {
      dispatch({
        type: "DECREASE_QUANTITY",
        payload: id
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (id: number) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: id
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({
      type: "CLEAR_CART"
    });
  }, []);

  const cartItemCount = useMemo(
    () =>
      state.items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      cartItemCount,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart
    }),
    [
      state.items,
      cartItemCount,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider."
    );
  }

  return context;
}