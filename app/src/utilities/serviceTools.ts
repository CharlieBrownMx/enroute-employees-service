import Joi from 'joi'

class ServiceTools {
  static validateEmployee = (employee: Object) => {
    return Joi.object({
      emp_no: Joi.number()
        .min(1)
        .required()
        .error(new Error('The parameter \'id\' must be a number')),
      birth_date: Joi.date().required().error(new Error('Date format should be: \'YYYY-MM-DD\'')),
      first_name: Joi.string().min(1).max(14).required(),
      last_name: Joi.string().min(1).max(16).required(),
      gender: Joi.string().valid('M', 'F'),
      hire_date: Joi.date().required().error(new Error('Date format should be: \'YYYY-MM-DD\'')),
    }).validate(employee)
  }

  static validateEmployeeId = (id: string) => {
    return Joi.number()
      .min(1)
      .required()
      .error(new Error('The parameter \'id\' must be a number'))
      .validate(id)
  }
}

export default ServiceTools
