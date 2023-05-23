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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const curso_1 = __importDefault(require("../routes/curso"));
const user_1 = __importDefault(require("../routes/user"));
const grupo_1 = __importDefault(require("../routes/grupo"));
const centrofor_1 = __importDefault(require("../routes/centrofor"));
const curso_2 = require("./curso");
const user_2 = require("./user");
const grupo_2 = require("./grupo");
const centrofor_2 = require("./centrofor");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.port || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/cursos', curso_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/grupos', grupo_1.default);
        this.app.use('/api/centro', centrofor_1.default);
    }
    midlewares() {
        //parseo body
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield curso_2.curso.sync({ alter: true });
                yield user_2.user.sync();
                yield grupo_2.grupo.sync();
                yield centrofor_2.centrofor.sync();
                console.log('Conexion establecida ok');
            }
            catch (error) {
                console.log('Error en conexion', error);
            }
        });
    }
}
exports.default = Server;
