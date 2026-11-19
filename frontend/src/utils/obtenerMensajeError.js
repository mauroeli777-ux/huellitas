const MENSAJES_POR_ESTADO = {
  400: 'Revisa los datos ingresados e intenta de nuevo.',
  401: 'Tu sesión no es válida. Inicia sesión de nuevo.',
  403: 'No tienes permiso para realizar esta acción.',
  404: 'No encontramos lo que buscabas.',
};

export function obtenerMensajeError(error) {
  const estado = error?.response?.status;
  if (!error?.response) {
    return 'No hay conexión con el servidor. Revisa tu internet e intenta de nuevo.';
  }
  // 409 (horario ocupado, correo repetido) trae un mensaje claro desde el backend
  if (estado === 409 || estado === 401) {
    return error.response.data?.mensaje ?? MENSAJES_POR_ESTADO[estado];
  }
  return (
    MENSAJES_POR_ESTADO[estado] ??
    'No pudimos completar la operación. Intenta de nuevo en un momento.'
  );
}
