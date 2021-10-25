import { RequestHandler } from 'express'
import { NotFound } from '../exceptions/HttpRequestExceptions'

const invalidRequestController: RequestHandler = async (req, res, next) => {
  next(new NotFound())
}

export default invalidRequestController
