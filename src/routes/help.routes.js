import { Router } from "express";
import { getCategorias, getDepartamentos, getMunisForDepar, getRazasForCategorias } from "../controllers/help.controller.js";

const routerHelps = Router();

routerHelps.get("/departamentos", getDepartamentos);
routerHelps.get("/muni_depar/:id", getMunisForDepar);
routerHelps.get("/categorias", getCategorias);
routerHelps.get("/razas_cate/:id", getRazasForCategorias);

export default routerHelps;