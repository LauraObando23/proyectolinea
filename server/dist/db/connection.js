"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('colegio', 'classroom', 'linea123*', {
    host: 'classroomdb.mysql.database.azure.com',
    dialect: 'mysql',
    port: 3306,
    "ssl": true,
    "dialectOptions": {
        "ssl": {
            "require": true
        }
    }
});
exports.default = sequelize;
