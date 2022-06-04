import { Router } from "express";
import BairroController from "../controller/BairroController";

const bairroRotas = Router();

const bairroControler : BairroController = new BairroController();

bairroRotas.post('/', bairroControler.incluirBairro);
bairroRotas.put('/', bairroControler.alterarBairro);
bairroRotas.get('/', bairroControler.pesquisarBairro);

export default bairroRotas;