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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCenter = exports.getCentrofor = void 0;
const centrofor_1 = require("../models/centrofor");
const getCentrofor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCentro = yield centrofor_1.centrofor.findAll();
    res.json(listCentro);
});
exports.getCentrofor = getCentrofor;
const newCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { centro, direccion, sede, numero_comunicacion } = req.body;
    //Validar existencia
    const ceenter = yield centrofor_1.centrofor.findOne({ where: { centro: centro } });
    const centerd = yield centrofor_1.centrofor.findOne({ where: { direccion: direccion } });
    if (ceenter) {
        return res.status(400).json({
            msg: `El usuario ${centro} ya existe!`
        });
    }
    else if (centerd) {
        return res.status(400).json({
            msg: `El usuario ${direccion} ya existe!`
        });
    }
    try {
        yield centrofor_1.centrofor.create({
            centro: centro,
            direccion: direccion,
            sede: sede,
            numero_comunicacion: numero_comunicacion
        });
        res.json({
            msg: `Centro de formación ${centro} registrado exitosamente!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error en registro',
            error
        });
    }
});
exports.newCenter = newCenter;
