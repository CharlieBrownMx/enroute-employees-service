import db from './../../data-access/connection'
import { Op, FindOptions } from 'sequelize'

export const getEmployees = async () => {
  try {
    const parameters: FindOptions<any> = {
      where: {
          hire_date: {
              [Op.between]: ['1990-01-01', '1990-01-15'],
          },
      },
      order: [
        ['last_name', 'ASC'],
      ]
    }
    return { error: undefined, response: await db.models.employees.findAll(parameters) }
  } catch (error) {
      return { error, response: undefined }
  }
}
