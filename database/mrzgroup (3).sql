-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-07-2022 a las 16:47:11
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

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `correo` varchar(500) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `telefono` varchar(500) NOT NULL,
  `warrant` varchar(500) NOT NULL,
  `role` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `correo`, `password`, `telefono`, `warrant`, `role`) VALUES
(1, 'Avianca', 'thefelipegamer7@gmail.com', '$2a$08$dW0cqp5CZZ3QqRBuSqWJcuwXaxmMRvJKAqei8Zs3XQmwt1ezwB5wu', '3003044512', '', 'cliente'),
(2, 'Viva', 'flipgamer1313@gmail.com', '$2a$08$p3j13ylUb2S2DjAL8egE5.1u9McBK0ldlDMZLlIzI3JxFFhpSfljS', '3003044512', '1001724660', 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

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
(3, 3, 'carga ingresada', '2022-07-06', 'La carga ingresó a nuestras instalaciones en perfecto estado '),
(4, 3, 'selectividad fisica', '2022-07-06', 'Se realizó la selectividad física sin problemas'),
(5, 4, 'En Servicio de embalaje', '2022-07-07', 'Se comenzó el servicio de embalaje ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

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
(5, 3, 'carga ingresada', '5e79ad22-4e9d-4b03-b1df-8ca3fc9f1d58.jpg'),
(6, 3, 'carga ingresada', '82f24a48-bd3f-4e24-916b-e7571de7e1d6.jpg'),
(7, 4, 'En Servicio de embalaje', '239a16a1-b614-4284-9743-9b4461007744.jpg'),
(8, 4, 'En Servicio de embalaje', '1df1c9b9-0374-49e0-9f10-b7b31e6b7bf1.jpg'),
(9, 4, 'carga ingresada', 'd11f80b8-1e63-4b5d-a642-35709b6ad16f.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetos`
--

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
(3, 'HAF1926312Ag', 'selectividad fisica', 'mercancía Avianca', 'Avianca', '2022-07-04'),
(4, 'JAISUHDIAB1827', 'En Servicio de embalaje', 'empaquetado viiva', 'Viva', '2022-07-05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `servicio` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

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
(6, 'completo', 'Se completó el servicio', '100'),
(9, 'carga en aeropuerto', 'se recoge la carga y se carga en el aeropuerto', '25'),
(10, 'carga ingresada', 'La carga se ingresó a nuestras instalaciones', '30'),
(11, 'selectividad fisica', ' Se seleccionó físicamente', '40'),
(12, 'selectividad documental', 'selectividad documental', '40'),
(13, 'selectividad pendiente', 'la selectividad esta pendiente', '40'),
(14, 'entrega de guia', 'Se le  realiza la entrega de la guía', '80'),
(15, 'facturado', 'Se facturó el servicio', '90'),
(16, 'notificacion cliente', 'se notifica al cliente de su importación', '25'),
(17, 'liberación y/o pre-inspección', 'Se libera la mercancía o carga y también se puede realizar la pre- inspección ', '50'),
(18, 'notificación embalaje', 'Se notifica al cliente de que su producto se embaló', '25'),
(19, 'En Servicio de embalaje', 'Se está realizando el embalaje', '80');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statusservice`
--

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `objetos`
--
ALTER TABLE `objetos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
