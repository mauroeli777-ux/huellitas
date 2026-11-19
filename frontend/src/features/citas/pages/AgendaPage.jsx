import { useNavigate } from 'react-router-dom';
import Boton from '../../../components/ui/Boton';
import CampoSelect from '../../../components/ui/CampoSelect';
import EstadoDatos from '../../../components/ui/EstadoDatos';
import Insignia from '../../../components/ui/Insignia';
import Tabla from '../../../components/ui/Tabla';
import { ETIQUETA_ESTADO_CITA, TONO_ESTADO_CITA } from '../../../utils/constantes';
import { formatearFechaHora } from '../../../utils/formatearFecha';
import { useCitas } from '../hooks/useCitas';

const OPCIONES_ESTADO = Object.entries(ETIQUETA_ESTADO_CITA).map(([valor, etiqueta]) => ({
  valor,
  etiqueta,
}));

const COLUMNAS = [
  {
    clave: 'fechaHora',
    titulo: 'Fecha y hora',
    renderizar: (cita) => formatearFechaHora(cita.fechaHora),
  },
  { clave: 'mascota', titulo: 'Mascota' },
  { clave: 'servicio', titulo: 'Servicio' },
  { clave: 'veterinario', titulo: 'Veterinario' },
  {
    clave: 'estado',
    titulo: 'Estado',
    renderizar: (cita) => (
      <Insignia texto={ETIQUETA_ESTADO_CITA[cita.estado]} tono={TONO_ESTADO_CITA[cita.estado]} />
    ),
  },
];

export default function AgendaPage() {
  const { citas, cargando, error, reintentar, filtroEstado, setFiltroEstado } = useCitas();
  const navegar = useNavigate();

  return (
    <section className="pagina">
      <h1>Agenda de citas</h1>
      <div className="barra-herramientas">
        <CampoSelect
          id="filtroEstado"
          etiqueta="Estado"
          valor={filtroEstado}
          onCambio={setFiltroEstado}
          opciones={OPCIONES_ESTADO}
          textoVacio="Todos"
        />
        <Boton onClick={() => navegar('/citas/nueva')}>Agendar cita</Boton>
      </div>

      <EstadoDatos
        cargando={cargando}
        error={error}
        vacio={citas.length === 0}
        mensajeVacio="No hay citas con el estado elegido."
        onReintentar={reintentar}
      >
        <Tabla
          descripcion="Citas de la clínica"
          columnas={COLUMNAS}
          filas={citas}
          obtenerClave={(cita) => cita.idCita}
        />
      </EstadoDatos>
    </section>
  );
}
