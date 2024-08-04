import { Router } from "express";
import { activarMascota, cargarImagen, createPet, deleteAdopt, deleteMascota, desactivarMascota, esperaMascota, getMisPets, getPet, getPetDue, getPets, getPetsActivos, getPetsEspera, getPetsInactivo, updatePet } from "../controllers/pets.controller.js";

const routerPet = Router();

routerPet.get("/pets", getPets);
routerPet.get("/petsactivos", getPetsActivos);
routerPet.get("/petsespera", getPetsEspera);
routerPet.get("/petsinactivos", getPetsInactivo);
routerPet.get("/petsone/:id", getPet);
routerPet.get("/mispets/:id", getMisPets);
routerPet.get("/petsone-due/:id", getPetDue);
routerPet.post("/pets", cargarImagen, createPet);
routerPet.put("/pets/:id", cargarImagen, updatePet);
routerPet.put("/petsdes/:id", desactivarMascota);
routerPet.put("/petses/:id", esperaMascota);
routerPet.put("/petsac/:id", activarMascota);
routerPet.put("/petsdeleteadop/:id", deleteAdopt);
routerPet.delete("/pets/:id", deleteMascota);

export default routerPet;