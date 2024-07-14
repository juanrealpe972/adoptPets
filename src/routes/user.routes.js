import { Router } from "express";
import { 
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    activarUsuario,
    desactivarUsuario,
    getUser
} from "../controllers/user.controller.js";
import { validationRegisterUser, validationUpdateUser } from "../validations/user.validation.js";

const routerUser = Router();

routerUser.post("/users", createUser);
routerUser.get("/users", getUsers);
routerUser.put("/users/:id", validationUpdateUser, updateUser);
routerUser.get("/user/:id", getUser);
routerUser.delete("/users/:id", deleteUser);
routerUser.put("/usersac/:id", activarUsuario);
routerUser.put("/usersdes/:id", desactivarUsuario);

export default routerUser;