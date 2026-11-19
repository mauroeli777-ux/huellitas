import {
  usuarios,
  veterinarios,
  servicios,
  mascotas,
  citas,
  historias,
  consultas,
  categorias,
  productos,
} from './datosPrueba';

const LATENCIA_MS = 450;
const SIMULAR_ERROR = import.meta.env.VITE_SIMULAR_ERROR === 'true';

// Las citas nuevas viven solo en memoria: se pierden al recargar la página
const citasEnMemoria = [...citas];

// Misma forma que el error de axios, para que el frontend no distinga entre mock y API real
function crearError(estado, mensaje) {
  return { response: { status: estado, data: { mensaje } } };
}

function responder(obtenerValor) {
  return new Promise((resolver, rechazar) => {
    setTimeout(() => {
      if (SIMULAR_ERROR) {
        rechazar(crearError(500, 'Error simulado del servidor de prueba.'));
        return;
      }
      resolver(structuredClone(obtenerValor()));
    }, LATENCIA_MS);
  });
}

function rechazarConError(estado, mensaje) {
  return new Promise((_, rechazar) => {
    setTimeout(() => rechazar(crearError(estado, mensaje)), LATENCIA_MS);
  });
}

export function iniciarSesion(correo, contrasena) {
  const usuario = usuarios.find((u) => u.correo === correo.trim().toLowerCase());
  // Los datos de prueba no verifican la contraseña real: eso lo hará el backend
  if (!usuario || contrasena.length < 6) {
    return rechazarConError(401, 'Correo o contraseña incorrectos.');
  }
  return responder(() => ({ token: `token-prueba-${usuario.idUsuario}`, usuario }));
}

export function listarCitas() {
  return responder(() =>
    [...citasEnMemoria].sort((a, b) => a.fechaHora.localeCompare(b.fechaHora))
  );
}

export function listarServicios() {
  return responder(() => servicios);
}

export function listarVeterinarios() {
  return responder(() => veterinarios);
}

export function listarMascotas() {
  return responder(() => mascotas);
}

export function crearCita({ idMascota, idServicio, idUsuarioVet, fechaHora }) {
  const mascota = mascotas.find((m) => m.idMascota === idMascota);
  const servicio = servicios.find((s) => s.idServicio === idServicio);
  const veterinario = veterinarios.find((v) => v.idUsuario === idUsuarioVet);
  if (!mascota || !servicio || !veterinario) {
    return rechazarConError(400, 'Los datos de la cita no son válidos.');
  }

  const fechaNormalizada = `${fechaHora.slice(0, 16)}:00`;
  // Igual que la restricción UNIQUE uq_cita_vet_horario de la base de datos (RN-03)
  const horarioOcupado = citasEnMemoria.some(
    (c) => c.idUsuarioVet === idUsuarioVet && c.fechaHora === fechaNormalizada
  );
  if (horarioOcupado) {
    return rechazarConError(
      409,
      'El veterinario ya tiene una cita en ese horario. Elige otra hora.'
    );
  }

  const citaNueva = {
    idCita: Math.max(...citasEnMemoria.map((c) => c.idCita)) + 1,
    idMascota,
    mascota: mascota.nombre,
    idServicio,
    servicio: servicio.nombreServicio,
    idUsuarioVet,
    veterinario: veterinario.nombres,
    fechaHora: fechaNormalizada,
    estado: 'agendada',
  };
  citasEnMemoria.push(citaNueva);
  return responder(() => citaNueva);
}

export function obtenerHistoria(idMascota) {
  const mascota = mascotas.find((m) => m.idMascota === Number(idMascota));
  if (!mascota) {
    return rechazarConError(404, 'No existe una mascota con ese identificador.');
  }
  const historia = historias.find((h) => h.idMascota === mascota.idMascota);
  return responder(() => ({
    mascota,
    observaciones: historia.observaciones,
    consultas: consultas
      .filter((c) => c.idHistoria === historia.idHistoria)
      .map((c) => ({
        ...c,
        fechaHora: citasEnMemoria.find((cita) => cita.idCita === c.idCita)?.fechaHora ?? null,
      })),
  }));
}

export function listarCategorias() {
  return responder(() => categorias);
}

export function listarProductos() {
  return responder(() => productos);
}
