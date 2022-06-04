"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractError_1 = __importDefault(require("./AbstractError"));
class ConexaoError extends AbstractError_1.default {
    constructor(mensagem, status, causa) {
        super(mensagem, status, causa);
    }
}
exports.default = ConexaoError;
//# sourceMappingURL=ConexaoError.js.map