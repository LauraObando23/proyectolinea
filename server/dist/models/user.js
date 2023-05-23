"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const grupo_1 = require("./grupo");
exports.user = connection_1.default.define('user', {
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    numero_idt: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    tipo_usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
exports.user.hasMany(grupo_1.grupo);
grupo_1.grupo.belongsTo(exports.user);
