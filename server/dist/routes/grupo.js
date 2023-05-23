"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grupo_1 = require("../controllers/grupo");
const validate_token_1 = __importDefault(require("./validate_token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, grupo_1.getGrupos);
router.post('/filterid/:numero_idt=', grupo_1.getGNid);
router.get('/filternu', grupo_1.getGName);
router.get('/filternc', grupo_1.getGNc);
router.get('/filtercc', grupo_1.getGCc);
// crud
router.put('/:id_group', grupo_1.updateGroup);
router.delete('/:id_group', grupo_1.deleteGroup);
router.get('/:id_group', grupo_1.getOneGroup);
exports.default = router;
