-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2022 a las 21:35:58
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mrzgroup`
--
CREATE DATABASE IF NOT EXISTS `mrzgroup` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mrzgroup`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `correo` varchar(500) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `telefono` varchar(500) NOT NULL,
  `role` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `correo`, `password`, `telefono`, `role`) VALUES
(1, 'divicions', 'thefelipegamer7@gmail.com', '$2a$08$dW0cqp5CZZ3QqRBuSqWJcuwXaxmMRvJKAqei8Zs3XQmwt1ezwB5wu', '3003044512', 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

DROP TABLE IF EXISTS `historial`;
CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `awbID` int(11) NOT NULL,
  `estatusHistorial` varchar(500) NOT NULL,
  `fecha` varchar(500) NOT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id`, `awbID`, `estatusHistorial`, `fecha`, `observaciones`) VALUES
(1, 1, 'envio', '2022-05-19', 'popayan'),
(2, 1, 'entrega', '2022-05-19', 'se entrego');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `idHistorial` int(11) NOT NULL,
  `statusHistorial` varchar(500) NOT NULL,
  `imagen` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `idHistorial`, `statusHistorial`, `imagen`) VALUES
(2, 1, 'envio', 'ed742179-64da-4b17-9522-d692d34b77ce.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetos`
--

DROP TABLE IF EXISTS `objetos`;
CREATE TABLE `objetos` (
  `id` int(11) NOT NULL,
  `awb` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL,
  `name` varchar(500) NOT NULL,
  `cliente` varchar(500) NOT NULL,
  `fecha` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `objetos`
--

INSERT INTO `objetos` (`id`, `awb`, `status`, `name`, `cliente`, `fecha`) VALUES
(1, 'HAF1926312Ag', 'entrega', 'paqueteria express', 'mercanciaSas', '2022-05-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `servicio` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `porcentaje` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `name`, `descripcion`, `porcentaje`) VALUES
(4, 'envio', 'el envio ', '25'),
(5, 'entrega', 'Se entregó el paquete al domicilio solicitado', '100');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statusservice`
--

DROP TABLE IF EXISTS `statusservice`;
CREATE TABLE `statusservice` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `porcentaje` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `correo` varchar(500) NOT NULL,
  `warrant` varchar(500) NOT NULL,
  `telefono` varchar(500) NOT NULL,
  `role` varchar(500) NOT NULL,
  `pin` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `password`, `correo`, `warrant`, `telefono`, `role`, `pin`) VALUES
(1, 'dev juan felipe correa', '$2a$08$dW0cqp5CZZ3QqRBuSqWJcuwXaxmMRvJKAqei8Zs3XQmwt1ezwB5wu', 'thefelipegamer7@gmail.com', '1001724660', '3003044512', 'SuperAdmin', ''),
(4, 'david', '$2a$08$E12YqcG.diriMS1HfNSuu.zETxIs9.IMT97l7Q3svLjDE2c2Q9oI2', 'flipgamer1313@gmail.com', '1001724660', '3003044512', 'bloqueado', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `awbID` (`awbID`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idHistorial` (`idHistorial`);

--
-- Indices de la tabla `objetos`
--
ALTER TABLE `objetos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `objetos`
--
ALTER TABLE `objetos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`awbID`) REFERENCES `objetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`idHistorial`) REFERENCES `objetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
