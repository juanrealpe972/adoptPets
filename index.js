import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import autenticacionRouter from "./src/routes/autenticacion.routes.js";
import routerUser from "./src/routes/user.routes.js";
import routerPet from "./src/routes/pets.routes.js";
import routerHelps from "./src/routes/help.routes.js";

import { PORT } from "./src/config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", autenticacionRouter);
app.use("/v1", routerUser);
app.use("/v1", routerPet);
app.use("/v1", routerHelps);

app.set("view engine", "ejs");
app.set("views", "./view");
app.use(express.static('./public'))

app.get("/", (req, res) => {
  res.send('Welcome to AdoptsPets Server')
})
app.get("/documents", (req, res) => {
  res.render("documentacion.ejs");
});

app.listen(PORT, () => {
  console.log("El servidor se esta ejecutando en el puerto: ", PORT);
}); 