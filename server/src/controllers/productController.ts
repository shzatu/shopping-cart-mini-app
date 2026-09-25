import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";

export async function getProducts(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const products = await Product.find()
      .sort({ category: 1, name: 1 })
      .lean();

    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const productId = Number(req.params.id);

    if (Number.isNaN(productId)) {
      res.status(400).json({
        message: "Invalid product ID."
      });
      return;
    }

    const product = await Product.findOne({
      id: productId
    }).lean();

    if (!product) {
      res.status(404).json({
        message: "Product not found."
      });
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}