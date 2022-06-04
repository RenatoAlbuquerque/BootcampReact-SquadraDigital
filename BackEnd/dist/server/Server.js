"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rotas_1 = __importDefault(require("../rotas"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
function interceptador(request, response, proximo) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    const { method, url } = request;
    console.log(`[${method.toUpperCase()}] ${url} `);
    return proximo();
}
app.use(interceptador);
app.use(rotas_1.default);
app.listen(3333, () => {
    console.log('O SERVIDOR FOI INICIALIZADO...');
});
//# sourceMappingURL=Server.js.map