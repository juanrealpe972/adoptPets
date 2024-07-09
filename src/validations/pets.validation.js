import { check } from "express-validator";

export const validationRegisterPet = [
  check( "nombre_mas", "El nombre es obligatorio y debe tener máximo 200 caracteres" )
    .not()
    .isEmpty()
    .isLength({ max: 200 }),
  check("edad_mas", "La edad es obligatoria y debe ser un número")
    .not()
    .isEmpty()
    .isInt(),
  check("tamano_mas", "El tamaño es obligatorio y debe ser un número")
    .not()
    .isEmpty()
    .isInt(),
  check("peso_mas", "El peso es obligatorio y debe ser un número")
    .not()
    .isEmpty()
    .isInt(),
  check("descripcion_mas", "La descripción debe tener máximo 200 caracteres")
    .optional()
    .isLength({ max: 200 }),
  check("vacunacion_mas", "La vacunación es obligatoria")
    .not()
    .isEmpty()
    .isIn(["Sí", "No"]),
  check( "esterilizacion_castracion_mas", "La esterilización/castración es obligatoria" )
    .not()
    .isEmpty()
    .isIn(["Sí", "No"]),
  check("enfermedades_mas", "Las enfermedades es obligatorio")
    .not()
    .isEmpty()
    .isIn(["Sí", "No"]),
  check("tratamientos_mas", "Los tratamientos es obligatorio")
    .not()
    .isEmpty()
    .isIn(["Sí", "No"]),
  check("energia_mas", "La energía es obligatoria y debe ser un número")
    .not()
    .isEmpty()
    .isInt(),
  check("compatibilidad_mas", "La compatibilidad es obligatoria")
    .not()
    .isEmpty()
    .isIn(["Sí", "No"]),
  check("habitos_mas", "Los hábitos deben tener máximo 200 caracteres")
    .optional()
    .isLength({ max: 200 }),
  check("necesidades_mas", "Las necesidades deben tener máximo 200 caracteres")
    .optional()
    .isLength({ max: 200 }),
  check( "lugar_rescate_mas", "El lugar de rescate es obligatorio y debe ser un número")
    .not()
    .isEmpty()
    .isInt(),
  check("condiciones_estado_mas", "Las condiciones del estado son obligatorias")
    .not()
    .isEmpty()
    .isIn(["Mal", "Regular", "Bien", "Muy Bien"]),
  check( "tiempo_en_refugio_mas", "El tiempo en refugio es obligatorio y debe ser un número")
    .not()
    .isEmpty()
    .isInt(),
  check("genero_mas", "El género es obligatorio")
    .not()
    .isEmpty()
    .isIn(["Macho", "Hembra"]),
  check("estado_mas", "El estado es obligatorio")
    .not()
    .isEmpty()
    .isIn(["activo", "inactivo", "espera"]),
  check("fk_raza_mas", "La raza es obligatoria y debe ser un número")
    .not()
    .isEmpty()
    .isInt(),
  check("imagen_pet", "La imagen de la mascota obligatoria")
    .not()
    .isEmpty()
];
