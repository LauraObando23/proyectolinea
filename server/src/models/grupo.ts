import { DataTypes } from 'sequelize';
import  sequelize  from '../db/connection';

export const grupo = sequelize.define('grupo',{
    id_group:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    group:{
        type: DataTypes.STRING
    }
})



