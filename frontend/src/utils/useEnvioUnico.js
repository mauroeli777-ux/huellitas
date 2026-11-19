import { useCallback, useRef, useState } from 'react';

// Ejecuta una acción de envío evitando que se dispare dos veces (doble clic) mientras está en curso
export function useEnvioUnico() {
  const [enviando, setEnviando] = useState(false);
  const enCurso = useRef(false);

  const ejecutar = useCallback(async (accion) => {
    if (enCurso.current) return;
    enCurso.current = true;
    setEnviando(true);
    try {
      await accion();
    } finally {
      enCurso.current = false;
      setEnviando(false);
    }
  }, []);

  return { enviando, ejecutar };
}
