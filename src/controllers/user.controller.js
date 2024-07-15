import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";
import bcrypt from "bcrypt"; 
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/img");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const uploat = multer({ storage: storage });
// export const cargarImagen = uploat.single("imagen_user");

export const getUsers = async (req, res) => {
  try {
    let sql = `SELECT * FROM usuarios`;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      res.status(200).json({ message: "Los usuarios son: ", data: rows });
    } else {
      res.status(404).json({ message: "No hay usuarios registrados por el momento" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    let sql = `SELECT u.*, m.*, d.*
      FROM usuarios u
      JOIN municipios m ON u.fk_id_municipio = m.pk_id_muni
      JOIN departamentos d ON m.fk_id_depar = d.pk_id_depar
      WHERE pk_id_user = ?`;
    const [rows] = await pool.query(sql, [id]);
    if (rows.length > 0) {
      res.status(200).json({ message: "Los usuarios son: ", data: rows });
    } else {
      res.status(404).json({ message: "No hay usuarios registrados por el momento" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const createUser = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      pk_id_user, 
      nombre_user, 
      email_user, 
      password_user, 
      telefono_user, 
      ubicacion_user, 
      tipo_vivienda_user, 
      espacio_dispo_user, 
      canti_mas_hogar_user, 
      horas_en_casa_user, 
      experiencia_user, 
      disponibilidad_user, 
      economia_user, 
      fk_id_municipio 
    } = req.body;
    const bcryptPassword = bcrypt.hashSync(password_user, 12);
    
    let sql = `INSERT INTO usuarios (pk_id_user, nombre_user, email_user, password_user, telefono_user, ubicacion_user, tipo_vivienda_user, espacio_dispo_user, canti_mas_hogar_user, horas_en_casa_user, experiencia_user, disponibilidad_user, economia_user, fk_id_municipio, rol_user, estado_user) VALUES ('${pk_id_user}', '${nombre_user}','${email_user}','${bcryptPassword}', '${telefono_user}', '${ubicacion_user}', '${tipo_vivienda_user}', '${espacio_dispo_user}', '${canti_mas_hogar_user}', '${horas_en_casa_user}', '${experiencia_user}', '${disponibilidad_user}', '${economia_user}', '${fk_id_municipio}', 'visitante', 'activo')`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario creado exitosamente" });
    } else {
      res.status(404).json({ message: "No se pudo crear el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const updateUser = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const {       
      pk_id_user, 
      nombre_user, 
      email_user, 
      telefono_user, 
      ubicacion_user, 
      tipo_vivienda_user, 
      espacio_dispo_user, 
      canti_mas_hogar_user, 
      horas_en_casa_user, 
      experiencia_user, 
      disponibilidad_user, 
      economia_user, 
      fk_id_municipio 
    } = req.body;

    let sql = `UPDATE usuarios SET 
      pk_id_user = IFNULL(?, pk_id_user), 
      nombre_user = IFNULL(?, nombre_user), 
      email_user = IFNULL(?, email_user), 
      telefono_user = IFNULL(?, telefono_user), 
      ubicacion_user = IFNULL(?, ubicacion_user), 
      tipo_vivienda_user = IFNULL(?, tipo_vivienda_user), 
      espacio_dispo_user = IFNULL(?, espacio_dispo_user), 
      canti_mas_hogar_user = IFNULL(?, canti_mas_hogar_user), 
      horas_en_casa_user = IFNULL(?, horas_en_casa_user), 
      experiencia_user = IFNULL(?, experiencia_user), 
      disponibilidad_user = IFNULL(?, disponibilidad_user), 
      economia_user = IFNULL(?, economia_user), 
      fk_id_municipio = IFNULL(?, fk_id_municipio) 
      WHERE pk_id_user = ?`;

    const [result] = await pool.query(sql, [
      pk_id_user, 
      nombre_user, 
      email_user, 
      telefono_user, 
      ubicacion_user, 
      tipo_vivienda_user, 
      espacio_dispo_user, 
      canti_mas_hogar_user, 
      horas_en_casa_user, 
      experiencia_user, 
      disponibilidad_user, 
      economia_user, 
      fk_id_municipio,
      id
    ]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario actualizado con éxito" });
    } else {
      res.status(404).json({ message: "No se pudo actualizar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    let sql = `DELETE FROM usuarios WHERE pk_id_user = '${id}'`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario eliminado con exito" });
    } else {
      res.status(404).json({ message: "Error con el ID al eliminar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const desactivarUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE usuarios SET estado_user = 2 WHERE pk_id_user = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario desactivado exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ningun usuario con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const activarUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE usuarios SET estado_user = 1 WHERE pk_id_user = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario activado exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ningun usuario con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

