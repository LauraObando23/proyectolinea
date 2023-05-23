"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate_token"));
const centrofor_1 = require("../controllers/centrofor");
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, centrofor_1.getCentrofor);
router.post('/', centrofor_1.newCenter);
exports.default = router;
