import { Router } from 'express'
import getServerLiveness from '../controllers/monitoring/serverLivenessController'

export const monitoringRouter: Router = Router()

monitoringRouter.get('/livenessCheck', getServerLiveness)
