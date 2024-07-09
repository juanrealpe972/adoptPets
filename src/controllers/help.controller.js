import { pool } from "../databases/conexion.js";

export const getDepartamentos = async (req, res) => {
    try {
        let sql = `SELECT * FROM departamentos`;
        const [rows] = await pool.query(sql);
        if (rows.length > 0) {
        res.status(200).json({ message: "Los departamentos son: ", data: rows });
        } else {
        res.status(404).json({ message: "No hay departamentos registrados por el momento" });}
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor " + error });
    }
};

export const getMunisForDepar = async (req, res) => {
    const { id } = req.params;
    try {
        let sql = `SELECT * FROM municipios WHERE fk_id_depar = ?`;
        const [rows] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            res.status(200).json({ message: "Los municipios son: ", data: rows });
        } else {
            res.status(404).json({ message: "No hay municipios registrados para este departamento" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor " + error });
    }
};

export const getCategorias = async (req, res) => {
    try {
        let sql = `SELECT * FROM categorias`;
        const [rows] = await pool.query(sql);
        if (rows.length > 0) {
        res.status(200).json({ message: "Las categorias son: ", data: rows });
        } else {
        res.status(404).json({ message: "No hay categorias registradas por el momento" });}
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor " + error });
    }
};

export const getRazasForCategorias = async (req, res) => {
    const { id } = req.params; 
    try {
        let sql = `SELECT * FROM razas WHERE fk_id_cate = ?`;
        const [rows] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            res.status(200).json({ message: "Las razas son: ", data: rows });
        } else {
            res.status(404).json({ message: "No hay razas registradas para esta categoría" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor " + error });
    }
};