-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-08-2024 a las 05:40:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `adoptspets`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `pk_id_cate` int(11) NOT NULL,
  `nombre_cate` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`pk_id_cate`, `nombre_cate`) VALUES
(1, 'Perro'),
(2, 'Gato');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `pk_id_depar` int(11) NOT NULL,
  `nombre_depar` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`pk_id_depar`, `nombre_depar`) VALUES
(1, 'Huila'),
(2, 'Cauca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `pk_id_mas` int(11) NOT NULL,
  `nombre_mas` varchar(200) NOT NULL,
  `edad_mas` int(11) NOT NULL,
  `tamano_mas` int(11) NOT NULL,
  `peso_mas` int(11) NOT NULL,
  `descripcion_mas` varchar(200) NOT NULL,
  `vacunacion_mas` enum('Si','No') NOT NULL,
  `esterilizacion_castracion_mas` enum('Si','No') NOT NULL,
  `enfermedades_mas` enum('Si','No') NOT NULL,
  `tratamientos_mas` enum('Si','No') NOT NULL,
  `energia_mas` int(11) NOT NULL,
  `compatibilidad_mas` enum('Si','No') NOT NULL,
  `habitos_mas` varchar(200) NOT NULL,
  `necesidades_mas` varchar(200) NOT NULL,
  `lugar_rescate_mas` varchar(200) NOT NULL,
  `condiciones_estado_mas` enum('Mal','Regular','Bien','Muy Bien') NOT NULL,
  `tiempo_en_refugio_mas` int(11) NOT NULL,
  `genero_mas` enum('Macho','Hembra') NOT NULL,
  `estado_mas` enum('activo','inactivo','espera') NOT NULL,
  `fk_raza_mas` int(11) NOT NULL,
  `imagen_pet` varchar(200) DEFAULT NULL,
  `fk_adoptante` int(11) DEFAULT NULL,
  `fecha_adop_mas` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`pk_id_mas`, `nombre_mas`, `edad_mas`, `tamano_mas`, `peso_mas`, `descripcion_mas`, `vacunacion_mas`, `esterilizacion_castracion_mas`, `enfermedades_mas`, `tratamientos_mas`, `energia_mas`, `compatibilidad_mas`, `habitos_mas`, `necesidades_mas`, `lugar_rescate_mas`, `condiciones_estado_mas`, `tiempo_en_refugio_mas`, `genero_mas`, `estado_mas`, `fk_raza_mas`, `imagen_pet`, `fk_adoptante`, `fecha_adop_mas`) VALUES
