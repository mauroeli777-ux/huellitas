import { useCallback, useEffect, useState } from 'react';
import { obtenerMensajeError } from './obtenerMensajeError';

// Carga datos al montar y cada vez que cambia `cargar`. Maneja cargando, error y reintento.
// `cargar` debe ser estable (función de módulo o useCallback).
export function useCargaDatos(cargar) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let vigente = true;
    setDatos(null);
    setError(null);
    setCargando(true);

    cargar()
      .then((resultado) => {
        if (vigente) setDatos(resultado);
      })
      .catch((falla) => {
        if (vigente) setError(falla);
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [cargar, intento]);

  const reintentar = useCallback(() => setIntento((n) => n + 1), []);

  return {
    datos,
    cargando,
    error: error ? obtenerMensajeError(error) : null,
    noEncontrado: error?.response?.status === 404,
    reintentar,
  };
}
