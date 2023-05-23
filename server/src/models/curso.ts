import { DataTypes } from 'sequelize';
import  sequelize  from '../db/connection';
import { grupo } from './grupo';

export const curso = sequelize.define('curso',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name:{
        type: DataTypes.STRING
    },
    code:{
        type: DataTypes.STRING
    },
    creditos:{
        type: DataTypes.INTEGER
    },
    description:{
        type: DataTypes.STRING
    },
    temario:{
        type: DataTypes.STRING
    }
})
curso.hasMany(grupo);
grupo.belongsTo(curso);
