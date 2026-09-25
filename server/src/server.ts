import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { connectDatabase } from "./config/db";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    message: "Shopping cart API is running."
  });
});

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use(errorHandler);

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error
    );

    process.exit(1);
  }
}

startServer();