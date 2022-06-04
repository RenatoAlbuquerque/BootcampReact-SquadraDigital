"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractError extends Error {
    constructor(mensagem, status, causa) {
        super((causa != null ? causa.message : "SEM DETALHES"));
        this.mensagem = "";
        this.status = 0;
        console.log(causa);
        this.mensagem = mensagem;
        this.status = status;
    }
}
exports.default = AbstractError;
//# sourceMappingURL=AbstractError.js.map