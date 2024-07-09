import { check } from "express-validator";

export const validationUpdateUser = [
  check("nombre_user", "El nombre es obligatorio, max 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 50 }),
  check("email_user", "El email es obligatorio, max 50 caracteres")
    .isEmail()
    .isLength({ max: 50 }),
  check("password_user", "La contraseña es obligatoria, min 6 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 50, min: 6 }),
  check("telefono_user", "El teléfono es obligatorio, max 10 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 10 })
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("ubicacion_user", "La ubicación es obligatoria")
    .not()
    .isEmpty()
    .custom((value) => {
      const ubicaciones = ["Barrio", "Vereda"];
      if (!ubicaciones.includes(value)) {
        throw new Error("Error, ingrese una ubicación permitida");
      }
      return true;
    }),
  check("tipo_vivienda_user", "El tipo de vivienda es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const tiposVivienda = ["Casa", "Apartamento", "Finca"];
      if (!tiposVivienda.includes(value)) {
        throw new Error("Error, ingrese un tipo de vivienda permitido");
      }
      return true;
    }),
  check("espacio_dispo_user", "El espacio disponible es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const espacios = ["Jardin", "Patio", "Terraza"];
      if (!espacios.includes(value)) {
        throw new Error("Error, ingrese un espacio permitido");
      }
      return true;
    }),
  check("canti_mas_hogar_user", "La cantidad de mascotas en el hogar es obligatoria")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("horas_en_casa_user", "Las horas en casa son obligatorias")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("experiencia_user", "La experiencia es obligatoria")
    .not()
    .isEmpty()
    .custom((value) => {
      const experiencias = ["Si", "No"];
      if (!experiencias.includes(value)) {
        throw new Error("Error, ingrese una experiencia permitida");
      }
      return true;
    }),
  check("disponibilidad_user", "La disponibilidad es obligatoria")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("economia_user", "La economía es obligatoria")
    .not()
    .isEmpty()
    .custom((value) => {
      const economias = ["Mala", "Regular", "Buena", "Muy Buena"];
      if (!economias.includes(value)) {
        throw new Error("Error, ingrese una economía permitida");
      }
      return true;
    }),
  check("fk_id_municipio", "El municipio es obligatorio y debe ser un número")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("rol_user", "El rol es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const roles = ["admin", "visitante"];
      if (!roles.includes(value)) {
        throw new Error("Error, ingrese un rol permitido");
      }
      return true;
    }),
  check("estado_user", "El estado es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const estados = ["activo", "inactivo"];
      if (!estados.includes(value)) {
        throw new Error("Error, ingrese un estado permitido");
      }
      return true;
    }),
];

export const validationRegisterUser = [
  check("pk_id_user", "La identificación es obligatoria, max 11 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 11 })
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("nombre_user", "El nombre es obligatorio, max 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 50 }),
  check("email_user", "El email es obligatorio, max 50 caracteres")
    .isEmail()
    .isLength({ max: 50 }),
  check("password_user", "La contraseña es obligatoria, min 6 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 50, min: 6 }),
  check("telefono_user", "El teléfono es obligatorio, max 10 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 10 })
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("ubicacion_user", "La ubicación es obligatoria")
    .not()
    .isEmpty()
    .custom((value) => {
      const ubicaciones = ["Barrio", "Vereda"];
      if (!ubicaciones.includes(value)) {
        throw new Error("Error, ingrese una ubicación permitida");
      }
      return true;
    }),
  check("tipo_vivienda_user", "El tipo de vivienda es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const tiposVivienda = ["Casa", "Apartamento", "Finca"];
      if (!tiposVivienda.includes(value)) {
        throw new Error("Error, ingrese un tipo de vivienda permitido");
      }
      return true;
    }),
  check("espacio_dispo_user", "El espacio disponible es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const espacios = ["Jardin", "Patio", "Terraza"];
      if (!espacios.includes(value)) {
        throw new Error("Error, ingrese un espacio permitido");
      }
      return true;
    }),
  check("canti_mas_hogar_user", "La cantidad de mascotas en el hogar es obligatoria")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("horas_en_casa_user", "Las horas en casa son obligatorias")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("experiencia_user", "La experiencia es obligatoria")
    .not()
    .isEmpty()
    .custom((value) => {
      const experiencias = ["Si", "No"];
      if (!experiencias.includes(value)) {
        throw new Error("Error, ingrese una experiencia permitida");
      }
      return true;
    }),
  check("disponibilidad_user", "La disponibilidad es obligatoria")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("economia_user", "La economía es obligatoria")
    .not()
    .isEmpty()
    .custom((value) => {
      const economias = ["Mala", "Regular", "Buena", "Muy Buena"];
      if (!economias.includes(value)) {
        throw new Error("Error, ingrese una economía permitida");
      }
      return true;
    }),
  check("fk_id_municipio", "El municipio es obligatorio y debe ser un número")
    .not()
    .isEmpty()
    .isNumeric({ no_symbols: true })
    .toInt(),
  check("rol_user", "El rol es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const roles = ["admin", "visitante"];
      if (!roles.includes(value)) {
        throw new Error("Error, ingrese un rol permitido");
      }
      return true;
    }),
  check("estado_user", "El estado es obligatorio")
    .not()
    .isEmpty()
    .custom((value) => {
      const estados = ["activo", "inactivo"];
      if (!estados.includes(value)) {
        throw new Error("Error, ingrese un estado permitido");
      }
      return true;
    }),
];
