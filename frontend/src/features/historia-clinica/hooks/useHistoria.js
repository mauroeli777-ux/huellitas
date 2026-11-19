import { useCallback, useMemo } from 'react';
import { obtenerHistoria } from '../../../api/mascota.api';
import { ordenarConsultasCronologicamente } from '../../../utils/ordenarConsultasCronologicamente';
import { useCargaDatos } from '../../../utils/useCargaDatos';

export function useHistoria(idMascota) {
  const cargar = useCallback(() => obtenerHistoria(idMascota), [idMascota]);
  const { datos, cargando, error, noEncontrado, reintentar } = useCargaDatos(cargar);

  const consultas = useMemo(
    () => (datos ? ordenarConsultasCronologicamente(datos.consultas) : []),
    [datos]
  );

  return {
    mascota: datos?.mascota ?? null,
    observaciones: datos?.observaciones ?? '',
    consultas,
    cargando,
    error,
    noEncontrado,
    reintentar,
  };
}
