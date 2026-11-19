import { useMemo } from 'react';
import { listarCitas } from '../../../api/cita.api';
import { ID_SERVICIO_VACUNACION } from '../../../utils/constantes';
import { obtenerProximaCita } from '../../../utils/obtenerProximaCita';
import { useCargaDatos } from '../../../utils/useCargaDatos';

export function usePanel() {
  const { datos, cargando, error, reintentar } = useCargaDatos(listarCitas);

  const { proximaCita, proximaVacunacion } = useMemo(() => {
    const citas = datos ?? [];
    const ahora = new Date();
    return {
      proximaCita: obtenerProximaCita(citas, ahora),
      proximaVacunacion: obtenerProximaCita(citas, ahora, ID_SERVICIO_VACUNACION),
    };
  }, [datos]);

  return { proximaCita, proximaVacunacion, cargando, error, reintentar };
}
