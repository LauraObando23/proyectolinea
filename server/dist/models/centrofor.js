"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.centrofor = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.centrofor = connection_1.default.define('centrofor', {
    id_centro: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    centro: {
        type: sequelize_1.DataTypes.STRING
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    sede: {
        type: sequelize_1.DataTypes.STRING
    },
    numero_comunicacion: {
        type: sequelize_1.DataTypes.STRING
    }
});
