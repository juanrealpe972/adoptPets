import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: "monorail.proxy.rlwy.net",
    user: "root",
    password: "nThkSWCVYUTVJBjdLtevgsDiiQcUXvGE",
    port: 24281,
    database: "railway",
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
