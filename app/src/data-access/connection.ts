import { Sequelize } from 'sequelize';
import { dbconfig } from './../config/config'
import Employee from './definitions/employees'
import Title from './definitions/titles'

const database = dbconfig.database || '';
const user = dbconfig.user || '';
const password = dbconfig.password || '';
const hostname = dbconfig.hostname || '';

const db = new Sequelize(database, user, password, {
    host: hostname,
    dialect: 'mysql',
    define: {
        timestamps: false,
        charset: 'utf8',
    },
    logging: false
});

db.define('employees', Employee)
db.define('titles', Title)

export default db;