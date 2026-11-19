import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

const MENSAJE_SALIDA = 'Tienes cambios sin guardar. ¿Quieres salir de todos modos?';

// Pide confirmación antes de salir de la pantalla (navegación interna o cierre de la pestaña)
export function useAdvertirSalida(hayCambios) {
  const bloqueador = useBlocker(hayCambios);

  useEffect(() => {
    if (bloqueador.state !== 'blocked') return;
    if (window.confirm(MENSAJE_SALIDA)) {
      bloqueador.proceed();
    } else {
      bloqueador.reset();
    }
  }, [bloqueador]);

  useEffect(() => {
    if (!hayCambios) return undefined;
    const avisar = (evento) => evento.preventDefault();
    window.addEventListener('beforeunload', avisar);
    return () => window.removeEventListener('beforeunload', avisar);
  }, [hayCambios]);
}
