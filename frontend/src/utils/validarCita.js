export function validarCita(valores, ahora = new Date()) {
  const errores = {};

  if (!valores.idMascota) errores.idMascota = 'Selecciona la mascota que será atendida.';
  if (!valores.idServicio) errores.idServicio = 'Selecciona el servicio que necesita.';
  if (!valores.idUsuarioVet) errores.idUsuarioVet = 'Selecciona el veterinario que la atenderá.';

  if (!valores.fechaHora) {
    errores.fechaHora = 'Indica la fecha y la hora de la cita.';
  } else {
    const fecha = new Date(valores.fechaHora);
    if (Number.isNaN(fecha.getTime())) {
      errores.fechaHora = 'La fecha y la hora no tienen un formato válido.';
    } else if (fecha <= ahora) {
      errores.fechaHora =
        'La cita debe ser en el futuro. Elige una fecha y hora posteriores a la actual.';
    }
  }

  return errores;
}