(30, 'Furia', 25, 80, 55, 'Animal de color blanco saludable ', 'Si', 'Si', 'No', 'No', 7, 'Si', 'Correr ', 'Ninguna', 'Yamboro', 'Muy Bien', 5, 'Macho', 'activo', 1, 'IMG_20240801_030041.jpg', NULL, NULL),
(31, 'Metralleta', 8, 60, 45, 'Es saludable ', 'Si', 'Si', 'No', 'No', 8, 'Si', 'Salir a correr', 'Ninguna', 'Yamboro', 'Muy Bien', 3, 'Macho', 'activo', 1, 'IMG_20240801_030100.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

CREATE TABLE `municipios` (
  `pk_id_muni` int(11) NOT NULL,
  `nombre_muni` varchar(200) NOT NULL,
  `fk_id_depar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`pk_id_muni`, `nombre_muni`, `fk_id_depar`) VALUES
(1, 'Pitalito', 1),
(2, 'Isnos', 1),
(3, 'Rosas', 2),
(4, 'Florencia', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razas`
--

CREATE TABLE `razas` (
  `pk_id_raza` int(11) NOT NULL,
  `nombre_raza` varchar(200) NOT NULL,
  `fk_id_cate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `razas`
--

INSERT INTO `razas` (`pk_id_raza`, `nombre_raza`, `fk_id_cate`) VALUES
(1, 'Bulldog ', 1),
(2, 'Doberman', 1),
(3, 'Pastor Alemán', 1),
(4, 'Persa', 2),
(5, 'Siamés', 2),
(6, 'Maine Coon', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `pk_id_user` int(11) NOT NULL,
  `nombre_user` varchar(200) NOT NULL,
  `telefono_user` bigint(20) NOT NULL,
  `email_user` varchar(200) NOT NULL,
  `password_user` varchar(200) NOT NULL,
  `ubicacion_user` enum('Barrio','Vereda') NOT NULL,
  `tipo_vivienda_user` enum('Casa','Apartamento','Finca') NOT NULL,
  `espacio_dispo_user` enum('Jardin','Patio','Terraza') NOT NULL,
  `canti_mas_hogar_user` int(11) NOT NULL,
  `horas_en_casa_user` int(11) NOT NULL,
  `experiencia_user` enum('Si','No') NOT NULL,
  `disponibilidad_user` int(11) NOT NULL,
  `economia_user` enum('Mala','Regular','Buena','Muy Buena') NOT NULL,
  `estado_user` enum('activo','inactivo') NOT NULL,
  `rol_user` enum('admin','visitante') NOT NULL,
  `fk_id_municipio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`pk_id_user`, `nombre_user`, `telefono_user`, `email_user`, `password_user`, `ubicacion_user`, `tipo_vivienda_user`, `espacio_dispo_user`, `canti_mas_hogar_user`, `horas_en_casa_user`, `experiencia_user`, `disponibilidad_user`, `economia_user`, `estado_user`, `rol_user`, `fk_id_municipio`) VALUES
(1234312, 'cami', 43121, 'cami@gmail.com', '$2b$12$uowOEniXLdiYw7mPK.nYBOPRCpDtBKTsgk6rqOxyc2f52Vt6vXf8u', 'Barrio', 'Casa', 'Patio', 3, 15, 'Si', 4, 'Muy Buena', 'activo', 'visitante', 1),
(1084251889, 'Juan Camilo Realpe', 2147483647, 'juan@gmail.com', '$2b$12$lqihg049Mv3kz1Mpy9viG.08vnpjuohASlbGAq3o0sPoTegVdFt1m', 'Barrio', 'Casa', 'Jardin', 1, 15, 'Si', 4, 'Buena', 'activo', 'admin', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`pk_id_cate`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`pk_id_depar`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`pk_id_mas`),
  ADD KEY `tener` (`fk_raza_mas`) USING BTREE,
  ADD KEY `adoptar` (`fk_adoptante`) USING BTREE;

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`pk_id_muni`),
  ADD KEY `poseer` (`fk_id_depar`) USING BTREE;

--
-- Indices de la tabla `razas`
--
ALTER TABLE `razas`
  ADD PRIMARY KEY (`pk_id_raza`),
  ADD KEY `llevar` (`fk_id_cate`) USING BTREE;

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`pk_id_user`) USING BTREE,
  ADD KEY `pertenecer` (`fk_id_municipio`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `pk_id_cate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `pk_id_depar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `pk_id_mas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `pk_id_muni` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `razas`
--
ALTER TABLE `razas`
  MODIFY `pk_id_raza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `pk_id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1084251890;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`fk_raza_mas`) REFERENCES `razas` (`pk_id_raza`),
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`fk_adoptante`) REFERENCES `usuarios` (`pk_id_user`);

--
-- Filtros para la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD CONSTRAINT `municipios_ibfk_1` FOREIGN KEY (`fk_id_depar`) REFERENCES `departamentos` (`pk_id_depar`);

--
-- Filtros para la tabla `razas`
--
ALTER TABLE `razas`
  ADD CONSTRAINT `razas_ibfk_1` FOREIGN KEY (`fk_id_cate`) REFERENCES `categorias` (`pk_id_cate`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`fk_id_municipio`) REFERENCES `municipios` (`pk_id_muni`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
