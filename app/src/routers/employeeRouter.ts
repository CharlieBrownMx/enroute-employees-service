import { Router } from 'express'
import getEmployeesController from '../controllers/employees/getEmployeesController'
import getEmployeeByIdController from '../controllers/employees/getEmployeeByIdController'
import getEmployeeTitlesByIdController from '../controllers/employees/getEmployeeTitlesByIdController'
import addEmployeeController from '../controllers/employees/addEmployeeController'

export const employeeRouter: Router = Router()

employeeRouter.get('/employeesExample', getEmployeesController)
employeeRouter.get('/employee/:id', getEmployeeByIdController)
employeeRouter.get('/employee/:id/titles', getEmployeeTitlesByIdController)
employeeRouter.post('/employee/add', addEmployeeController)
