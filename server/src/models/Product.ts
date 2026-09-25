import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

const productSchema = new Schema<IProduct>(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IProduct>("Product", productSchema);