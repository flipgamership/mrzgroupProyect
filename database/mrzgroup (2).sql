SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `mrzgroup` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mrzgroup`;

DROP TABLE IF EXISTS `historial`;
CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `awbID` int(11) NOT NULL,
  `estatusHistorial` varchar(500) NOT NULL,
  `fecha` varchar(500) NOT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `imagenes`;
CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `idHistorial` int(11) NOT NULL,
  `statusHistorial` varchar(500) NOT NULL,
  `imagen` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `objetos`;
CREATE TABLE `objetos` (
  `id` int(11) NOT NULL,
  `awb` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL,
  `name` varchar(500) NOT NULL,
  `cliente` varchar(500) NOT NULL,
  `fecha` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `objetos` (`id`, `awb`, `status`, `name`, `cliente`, `fecha`) VALUES
(1, 'HAF1926312Ag', 'envio', 'paqueteria express', 'mercanciaSas', '2022-05-19');

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `porcentaje` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `status` (`id`, `name`, `descripcion`, `porcentaje`) VALUES
(4, 'envio', 'el envio ', '25');

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

INSERT INTO `usuarios` (`id`, `nombre`, `password`, `correo`, `warrant`, `telefono`, `role`, `pin`) VALUES
(1, 'dev juan felipe correa', '$2a$08$dW0cqp5CZZ3QqRBuSqWJcuwXaxmMRvJKAqei8Zs3XQmwt1ezwB5wu', 'thefelipegamer7@gmail.com', '1001724660', '3003044512', 'SuperAdmin', '');


ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `awbID` (`awbID`);

ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idHistorial` (`idHistorial`);

ALTER TABLE `objetos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `objetos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`awbID`) REFERENCES `objetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`id`) REFERENCES `historial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
