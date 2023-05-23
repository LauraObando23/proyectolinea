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
exports.forgotPassword = exports.getOneUserN = exports.getOneUsers = exports.deleteUsers = exports.updateUsers = exports.getUsers = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name_user, email, numero_idt, tipo_usuario, password } = req.body;
    //Validar existencia
    const useer = yield user_1.user.findOne({ where: { email: email } });
    const usern = yield user_1.user.findOne({ where: { numero_idt: numero_idt } });
    if (useer) {
        return res.status(400).json({
            msg: `El usuario ${email} ya existe!`
        });
    }
    else if (usern) {
        return res.status(400).json({
            msg: `El usuario ${numero_idt} ya existe!`
        });
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_1.user.create({
            name_user: name_user,
            email: email,
            numero_idt: numero_idt,
            tipo_usuario: tipo_usuario,
            password: hashPassword
        });
        res.json({
            msg: `Usuario ${name_user} registrado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error en registro',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //validacion de existencia
    const usser = yield user_1.user.findOne({ where: { email: email } });
    if (!usser) {
        return res.status(400).json({
            msg: `No existe usuario con el correo ${email} en base de datos`
        });
    }
    //validar contraseña
    const passwordvalida = yield bcrypt_1.default.compare(password, usser.password);
    if (!passwordvalida) {
        return res.status(400).json({
            msg: `Contraseña incorrecta`
        });
    }
    //generar token
    const token = jsonwebtoken_1.default.sign({
        email: email
    }, process.env.secretkey || 'dft123');
    res.json(token);
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsers = yield user_1.user.findAll();
    res.json(listUsers);
});
exports.getUsers = getUsers;
//actualizacion y eliminacion
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json('Actualizando ' + req.params.numero_idt)
    const { name_user, email, tipo_usuario, password } = req.body;
    const numero_idt = req.params.numero_idt;
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    const listUpdate = yield user_1.user.update({
        name_user: name_user,
        email: email,
        numero_idt: numero_idt,
        tipo_usuario: tipo_usuario,
        password: hashPassword
    }, {
        where: {
            numero_idt: numero_idt
        }
    });
    res.json(listUpdate);
});
exports.updateUsers = updateUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json('Eliminando '+ req.params.numero_idt)
    const numero_idt = req.params.numero_idt;
    const deleteUser = yield user_1.user.destroy({
        where: {
            numero_idt: numero_idt
        }
    });
    res.status(204).json(deleteUser);
});
exports.deleteUsers = deleteUsers;
const getOneUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json('Seleccionado '+ req.params.numero_idt)
    const numero_idt = req.params.numero_idt;
    const listUser = yield user_1.user.findOne({ where: { numero_idt: numero_idt } });
    if (listUser) {
        res.json(listUser);
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario ${numero_idt}`
        });
    }
});
exports.getOneUsers = getOneUsers;
const getOneUserN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json('Seleccionado '+ req.params.numero_idt)
    const name_user = req.params.numero_idt;
    const listUser = yield user_1.user.findOne({ where: { name_user: name_user } });
    if (listUser) {
        res.json(listUser);
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario ${name_user}`
        });
    }
});
exports.getOneUserN = getOneUserN;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name_user } = req.body;
    if (!name_user) {
        res.status(400).json({
            msg: `Se requiere el usuario`
        });
    }
    const mss = '';
});
exports.forgotPassword = forgotPassword;
