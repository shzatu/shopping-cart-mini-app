import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import Product from "../models/Product";

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {
      customer,
      fulfillment,
      items
    } = req.body;

    if (
      !customer?.fullName ||
      !customer?.email ||
      !customer?.phone
    ) {
      res.status(400).json({
        message:
          "Full name, email and phone number are required."
      });
      return;
    }

    if (!fulfillment?.method) {
      res.status(400).json({
        message: "Please select delivery or pickup."
      });
      return;
    }

    if (
      fulfillment.method === "delivery" &&
      (
        !fulfillment.address ||
        !fulfillment.city ||
        !fulfillment.province ||
        !fulfillment.postalCode ||
        !fulfillment.country
      )
    ) {
      res.status(400).json({
        message:
          "Complete shipping address details are required for delivery."
      });
      return;
    }

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        message: "Your cart is empty."
      });
      return;
    }

    const productIds = items.map(
      (item: { productId: number }) => item.productId
    );

    const products = await Product.find({
      id: { $in: productIds }
    }).lean();

    const productMap = new Map(
      products.map(product => [product.id, product])
    );

    const orderItems = items.map(
      (item: { productId: number; quantity: number }) => {
        const product = productMap.get(item.productId);

        if (!product) {
          throw new Error(
            `Product ${item.productId} was not found.`
          );
        }

        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: Math.max(1, Number(item.quantity))
        };
      }
    );

    const subtotal = orderItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    const shipping =
      fulfillment.method === "delivery" ? 1000 : 0;

    const tax = subtotal * 0.1;

    const total = subtotal + shipping + tax;

    const orderId = `ORD-${Date.now()}`;

    const order = await Order.create({
      orderId,
      customer,
      fulfillment,
      items: orderItems,
      subtotal,
      shipping,
      tax,
      total,
      status: "Placed",
      paymentStatus: "Paid"
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const email = String(req.query.email || "")
      .trim()
      .toLowerCase();

    if (!email) {
      res.status(400).json({
        message: "Email is required."
      });
      return;
    }

    const orders = await Order.find({
      "customer.email": email
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json(orders);
  } catch (error) {
    next(error);
  }
}