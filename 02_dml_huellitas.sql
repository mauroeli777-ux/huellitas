-- =====================================================================
-- PROYECTO: Huellitas (version reducida)
-- ARCHIVO: 02_dml_huellitas_simple.sql
-- CONTENIDO: datos minimos de prueba para las 14 tablas del DDL reducido.
-- =====================================================================

USE huellitas;

-- Catalogos base
INSERT INTO rol (nombre_rol) VALUES ('administrador'), ('veterinario'), ('cliente');
INSERT INTO especie (nombre_especie) VALUES ('Perro'), ('Gato');
INSERT INTO servicio (nombre_servicio, precio) VALUES
    ('Consulta general', 55000.00),
    ('Vacunacion', 45000.00);
INSERT INTO categoria (nombre_categoria) VALUES ('Alimento'), ('Accesorios');

-- Usuarios
INSERT INTO usuario (id_rol, nombres, correo, contrasena_hash, telefono) VALUES
    (1, 'Mauricio Elizalde', 'admin@huellitas.co',   SHA2('Admin#2026',256), '3001234567'),
    (2, 'Julian Ramirez',    'jramirez@huellitas.co', SHA2('VetJ#2026',256), '3009876543'),
    (3, 'Ana Rios',          'ana.rios@example.com',  SHA2('Cliente1#',256), '3101112233'),
    (3, 'Luis Pena',         'luis.pena@example.com', SHA2('Cliente2#',256), '3102223344');

INSERT INTO veterinario (id_usuario, especialidad) VALUES (2, 'Medicina general');

-- Mascotas e historias clinicas
INSERT INTO mascota (id_usuario, id_especie, nombre, raza, fecha_nacimiento, sexo) VALUES
    (3, 1, 'Luna',  'Labrador', '2022-03-14', 'H'),
    (4, 1, 'Rocky', 'Criollo',  '2021-11-20', 'M');

INSERT INTO historia_clinica (id_mascota, observaciones) VALUES
    (1, 'Paciente tranquilo, buena condicion corporal'),
    (2, 'Requiere seguimiento dermatologico');

-- Citas y consultas
INSERT INTO cita (id_mascota, id_servicio, id_usuario_vet, fecha_hora, estado) VALUES
    (1, 1, 2, '2026-09-15 09:00:00', 'atendida'),
    (2, 2, 2, '2026-09-30 08:30:00', 'agendada');

INSERT INTO consulta (id_historia, id_cita, diagnostico, tratamiento) VALUES
    (1, 1, 'Paciente sano, sin hallazgos', 'Continuar con dieta actual');

-- Productos, pedido, detalle y pago
INSERT INTO producto (id_categoria, nombre_producto, precio, stock) VALUES
    (1, 'Concentrado Dogy 5kg', 78000.00, 40),
    (2, 'Collar ajustable M',   15000.00, 60);

INSERT INTO pedido (id_usuario, estado, total) VALUES (3, 'confirmado', 93000.00);

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
    (1, 1, 1, 78000.00),
    (1, 2, 1, 15000.00);

INSERT INTO pago (id_pedido, metodo, valor, estado_pago) VALUES
    (1, 'tarjeta_debito', 93000.00, 'aprobado');

-- =====================================================================
-- Fin del DML reducido.
-- =====================================================================
