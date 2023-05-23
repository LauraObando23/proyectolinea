"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGCc = exports.getGNc = exports.getGName = exports.getGNid = exports.getOneGroup = exports.deleteGroup = exports.updateGroup = exports.getGrupos = void 0;
const grupo_1 = require("../models/grupo");
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const getGrupos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const listGrupo = await grupo.findAll();
    const listGrupo = yield connection_1.default.query("SELECT g.id_group, g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id;", { type: sequelize_1.QueryTypes.SELECT });
    res.json(listGrupo);
});
exports.getGrupos = getGrupos;
//actualizacion y eliminacion
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json('Actualizando ' + req.params.numero_idt)
    const { id_group, group, cursoId, userIdUser } = req.body;
    const listGrupo = yield grupo_1.grupo.update({
        group: group,
        cursoId: cursoId,
        userIdUser: userIdUser
    }, {
        where: {
            id_group: id_group
        }
    });
    res.json(listGrupo);
});
exports.updateGroup = updateGroup;
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_group = req.params.id_group;
    const deleteGroup = yield grupo_1.grupo.destroy({
        where: {
            id_group: id_group
        }
    });
    res.status(204).json(deleteGroup);
});
exports.deleteGroup = deleteGroup;
const getOneGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json('Seleccionado '+ req.params.numero_idt)
    const id_group = req.params.id_group;
    const listGrupo = yield grupo_1.grupo.findOne({ where: { id_group: id_group } });
    if (listGrupo) {
        res.json(listGrupo);
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario ${id_group}`
        });
    }
});
exports.getOneGroup = getOneGroup;
const getGNid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero_idt } = req.body;
    //validacion de existencia
    const group = yield grupo_1.grupo.findOne({ where: { numero_idt: numero_idt } });
    if (group) {
        const users = yield connection_1.default.query("SELECT g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id WHERE s.numero_idt=?", { type: sequelize_1.QueryTypes.SELECT });
        res.json(users);
    }
});
exports.getGNid = getGNid;
const getGName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield connection_1.default.query("SELECT g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id WHERE s.name_user='Maria Fernandez'", { type: sequelize_1.QueryTypes.SELECT });
    res.json(users);
});
exports.getGName = getGName;
const getGNc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield connection_1.default.query("SELECT g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id WHERE c.name='Matematicas'", { type: sequelize_1.QueryTypes.SELECT });
    res.json(users);
});
exports.getGNc = getGNc;
const getGCc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield connection_1.default.query("SELECT g.group, s.name_user, c.name FROM grupos AS g INNER JOIN users AS s ON g.userIdUser=s.id_user INNER JOIN cursos AS c ON g.cursoId=c.id WHERE c.code='2397381'", { type: sequelize_1.QueryTypes.SELECT });
    res.json(users);
});
exports.getGCc = getGCc;
