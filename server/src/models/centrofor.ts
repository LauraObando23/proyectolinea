import { DataTypes } from 'sequelize';
import  sequelize  from '../db/connection';

export const centrofor = sequelize.define('centrofor',{
    id_centro:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    centro:{
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING
    },
    sede:{
        type: DataTypes.STRING
    },
    numero_comunicacion:{
        type: DataTypes.STRING
    }
})