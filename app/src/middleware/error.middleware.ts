import { NextFunction, Request, Response } from "express";
import { HttpRequestException } from "../exceptions/HttpRequestExceptions";

const errorMiddleware = (
  error: HttpRequestException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "/! Oh no! Something went wrong /!\\";
  const type = error.type || "HttpUnkownException";
  const moreInfo = error.moreInfo || "No more info available";
  const success = error.success || false;

  response.status(statusCode).send({
    statusCode,
    type,
    message,
    moreInfo,
    success,
  });
};

export default errorMiddleware;
