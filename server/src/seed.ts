import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "./config/db";
import Product from "./models/Product";

dotenv.config();

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    description:
      "Comfortable wireless headphones with clear sound and long battery life.",
    price: 14999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 2,
    name: "Bluetooth Speaker",
    category: "Electronics",
    description:
      "Portable Bluetooth speaker suitable for music at home or outdoors.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    description:
      "Modern smart watch with fitness tracking and everyday notifications.",
    price: 19500,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 4,
    name: "Wireless Mouse",
    category: "Computer Accessories",
    description:
      "Ergonomic wireless mouse designed for everyday computer use.",
    price: 3750,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 5,
    name: "Mechanical Keyboard",
    category: "Computer Accessories",
    description:
      "Mechanical keyboard with responsive keys for work and gaming.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 6,
    name: "Laptop Stand",
    category: "Computer Accessories",
    description:
      "Adjustable laptop stand for a more comfortable workstation.",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 7,
    name: "Webcam",
    category: "Computer Accessories",
    description:
      "HD webcam suitable for online meetings, classes and video calls.",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 8,
    name: "Phone Case",
    category: "Mobile Accessories",
    description:
      "Protective phone case with a simple modern design.",
    price: 1600,
    image:
      "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 9,
    name: "USB-C Cable",
    category: "Mobile Accessories",
    description:
      "Durable USB-C charging and data cable.",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 12,
    name: "Desk Lamp",
    category: "Home & Desk",
    description:
      "Modern desk lamp suitable for studying and working.",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 14,
    name: "Desk Organizer",
    category: "Home & Desk",
    description:
      "Simple organizer for keeping your workspace neat and tidy.",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 15,
    name: "Gaming Mouse",
    category: "Gaming",
    description:
      "Responsive gaming mouse designed for accurate control.",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 16,
    name: "Gaming Keyboard",
    category: "Gaming",
    description:
      "Responsive keyboard designed for gaming and everyday use.",
    price: 20500,
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 17,
    name: "Game Controller",
    category: "Gaming",
    description:
      "Comfortable wireless controller for compatible gaming devices.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 18,
    name: "Gaming Headset",
    category: "Gaming",
    description:
      "Gaming headset with comfortable ear cushions and clear audio.",
    price: 14500,
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 19,
    name: "Portable SSD",
    category: "Computer Accessories",
    description:
      "Compact external SSD for storing and transferring your files.",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: 20,
    name: "Tablet Stand",
    category: "Home & Desk",
    description:
      "Adjustable stand for comfortable tablet viewing.",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80"
  }
];

async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    await Product.deleteMany({});

    await Product.insertMany(products);

    products.forEach(product => {
      console.log(
        `Seeded product: ${product.name}`
      );
    });

    console.log(
      "Products inserted successfully."
    );

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error(
      "Seed failed:",
      error
    );

    await mongoose.disconnect();

    process.exit(1);
  }
}

seedDatabase();