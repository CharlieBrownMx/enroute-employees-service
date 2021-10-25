import { RequestHandler } from 'express'
import { HttpUnkownException } from '../../exceptions/HttpRequestExceptions'

const getServerLiveness: RequestHandler = async (req, res, next) => {
  try {
    const responseData = {
      status: 200,
      data: 'Server alive',
      success: true,
    }

    res.status(responseData.status).send(responseData)
  } catch(error){
    next(new HttpUnkownException(error))
  }
    return
}

export default getServerLiveness 
