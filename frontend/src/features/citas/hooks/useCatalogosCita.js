import { listarServicios, listarVeterinarios } from '../../../api/cita.api';
import { listarMascotas } from '../../../api/mascota.api';
import { useCargaDatos } from '../../../utils/useCargaDatos';

// Definida fuera del hook para que su identidad sea estable entre renderizados
function cargarCatalogos() {
  return Promise.all([listarMascotas(), listarServicios(), listarVeterinarios()]).then(
    ([mascotas, servicios, veterinarios]) => ({ mascotas, servicios, veterinarios })
  );
}

export function useCatalogosCita() {
  const { datos, cargando, error, reintentar } = useCargaDatos(cargarCatalogos);
  return {
    mascotas: datos?.mascotas ?? [],
    servicios: datos?.servicios ?? [],
    veterinarios: datos?.veterinarios ?? [],
    cargando,
    error,
    reintentar,
  };
}
