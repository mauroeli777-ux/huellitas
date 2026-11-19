import { useMemo, useState } from 'react';
import { listarCitas } from '../../../api/cita.api';
import { useCargaDatos } from '../../../utils/useCargaDatos';

export function useCitas() {
  const { datos, cargando, error, reintentar } = useCargaDatos(listarCitas);
  const [filtroEstado, setFiltroEstado] = useState('');

  const citas = useMemo(
    () => (datos ?? []).filter((cita) => !filtroEstado || cita.estado === filtroEstado),
    [datos, filtroEstado]
  );

  return { citas, cargando, error, reintentar, filtroEstado, setFiltroEstado };
}
