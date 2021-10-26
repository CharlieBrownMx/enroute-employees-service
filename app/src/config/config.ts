import dotenv from "dotenv";

dotenv.config();

const dbconfig = {
  hostname: process.env.DB_HOSTNAME,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  root_password: process.env.MYSQL_ROOT_PASSWORD,
};

export { dbconfig };
