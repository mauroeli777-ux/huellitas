import { listarMascotas } from '../../../api/mascota.api';
import { useCargaDatos } from '../../../utils/useCargaDatos';

export function useMascotas() {
  const { datos, cargando, error, reintentar } = useCargaDatos(listarMascotas);
  return { mascotas: datos ?? [], cargando, error, reintentar };
}
