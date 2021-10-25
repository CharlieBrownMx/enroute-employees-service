import { DataTypes } from 'sequelize';

const Title = {
  emp_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  from_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  to_date: {
    type: DataTypes.DATE,
    allowNull: true,
  }
};

export default Title
