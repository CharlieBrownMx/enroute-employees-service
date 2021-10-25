import db from './../../data-access/connection'
import { Op, FindOptions } from 'sequelize'
import ServiceTools from './../../utilities/serviceTools'

export const getEmployeeById = async (id: string) => {
  try {
    const { error } = ServiceTools.validateEmployeeId(id);
    if (!error) {
      const parameters: FindOptions<any> = {
        where: {
          emp_no: id,
        },
      }
      return { error: undefined, response: await db.models.employees.findAll(parameters)}
    } else{
      return {
          error: {
            code: 'ValidationError',
            message: error.message || undefined,
          },
          response: undefined,
        }
    }
  } catch (error) {
      return { error, response: undefined }
  }
}
