import { RequestHandler } from "express";
import { getEmployeeTitlesById } from "./.././../use-cases/employees/getEmployeeTitlesById";

import {
  ResourceNotFoundException,
  HttpUnkownException,
  ValidationError,
} from "../../exceptions/HttpRequestExceptions";

const getEmployeeTitlesByIdController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    let { error, response } = await getEmployeeTitlesById(id);

    if (!error) {
      const responseData = {
        status: 200,
        data: response || "No data was return",
        success: true,
      };

      res.status(responseData.status).send(responseData);
    } else {
      const errorData = {
        status: (error as any).statusCode
          ? (error as any).statusCode
          : undefined,
        code: (error as any).code ? (error as any).code : undefined,
        message: (error as any).message ? (error as any).message : undefined,
        moreInfo: (error as any).moreInfo ? (error as any).moreInfo : undefined,
        success: (error as any).success ? (error as any).success : undefined,
      };
      switch (errorData.code) {
        case "ResourceNotFoundException": {
          next(new ResourceNotFoundException());
          break;
        }
        case "ValidationError": {
          next(new ValidationError(errorData));
        }
        default: {
          next(new HttpUnkownException(errorData));
          break;
        }
      }
      return;
    }
  } catch (error) {
    next(new HttpUnkownException(error));
    return;
  }
};

export default getEmployeeTitlesByIdController;
