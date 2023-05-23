import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('colegio', 'classroom', 'linea123*', {
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

export default sequelize;