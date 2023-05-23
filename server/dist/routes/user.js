"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate_token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, user_1.getUsers);
router.post('/', user_1.newUser);
router.post('/login', user_1.loginUser);
//nuevos
router.put('/:numero_idt', user_1.updateUsers);
router.delete('/:numero_idt', user_1.deleteUsers);
router.get('/:numero_idt', user_1.getOneUsers);
router.get('/:name_user', user_1.getOneUserN);
exports.default = router;
