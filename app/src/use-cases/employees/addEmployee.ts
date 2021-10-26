import ServiceTools from "./../../utilities/serviceTools";
import db from "./../../data-access/connection";

export const addEmployee = async (
  birth_date: Date,
  first_name: string,
  last_name: string,
  gender: string,
  hire_date: Date
) => {
  const { employeeId } = await getEmployeeId();

  const employee = {
    emp_no: (employeeId as number) + 1,
    birth_date: birth_date,
    first_name: first_name,
    last_name: last_name,
    gender: gender,
    hire_date: hire_date,
  };

  const { error } = ServiceTools.validateEmployee(employee);
  if (error) {
    return {
      error: {
        code: "ValidationError",
        message: error.message || undefined,
      },
      response: undefined,
    };
  }

  return {
    error: undefined,
    response: await db.models.employees.create(employee),
  };
};

const getEmployeeId = async () => {
  try {
    return {
      employeeId: await db.models.employees.max("emp_no"),
    };
  } catch (error) {
    return {
      employeeId: undefined,
    };
  }
};
