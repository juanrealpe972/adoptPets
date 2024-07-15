import { validationResult } from "express-validator";
import { pool } from "../databases/conexion.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/pets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploat = multer({ storage: storage });
export const cargarImagen = uploat.single("imagen_pet");

export const getPets = async (req, res) => {
  try {
    let sql =
    `
      SELECT m.*, r.nombre_raza, c.nombre_cate 
      FROM mascotas m
      JOIN razas r ON m.fk_raza_mas = r.pk_id_raza
      JOIN categorias c ON r.fk_id_cate = c.pk_id_cate
    `;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      res.status(200).json({ message: "Las mascotas son: ", data: rows });
    } else {
      res.status(404).json({ message: "No hay mascotas registradas por el momento" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const getPetsActivos = async (req, res) => {
  try {
    let sql =
    `
      SELECT m.*, r.nombre_raza, c.nombre_cate 
      FROM mascotas m
      JOIN razas r ON m.fk_raza_mas = r.pk_id_raza
      JOIN categorias c ON r.fk_id_cate = c.pk_id_cate
      WHERE estado_mas = 'activo'
    `;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      res.status(200).json({ message: "Las mascotas son: ", data: rows });
    } else {
      res.status(404).json({ message: "No hay mascotas registradas por el momento" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const getPetsEspera = async (req, res) => {
  try {
    let sql =
    `
      SELECT m.*, r.nombre_raza, c.nombre_cate 
      FROM mascotas m
      JOIN razas r ON m.fk_raza_mas = r.pk_id_raza
      JOIN categorias c ON r.fk_id_cate = c.pk_id_cate
      WHERE estado_mas = 'espera'
    `;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      res.status(200).json({ message: "Las mascotas son: ", data: rows });
    } else {
      res.status(404).json({ message: "No hay mascotas por adoptar por el momento" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const getPet = async (req, res) => {
  const id = req.params.id;
  try {
    let sql = 
    `
      SELECT m.*, r.nombre_raza, c.nombre_cate, u.nombre_user, u.email_user
      FROM mascotas m
      JOIN razas r ON m.fk_raza_mas = r.pk_id_raza
      JOIN categorias c ON r.fk_id_cate = c.pk_id_cate
      JOIN usuarios u ON m.fk_adoptante = u.pk_id_user
      WHERE m.pk_id_mas = '${id}';
    `;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      res.status(200).json({ message: "La mascota es: ", data: rows });
    } else {
      res.status(404).json({ message: "No se encontro la mascota con el ID proporcionado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const createPet = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const { nombre_mas, edad_mas, tamano_mas, peso_mas, descripcion_mas, vacunacion_mas, esterilizacion_castracion_mas, enfermedades_mas, tratamientos_mas, energia_mas, compatibilidad_mas, habitos_mas, necesidades_mas, lugar_rescate_mas, condiciones_estado_mas, tiempo_en_refugio_mas, genero_mas, estado_mas, fk_raza_mas } = req.body;
        const imagen_pet = req.file ? req.file.originalname : "";
        let sql = `INSERT INTO mascotas (nombre_mas, edad_mas, tamano_mas, peso_mas, descripcion_mas, vacunacion_mas, esterilizacion_castracion_mas, enfermedades_mas, tratamientos_mas, energia_mas, compatibilidad_mas, habitos_mas, necesidades_mas, lugar_rescate_mas, condiciones_estado_mas, tiempo_en_refugio_mas, genero_mas, estado_mas, fk_raza_mas, imagen_pet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [ nombre_mas, edad_mas, tamano_mas, peso_mas, descripcion_mas, vacunacion_mas, esterilizacion_castracion_mas, enfermedades_mas, tratamientos_mas, energia_mas, compatibilidad_mas, habitos_mas, necesidades_mas, lugar_rescate_mas, condiciones_estado_mas, tiempo_en_refugio_mas, genero_mas, estado_mas, fk_raza_mas, imagen_pet];
        const [result] = await pool.query(sql, values);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Mascota registrada exitosamente" });
        } else {
            res.status(404).json({ message: "No se pudo registrar la mascota" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error });
    }
};

export const updatePet = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { nombre_mas, edad_mas, tamano_mas, peso_mas, descripcion_mas, vacunacion_mas, esterilizacion_castracion_mas, enfermedades_mas, tratamientos_mas, energia_mas, compatibilidad_mas, habitos_mas, necesidades_mas, lugar_rescate_mas, condiciones_estado_mas, tiempo_en_refugio_mas, genero_mas, estado_mas, fk_raza_mas } = req.body;

    let sql = `UPDATE mascotas SET 
      nombre_mas = ?, 
      edad_mas = ?, 
      tamano_mas = ?, 
      peso_mas = ?, 
      descripcion_mas = ?, 
      vacunacion_mas = ?, 
      esterilizacion_castracion_mas = ?, 
      enfermedades_mas = ?, 
      tratamientos_mas = ?, 
      energia_mas = ?, 
      compatibilidad_mas = ?, 
      habitos_mas = ?, 
      necesidades_mas = ?, 
      lugar_rescate_mas = ?, 
      condiciones_estado_mas = ?, 
      tiempo_en_refugio_mas = ?, 
      genero_mas = ?, 
      estado_mas = ?, 
      fk_raza_mas = ? 
    WHERE pk_id_mas = ?`;

    const values = [ nombre_mas, edad_mas, tamano_mas, peso_mas, descripcion_mas, vacunacion_mas, esterilizacion_castracion_mas, enfermedades_mas, tratamientos_mas, energia_mas, compatibilidad_mas, habitos_mas, necesidades_mas, lugar_rescate_mas, condiciones_estado_mas, tiempo_en_refugio_mas, genero_mas, estado_mas, fk_raza_mas, id ];

    const [result] = await pool.query(sql, values);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Mascota actualizada exitosamente" });
    } else {
      res.status(404).json({ message: "No se pudo actualizar la mascota" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error });
  }
};

export const desactivarMascota = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE mascotas SET estado_mas = 2 WHERE pk_id_mas = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Mascota desactivada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna mascota con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const activarMascota = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE mascotas SET estado_mas = 1 WHERE pk_id_mas = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Mascota activada exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna mascota con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const esperaMascota = async (req, res) => {
  const id = req.params.id;
  const {adoptanteId} = req.body

  try {
    const [result] = await pool.query(`UPDATE mascotas SET estado_mas = 3, fk_adoptante = ? WHERE pk_id_mas = ?`, [adoptanteId, id]);
    
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Mascota en espera exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna mascota con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const deleteAdopt = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE mascotas SET estado_mas = 1, fk_adoptante = NULL WHERE pk_id_mas = ?`, [id]);
    
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Se ha eliminado la adopción exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ninguna adopción con el ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const deleteMascota = async (req, res) => {
  try {
    const id = req.params.id;
    let sql = `DELETE FROM mascotas WHERE pk_id_mas = '${id}'`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Mascota eliminada con exito" });
    } else {
      res.status(404).json({ message: "Error con el ID al eliminar la mascota" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};