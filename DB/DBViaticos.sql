-- MySQL Script generated by MySQL Workbench
-- Thu May 13 10:21:22 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Viaticos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Viaticos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Viaticos` DEFAULT CHARACTER SET utf8 ;
USE `Viaticos` ;

-- -----------------------------------------------------
-- Table `Viaticos`.`Perfiles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Viaticos`.`Perfiles` ;

CREATE TABLE IF NOT EXISTS `Viaticos`.`Perfiles` (
  `idPerfiles` INT NOT NULL,
  `DescripcionPerfil` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPerfiles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Viaticos`.`Areas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Viaticos`.`Areas` ;

CREATE TABLE IF NOT EXISTS `Viaticos`.`Areas` (
  `idAreas` INT NOT NULL,
  `DescripcionArea` VARCHAR(45) NOT NULL,
  `PresupuestoTransporte` DECIMAL(11,4) NULL,
  `PresupuestoViatico` DECIMAL(11,4) NULL,
  PRIMARY KEY (`idAreas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Viaticos`.`Empleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Viaticos`.`Empleado` ;

CREATE TABLE IF NOT EXISTS `Viaticos`.`Empleado` (
  `idEmpleado` INT NOT NULL,
  `NombreEmp` VARCHAR(40) NOT NULL,
  `ApellidoEmp` VARCHAR(40) NULL,
  `TelefonoEmp` VARCHAR(10) NULL,
  `CorreoEmp` VARCHAR(45) NOT NULL,
  `ContraseñaEmp` VARCHAR(8) NOT NULL,
  `Perfiles_idPerfiles` INT NOT NULL,
  `Areas_idAreas` INT NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  INDEX `fk_Empleado_Perfiles_idx` (`Perfiles_idPerfiles` ASC) VISIBLE,
  INDEX `fk_Empleado_Areas1_idx` (`Areas_idAreas` ASC) VISIBLE,
  CONSTRAINT `fk_Empleado_Perfiles`
    FOREIGN KEY (`Perfiles_idPerfiles`)
    REFERENCES `Viaticos`.`Perfiles` (`idPerfiles`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Empleado_Areas1`
    FOREIGN KEY (`Areas_idAreas`)
    REFERENCES `Viaticos`.`Areas` (`idAreas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Viaticos`.`Comision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Viaticos`.`Comision` ;

CREATE TABLE IF NOT EXISTS `Viaticos`.`Comision` (
  `idComision` INT NOT NULL,
  `TipoComision` VARCHAR(45) NOT NULL,
  `ComisionAprobada` TINYINT NULL,
  `FechaInicio` DATE NULL,
  `FechaFin` DATE NULL,
  `Factura_idFactura` INT NOT NULL,
  PRIMARY KEY (`idComision`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Viaticos`.`Factura`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Viaticos`.`Factura` ;

CREATE TABLE IF NOT EXISTS `Viaticos`.`Factura` (
  `idFactura` INT NOT NULL,
  `DescripcionFactura` VARCHAR(45) NULL,
  `FechaEmision` VARCHAR(45) NULL,
  `MontoFactura` DECIMAL(11,4) NOT NULL,
  `Comision_idComision` INT,
  PRIMARY KEY (`idFactura`), 
  INDEX `fk_Factura_Comision1_idx` (`Comision_idComision` ASC) VISIBLE,
  CONSTRAINT `fk_Factura_Comision1`
    FOREIGN KEY (`Comision_idComision`)
    REFERENCES `Viaticos`.`Comision` (`idComision`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    )
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `Viaticos`.`Empleado_has_Comision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Viaticos`.`Empleado_has_Comision` ;

CREATE TABLE IF NOT EXISTS `Viaticos`.`Empleado_has_Comision` (
  `Empleado_idEmpleado` INT NOT NULL,
  `Comision_idComision` INT NOT NULL,
  INDEX `fk_Empleado_has_Comision_Comision1_idx` (`Comision_idComision` ASC) VISIBLE,
  INDEX `fk_Empleado_has_Comision_Empleado1_idx` (`Empleado_idEmpleado` ASC) VISIBLE,
  CONSTRAINT `fk_Empleado_has_Comision_Empleado1`
    FOREIGN KEY (`Empleado_idEmpleado`)
    REFERENCES `Viaticos`.`Empleado` (`idEmpleado`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Empleado_has_Comision_Comision1`
    FOREIGN KEY (`Comision_idComision`)
    REFERENCES `Viaticos`.`Comision` (`idComision`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

DROP PROCEDURE IF EXISTS `proc_insert_areas`;
DELIMITER ;;
CREATE PROCEDURE `proc_insert_areas` (
pidAreas int, 
pDescripcionArea varchar(45),
pPresupuestoTransporte decimal(11,4), 
pPresupuestoViatico decimal(11,4)
)
BEGIN
INSERT INTO Areas (idAreas, DescripcionArea, PresupuestoTransporte, PresupuestoViatico) VALUES (pidAreas, pDescripcionArea, pPresupuestoTransporte, pPresupuestoViatico);
END ;;
DELIMITER ; 

DROP PROCEDURE IF EXISTS `proc_insert_factura`;
DELIMITER ;;
CREATE PROCEDURE `proc_insert_factura` (
pidFactura int, 
pDescripcionFactura varchar(45), 
pFechaEmision varchar(45) ,
pMontoFactura decimal(11,4)
)
BEGIN
INSERT INTO Factura (idFactura, DescripcionFactura, FechaEmision, MontoFactura) VALUES (pidFactura, pDescripcionFactura, pFechaEmision, pMontoFactura);
END ;;
DELIMITER ; 


DROP procedure IF EXISTS `viaticos`.`proc_insert_comision`;
;

DELIMITER $$
USE `viaticos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_insert_comision`(
pidComision int, 
pTipoComision varchar(45), 
pComisionAprobadaJefeArea tinyint, 
pFechaInicio date, 
pFechaFin date, 
pFactura_idFactura int, 
pComisionAprobadaFinanzas TINYINT, 
pLugarComision VARCHAR(54), 
pMontoAsignado decimal(11,4)
)
BEGIN
INSERT INTO Comision (idComision, TipoComision, ComisionAprobadaJefeArea, FechaInicio, FechaFin, Factura_idFactura, ComisionAprobadaFinanzas, LugarComision, MontoAsignado) 
VALUES (pidComision, pTipoComision, pComisionAprobadaJefeArea, pFechaInicio, pFechaFin, pFactura_idFactura, pComisionAprobadaFinanzas, pLugarComision, pMontoAsignado);
END$$
DELIMITER ;
;


DROP PROCEDURE IF EXISTS `proc_insert_perfiles`;
DELIMITER ;;
CREATE PROCEDURE `proc_insert_perfiles` (
pidPerfiles int, 
pDescripcionPerfil varchar(45)
)
BEGIN
INSERT INTO Perfiles (idPerfiles, DescripcionPerfil) VALUES (pidPerfiles, pDescripcionPerfil);
END ;;
DELIMITER ; 


DROP PROCEDURE IF EXISTS `proc_insert_empleado_has_comision`;
DELIMITER ;;
CREATE PROCEDURE `proc_insert_empleado_has_comision` (
pEmpleado_idEmpleado int, 
pComision_idComision int
)
BEGIN
INSERT INTO Empleado_has_Comision (Empleado_idEmpleado, Comision_idComision) VALUES (pEmpleado_idEmpleado, pComision_idComision);
END ;;
DELIMITER ; 


DROP PROCEDURE IF EXISTS `proc_insert_empleado`;
DELIMITER ;;
CREATE PROCEDURE `proc_insert_empleado` (
pidEmpleado int, 
pNombreEmp varchar(40),
pApellidoEmp varchar(40), 
pTelefonoEmp varchar(10),
pCorreoEmp varchar(45),
pContraseñaEmp varchar(8), 
pPerfiles_idPerfiles int,
pAreas_idAreas int
)
BEGIN
INSERT INTO Empleado (idEmpleado, NombreEmp, ApellidoEmp, TelefonoEmp, CorreoEmp, ContraseñaEmp, 
Perfiles_idPerfiles, Areas_idAreas) VALUES (pidEmpleado, pNombreEmp, pApellidoEmp, pTelefonoEmp, pCorreoEmp, 
pContraseñaEmp, pPerfiles_idPerfiles, pAreas_idAreas);
END ;;
DELIMITER ; 


DROP PROCEDURE IF EXISTS `proc_update_areas`;
DELIMITER ;;
CREATE PROCEDURE `proc_update_areas` (
pidAreas int, 
pDescripcionArea varchar(45),
pPresupuestoTransporte decimal(11,4), 
pPresupuestoViatico decimal(11,4)
)
BEGIN
UPDATE Areas SET idAreas = pidAreas, DescripcionArea = pDescripcionArea, PresupuestoTransporte = pPresupuestoTransporte, PresupuestoViatico = pPresupuestoViatico
WHERE idAreas = pidAreas;
END ;;
DELIMITER ; 


DROP PROCEDURE IF EXISTS `proc_update_factura`;
DELIMITER ;;
CREATE PROCEDURE `proc_update_factura` (
pidFactura int, 
pDescripcionFactura varchar(45), 
pFechaEmision varchar(45) ,
pMontoFactura decimal(11,4)
)
BEGIN
UPDATE Factura SET idFactura = pidFactura, DescripcionFactura = pDescripcionFactura, FechaEmision = pFechaEmision, MontoFactura = pMontoFactura
WHERE idFactura = pidFactura;
END ;;
DELIMITER ; 


DROP procedure IF EXISTS `viaticos`.`proc_update_comision`;
;
DELIMITER $$
USE `viaticos`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_update_comision`(
pidComision int, 
pTipoComision varchar(45), 
pComisionAprobadaJefeArea tinyint, 
pFechaInicio date, 
pFechaFin date, 
pFactura_idFactura int, 
pComisionAprobadaFinanzas TINYINT, 
pLugarComision VARCHAR(54), 
pMontoAsignado decimal(11,4)
)
BEGIN
UPDATE Comision SET idComision = pidComision, TipoComision = pTipoComision, ComisionAprobadaJefeArea = pComisionAprobadaJefeArea, FechaInicio = pFechaInicio, FechaFin = pFechaFin, Factura_idFactura = pFactura_idFactura, ComisionAprobadaFinanzas=pComisionAprobadaFinanzas, LugarComision=pLugarComision, MontoAsignado=pMontoAsignado
WHERE idComision = pidComision;
END$$
DELIMITER ;
;


DROP PROCEDURE IF EXISTS `proc_update_perfiles`;
DELIMITER ;;
CREATE PROCEDURE `proc_update_perfiles` (
pidPerfiles int, 
pDescripcionPerfil varchar(45)
)
BEGIN
UPDATE Perfiles SET DescripcionPerfil = pDescripcionPerfil
WHERE idPerfiles = pidPerfiles;
END ;;
DELIMITER ; 


DROP PROCEDURE IF EXISTS `proc_update_empleado_has_comision`;
DELIMITER ;;
CREATE PROCEDURE `proc_update_empleado_has_comision` (
pEmpleado_idEmpleado int, 
pComision_idComision int
)
BEGIN
UPDATE Empleado_has_Comision SET Empleado_idEmpleado = pEmpleado_idEmpleado, Comision_idComision = pComision_idComision 
WHERE Empleado_idEmpleado = pEmpleado_idEmpleado AND Comision_idComision = pComision_idComision;
END ;;
DELIMITER ; 

DROP PROCEDURE IF EXISTS `proc_update_empleado`;
DELIMITER ;;
CREATE PROCEDURE `proc_update_empleado` (
pidEmpleado int, 
pNombreEmp varchar(40),
pApellidoEmp varchar(40), 
pTelefonoEmp varchar(10),
pCorreoEmp varchar(45),
pContraseñaEmp varchar(8), 
pPerfiles_idPerfiles int,
pAreas_idAreas int
)
BEGIN
UPDATE Empleado SET idEmpleado = pidEmpleado, NombreEmp = pNombreEmp, ApellidoEmp = pApellidoEmp, TelefonoEmp = pTelefonoEmp, CorreoEmp = pCorreoEmp, ContraseñaEmp = pContraseñaEmp, 
Perfiles_idPerfiles = pPerfiles_idPerfiles, Areas_idAreas = pAreas_idAreas
WHERE idEmpleado = pidEmpleado;
END ;;
DELIMITER ; 


DROP PROCEDURE IF EXISTS `proc_delete_areas`;
DELIMITER ;;
CREATE PROCEDURE `proc_delete_areas` (
pidAreas int
)
BEGIN
DELETE FROM Areas 
WHERE idAreas = pidAreas;
END ;;
DELIMITER ; 


DROP PROCEDURE IF EXISTS `proc_delete_factura`;
DELIMITER ;;
CREATE PROCEDURE `proc_delete_factura` (
pidFactura int
)
BEGIN
DELETE FROM Factura 
WHERE idFactura = pidFactura;
END ;;
DELIMITER ; 

DROP PROCEDURE IF EXISTS `proc_delete_comision`;
DELIMITER ;;
CREATE PROCEDURE `proc_delete_comision` (
pidComision int
)
BEGIN
DELETE FROM Comision  
WHERE idComision = pidComision;
END ;;
DELIMITER ; 

DROP PROCEDURE IF EXISTS `proc_delete_perfiles`;
DELIMITER ;;
CREATE PROCEDURE `proc_delete_perfiles` (
pidPerfiles int
)
BEGIN
DELETE FROM Perfiles 
WHERE idPerfiles = pidPerfiles;
END ;;
DELIMITER ; 


DROP PROCEDURE IF EXISTS `proc_delete_empleado_has_comision`;
DELIMITER ;;
CREATE PROCEDURE `proc_delete_empleado_has_comision` (
pEmpleado_idEmpleado int, 
pComision_idComision int
)
BEGIN
DELETE FROM Empleado_has_Comision 
WHERE Empleado_idEmpleado = pEmpleado_idEmpleado AND Comision_idComision = pComision_idComision;
END ;;
DELIMITER ; 

DROP PROCEDURE IF EXISTS `proc_delete_empleado`;
DELIMITER ;;
CREATE PROCEDURE `proc_delete_empleado` (
pidEmpleado int
)
BEGIN
DELETE FROM Empleado
WHERE idEmpleado = pidEmpleado;
END ;;
DELIMITER ; 

ALTER TABLE `Viaticos`.`Comision` CHANGE COLUMN  `ComisionAprobada` `ComisionAprobadaJefeArea` TINYINT;
ALTER TABLE `Viaticos`.`Comision` ADD `ComisionAprobadaFinanzas` TINYINT;
ALTER TABLE `Viaticos`.`Comision` ADD `MontoAsignado` decimal(11,4);
ALTER TABLE `Viaticos`.`Comision` ADD `LugarComision` VARCHAR(54);

DROP PROCEDURE IF EXISTS `proc_select_gastos_empleado`; 
DELIMITER ;;
CREATE PROCEDURE `proc_select_gastos_empleado` (
pidEmpleado int
)
BEGIN
SELECT concat_ws(" ", Empleado.NombreEmp, Empleado.ApellidoEmp) AS Empleado, Comision.LugarComision, Comision.MontoAsignado, Factura.DescripcionFactura, Factura.MontoFactura
FROM Empleado
INNER JOIN Empleado_has_Comision ON Empleado.idEmpleado=Empleado_has_Comision.Empleado_idEmpleado
INNER JOIN Comision ON Comision.idComision=Empleado_has_Comision.Comision_idComision
INNER JOIN Factura ON Comision.idComision=Factura.idFactura
WHERE idEmpleado = pidEmpleado;
END ;;
DELIMITER ; 


DROP PROCEDURE IF EXISTS `proc_select_comisiones_empleado`; 
DELIMITER ;;
CREATE PROCEDURE `proc_select_comisiones_empleado` (
pidEmpleado int
)
BEGIN
SELECT concat_ws(" ", Empleado.NombreEmp, Empleado.ApellidoEmp) AS Empleado, Empleado_has_Comision.Comision_idComision, Comision.TipoComision, Comision.LugarComision
FROM Empleado
INNER JOIN Empleado_has_Comision ON Empleado.idEmpleado=Empleado_has_Comision.Empleado_idEmpleado
INNER JOIN Comision ON Comision.idComision=Empleado_has_Comision.Comision_idComision
WHERE idEmpleado = pidEmpleado;
END ;;
DELIMITER ; 