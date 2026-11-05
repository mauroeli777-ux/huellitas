-- =====================================================================
-- PROYECTO: Huellitas (version reducida)
-- ARCHIVO: 01_ddl_huellitas_simple.sql
-- CONTENIDO: 14 tablas en vez de 21. Se elimino raza, token_recuperacion,
--            estado_cita, vacuna, aplicacion_vacuna, estado_pedido y
--            metodo_pago como tablas propias: ahora son ENUM o columnas
--            simples. Tambien se quitaron los triggers de fecha.
-- =====================================================================

DROP DATABASE IF EXISTS huellitas;
CREATE DATABASE huellitas CHARACTER SET utf8mb4;
USE huellitas;

-- ---------------------------------------------------------------------
-- MODULO 1: usuarios y mascotas
-- ---------------------------------------------------------------------
CREATE TABLE rol (
    id_rol      INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol  VARCHAR(30) NOT NULL UNIQUE
) ENGINE = InnoDB;

CREATE TABLE usuario (
    id_usuario       INT AUTO_INCREMENT PRIMARY KEY,
    id_rol           INT NOT NULL,
    nombres          VARCHAR(80) NOT NULL,
    correo           VARCHAR(100) NOT NULL UNIQUE,
    contrasena_hash  VARCHAR(255) NOT NULL,
    telefono         VARCHAR(15),
    CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
) ENGINE = InnoDB;

CREATE TABLE veterinario (
    id_usuario    INT PRIMARY KEY,
    especialidad  VARCHAR(60),
    CONSTRAINT fk_veterinario_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
        ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE especie (
    id_especie      INT AUTO_INCREMENT PRIMARY KEY,
    nombre_especie  VARCHAR(40) NOT NULL UNIQUE
) ENGINE = InnoDB;

CREATE TABLE mascota (
    id_mascota        INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario        INT NOT NULL,
    id_especie        INT NOT NULL,
    nombre            VARCHAR(40) NOT NULL,
    raza              VARCHAR(60),
    fecha_nacimiento  DATE,
    sexo              CHAR(1) NOT NULL,
    CONSTRAINT ck_mascota_sexo CHECK (sexo IN ('M','H')),
    CONSTRAINT fk_mascota_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_mascota_especie FOREIGN KEY (id_especie) REFERENCES especie(id_especie)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- MODULO 2: citas e historia clinica
-- ---------------------------------------------------------------------
CREATE TABLE servicio (
    id_servicio      INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio  VARCHAR(60) NOT NULL,
    precio           DECIMAL(10,2) NOT NULL,
    CONSTRAINT ck_servicio_precio CHECK (precio >= 0)
) ENGINE = InnoDB;

CREATE TABLE cita (
    id_cita         INT AUTO_INCREMENT PRIMARY KEY,
    id_mascota      INT NOT NULL,
    id_servicio     INT NOT NULL,
    id_usuario_vet  INT NOT NULL,
    fecha_hora      DATETIME NOT NULL,
    estado          ENUM('agendada','atendida','cancelada') NOT NULL DEFAULT 'agendada',
    -- un veterinario no puede tener dos citas a la misma hora
    CONSTRAINT uq_cita_vet_horario UNIQUE (id_usuario_vet, fecha_hora),
    CONSTRAINT fk_cita_mascota FOREIGN KEY (id_mascota) REFERENCES mascota(id_mascota),
    CONSTRAINT fk_cita_servicio FOREIGN KEY (id_servicio) REFERENCES servicio(id_servicio),
    CONSTRAINT fk_cita_vet FOREIGN KEY (id_usuario_vet) REFERENCES veterinario(id_usuario)
) ENGINE = InnoDB;

CREATE TABLE historia_clinica (
    id_historia    INT AUTO_INCREMENT PRIMARY KEY,
    id_mascota     INT NOT NULL UNIQUE,
    observaciones  VARCHAR(300),
    CONSTRAINT fk_historia_mascota FOREIGN KEY (id_mascota) REFERENCES mascota(id_mascota)
) ENGINE = InnoDB;

CREATE TABLE consulta (
    id_consulta  INT AUTO_INCREMENT PRIMARY KEY,
    id_historia  INT NOT NULL,
    -- admite nulo: una urgencia puede generar consulta sin cita previa
    id_cita      INT UNIQUE,
    diagnostico  VARCHAR(300),
    tratamiento  VARCHAR(300),
    CONSTRAINT fk_consulta_historia FOREIGN KEY (id_historia) REFERENCES historia_clinica(id_historia),
    -- si se borra la cita, la consulta sobrevive con id_cita en NULL
    CONSTRAINT fk_consulta_cita FOREIGN KEY (id_cita) REFERENCES cita(id_cita)
        ON DELETE SET NULL
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- MODULO 3: tienda y pedidos
-- ---------------------------------------------------------------------
CREATE TABLE categoria (
    id_categoria      INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria  VARCHAR(50) NOT NULL UNIQUE
) ENGINE = InnoDB;

CREATE TABLE producto (
    id_producto      INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria     INT NOT NULL,
    nombre_producto  VARCHAR(80) NOT NULL,
    precio           DECIMAL(10,2) NOT NULL,
    stock            INT NOT NULL DEFAULT 0,
    CONSTRAINT ck_producto_precio CHECK (precio >= 0),
    CONSTRAINT ck_producto_stock CHECK (stock >= 0),
    CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
) ENGINE = InnoDB;

CREATE TABLE pedido (
    id_pedido     INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario    INT NOT NULL,
    fecha_pedido  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado        ENUM('carrito','confirmado','enviado','entregado','cancelado') NOT NULL DEFAULT 'carrito',
    total         DECIMAL(12,2) NOT NULL DEFAULT 0,
    CONSTRAINT ck_pedido_total CHECK (total >= 0),
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
) ENGINE = InnoDB;

CREATE TABLE detalle_pedido (
    id_pedido        INT NOT NULL,
    id_producto      INT NOT NULL,
    cantidad         SMALLINT NOT NULL,
    precio_unitario  DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_pedido, id_producto),
    CONSTRAINT ck_detalle_cantidad CHECK (cantidad > 0),
    -- borrar el pedido borra sus lineas de detalle
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
        ON DELETE CASCADE,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
) ENGINE = InnoDB;

CREATE TABLE pago (
    id_pago      INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido    INT NOT NULL UNIQUE,
    metodo       ENUM('PSE','tarjeta_debito','tarjeta_credito') NOT NULL,
    valor        DECIMAL(12,2) NOT NULL,
    estado_pago  ENUM('aprobado','rechazado','pendiente') NOT NULL DEFAULT 'pendiente',
    CONSTRAINT ck_pago_valor CHECK (valor > 0),
    CONSTRAINT fk_pago_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
) ENGINE = InnoDB;

-- =====================================================================
-- Fin del DDL reducido: 14 tablas.
-- =====================================================================
