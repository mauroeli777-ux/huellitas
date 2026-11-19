import Insignia from '../../../components/ui/Insignia';
import { ETIQUETA_ESTADO_CITA, TONO_ESTADO_CITA } from '../../../utils/constantes';
import { formatearFechaHora } from '../../../utils/formatearFecha';

export default function TarjetaCita({ titulo, cita, mensajeSinCita }) {
  return (
    <article className="tarjeta">
      <h2 className="tarjeta__titulo">{titulo}</h2>
      {cita ? (
        <>
          <p className="tarjeta__destacado">{formatearFechaHora(cita.fechaHora)}</p>
          <dl className="tarjeta__datos">
            <dt>Mascota</dt>
            <dd>{cita.mascota}</dd>
            <dt>Servicio</dt>
            <dd>{cita.servicio}</dd>
            <dt>Veterinario</dt>
            <dd>{cita.veterinario}</dd>
            <dt>Estado</dt>
            <dd>
              <Insignia
                texto={ETIQUETA_ESTADO_CITA[cita.estado]}
                tono={TONO_ESTADO_CITA[cita.estado]}
              />
            </dd>
          </dl>
        </>
      ) : (
        <p>{mensajeSinCita}</p>
      )}
    </article>
  );
}
