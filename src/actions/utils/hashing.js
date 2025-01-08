"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPin = hashPin;
exports.verifyPin = verifyPin;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashPin(pin) {
    return bcrypt_1.default.hashSync(pin, 10);
}
function verifyPin(pin, hashedPin) {
    return bcrypt_1.default.compareSync(pin, hashedPin);
}
