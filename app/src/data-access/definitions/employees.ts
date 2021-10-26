import { DataTypes } from "sequelize";

const Employee = {
  emp_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("M", "F"),
    allowNull: false,
  },
  hire_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
};

export default Employee;
