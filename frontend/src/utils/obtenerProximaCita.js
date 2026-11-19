import { ESTADO_CITA_AGENDADA } from './constantes';

// Devuelve la cita agendada más cercana en el futuro, o null si no hay ninguna
export function obtenerProximaCita(citas, ahora = new Date(), idServicio = null) {
  const futuras = citas
    .filter(
      (cita) =>
        cita.estado === ESTADO_CITA_AGENDADA &&
        new Date(cita.fechaHora) >= ahora &&
        (idServicio === null || cita.idServicio === idServicio)
    )
    .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
  return futuras[0] ?? null;
}
