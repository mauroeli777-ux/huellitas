export const ESTADO_CITA_AGENDADA = 'agendada';
export const ESTADO_CITA_ATENDIDA = 'atendida';
export const ESTADO_CITA_CANCELADA = 'cancelada';

export const ETIQUETA_ESTADO_CITA = {
  [ESTADO_CITA_AGENDADA]: 'Agendada',
  [ESTADO_CITA_ATENDIDA]: 'Atendida',
  [ESTADO_CITA_CANCELADA]: 'Cancelada',
};

export const TONO_ESTADO_CITA = {
  [ESTADO_CITA_AGENDADA]: 'aviso',
  [ESTADO_CITA_ATENDIDA]: 'exito',
  [ESTADO_CITA_CANCELADA]: 'neutro',
};

// En la base reducida la vacunación es un servicio más (ya no existen las tablas vacuna y aplicacion_vacuna)
export const ID_SERVICIO_VACUNACION = 2;
