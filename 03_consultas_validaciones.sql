-- =====================================================================
-- PROYECTO: Huellitas (version reducida)
-- ARCHIVO: 03_consultas_validaciones_simple.sql
-- CONTENIDO: consultas basicas, un UPDATE, y un ejemplo de cada politica
--            de borrado (RESTRICT, CASCADE, SET NULL). Se ejecuta con
--            `mysql --force` para que un rechazo esperado no detenga
--            el resto del script.
-- =====================================================================

USE huellitas;

-- #######################################################################
-- A. CONSULTAS
-- #######################################################################

SELECT '--- A1. Agenda: citas con mascota, servicio y veterinario ---' AS caso;
SELECT c.fecha_hora, m.nombre AS mascota, s.nombre_servicio,
       u.nombres AS veterinario, c.estado
FROM cita c
JOIN mascota m       ON m.id_mascota = c.id_mascota
JOIN servicio s      ON s.id_servicio = c.id_servicio
JOIN veterinario v   ON v.id_usuario = c.id_usuario_vet
JOIN usuario u       ON u.id_usuario = v.id_usuario
ORDER BY c.fecha_hora;

SELECT '--- A2. Catalogo de productos con su categoria ---' AS caso;
SELECT p.nombre_producto, cat.nombre_categoria, p.precio, p.stock
FROM producto p
JOIN categoria cat ON cat.id_categoria = p.id_categoria
ORDER BY p.precio;

SELECT '--- A3. Total comprado por cliente ---' AS caso;
SELECT u.nombres, COUNT(pe.id_pedido) AS num_pedidos, SUM(pe.total) AS total_comprado
FROM usuario u
JOIN pedido pe ON pe.id_usuario = u.id_usuario
GROUP BY u.id_usuario;

-- #######################################################################
-- B. ACTUALIZACION
-- #######################################################################

SELECT '--- B1. Confirmar la cita 2 ---' AS caso;
UPDATE cita SET estado = 'atendida' WHERE id_cita = 2;
SELECT id_cita, estado FROM cita WHERE id_cita = 2;

-- #######################################################################
-- C. ELIMINACIONES: una por cada politica de borrado
-- #######################################################################

SELECT '--- C1. RESTRICT: borrar una especie con mascotas asociadas (debe fallar) ---' AS caso;
DELETE FROM especie WHERE nombre_especie = 'Perro';

SELECT '--- C2. CASCADE: borrar el pedido 1 y ver que su detalle desaparece solo ---' AS caso;
SELECT * FROM detalle_pedido WHERE id_pedido = 1;
-- (para no perder los datos de prueba, se muestra el efecto sobre un pedido nuevo)
INSERT INTO pedido (id_usuario, estado, total) VALUES (4, 'carrito', 15000.00);
SET @id_pedido_temp = LAST_INSERT_ID();
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (@id_pedido_temp, 2, 1, 15000.00);
DELETE FROM pedido WHERE id_pedido = @id_pedido_temp;
SELECT * FROM detalle_pedido WHERE id_pedido = @id_pedido_temp; -- vacio: se borro en cascada

SELECT '--- C3. SET NULL: borrar la cita 1, que tiene una consulta ligada ---' AS caso;
SELECT id_consulta, id_cita FROM consulta WHERE id_consulta = 1;
DELETE FROM cita WHERE id_cita = 1;
SELECT id_consulta, id_cita FROM consulta WHERE id_consulta = 1; -- id_cita quedo en NULL

-- #######################################################################
-- D. VALIDACIONES (deben ser rechazadas por el motor)
-- #######################################################################

SELECT '--- D1. Correo duplicado (debe fallar) ---' AS caso;
INSERT INTO usuario (id_rol, nombres, correo, contrasena_hash)
VALUES (3, 'Duplicado', 'ana.rios@example.com', SHA2('x',256));

SELECT '--- D2. Doble reserva del mismo horario para el mismo veterinario (debe fallar) ---' AS caso;
INSERT INTO cita (id_mascota, id_servicio, id_usuario_vet, fecha_hora)
VALUES (2, 1, 2, '2026-09-30 08:30:00');

SELECT '--- D3. Sexo fuera del dominio M/H (debe fallar) ---' AS caso;
INSERT INTO mascota (id_usuario, id_especie, nombre, sexo) VALUES (3, 1, 'Prueba', 'X');

SELECT '--- FIN de las pruebas ---' AS caso;
