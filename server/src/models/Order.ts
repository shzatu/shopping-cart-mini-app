import mongoose, { Schema, Document } from "mongoose";

interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface Customer {
  fullName: string;
  email: string;
  phone: string;
}

interface Fulfillment {
  method: "delivery" | "pickup";
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
}

export interface IOrder extends Document {
  orderId: string;
  customer: Customer;
  fulfillment: Fulfillment;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: Date;
}

const orderItemSchema = new Schema<OrderItem>(
  {
    productId: Number,
    name: String,
    price: Number,
    quantity: Number
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },

    customer: {
      fullName: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true
      },

      phone: {
        type: String,
        required: true
      }
    },

    fulfillment: {
      method: {
        type: String,
        enum: ["delivery", "pickup"],
        required: true
      },

      address: String,
      city: String,
      province: String,
      postalCode: String,
      country: String
    },

    items: {
      type: [orderItemSchema],
      required: true
    },

    subtotal: {
      type: Number,
      required: true
    },

    shipping: {
      type: Number,
      required: true
    },

    tax: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      default: "Placed"
    },

    paymentStatus: {
      type: String,
      default: "Paid"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IOrder>("Order", orderSchema);