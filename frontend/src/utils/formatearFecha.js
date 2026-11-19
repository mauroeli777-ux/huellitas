const formateadorFechaHora = new Intl.DateTimeFormat('es-CO', {
  dateStyle: 'medium',
  timeStyle: 'short',
});
const formateadorFecha = new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' });

export function formatearFechaHora(fechaIso) {
  return formateadorFechaHora.format(new Date(fechaIso));
}

export function formatearFecha(fechaIso) {
  // Sin la hora, "2022-03-14" se interpreta en UTC y en Colombia se vería un día antes
  return formateadorFecha.format(new Date(`${fechaIso}T00:00:00`));
}
