const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarInicioSesion({ correo, contrasena }) {
  const errores = {};

  if (!correo.trim()) {
    errores.correo = 'Escribe tu correo electrónico.';
  } else if (!PATRON_CORREO.test(correo.trim())) {
    errores.correo = 'El correo no es válido. Debe tener la forma nombre@dominio.com.';
  }

  if (!contrasena) errores.contrasena = 'Escribe tu contraseña.';

  return errores;
}
