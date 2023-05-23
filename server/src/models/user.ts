import { DataTypes } from 'sequelize';
import  sequelize  from '../db/connection';
import { grupo } from './grupo';

export const user = sequelize.define('user',{
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name_user:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    numero_idt:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    tipo_usuario:{
        type: DataTypes.STRING,
        allowNull: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true
    }
})
user.hasMany(grupo);
grupo.belongsTo(user);