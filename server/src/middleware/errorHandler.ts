import {
  Request,
  Response,
  NextFunction
} from "express";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(error);

  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong.";

  res.status(500).json({
    message
  });
}