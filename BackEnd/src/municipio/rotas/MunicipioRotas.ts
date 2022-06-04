import { Router } from "express";
import MunicipioController from "../controller/MunicipioController";

const municipioRotas = Router();

const municipioControler : MunicipioController = new MunicipioController();

municipioRotas.post('/', municipioControler.incluirMunicipio);
municipioRotas.put('/', municipioControler.alterarMunicipio);
municipioRotas.get('/', municipioControler.pesquisarMunicipio);

export default municipioRotas;