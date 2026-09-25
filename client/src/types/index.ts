export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | {
      type: "ADD_TO_CART";
      payload: Product;
    }
  | {
      type: "INCREASE_QUANTITY";
      payload: number;
    }
  | {
      type: "DECREASE_QUANTITY";
      payload: number;
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: number;
    }
  | {
      type: "CLEAR_CART";
    };

export type FulfillmentMethod =
  | "delivery"
  | "pickup";

export type CustomerInfo = {
  fullName: string;
  email: string;
  phone: string;
};

export type Fulfillment = {
  method: FulfillmentMethod;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

export type OrderPayload = {
  customer: CustomerInfo;
  fulfillment: Fulfillment;
  items: {
    productId: number;
    quantity: number;
  }[];
};

export type Order = {
  orderId: string;
  customer: CustomerInfo;
  fulfillment: Fulfillment;
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
};