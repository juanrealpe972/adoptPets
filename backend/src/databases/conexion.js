import { createPool } from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "../config.js";

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME,
});

//Validar conexión a la base de datos
pool.getConnection()
    .then((connect) => {
        console.log("Conexión a base de datos exitosa.");
        connect.release();
    })
    .catch((error) => {
        console.error("Conexion a base de datos fallida. " + error);
    });
