"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curso = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const grupo_1 = require("./grupo");
exports.curso = connection_1.default.define('curso', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    code: {
        type: sequelize_1.DataTypes.STRING
    },
    creditos: {
        type: sequelize_1.DataTypes.INTEGER
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    temario: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.curso.hasMany(grupo_1.grupo);
grupo_1.grupo.belongsTo(exports.curso);
