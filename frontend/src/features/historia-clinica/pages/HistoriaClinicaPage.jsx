import { Link, useParams } from 'react-router-dom';
import EstadoDatos from '../../../components/ui/EstadoDatos';
import Insignia from '../../../components/ui/Insignia';
import Tabla from '../../../components/ui/Tabla';
import NoEncontrado from '../../../components/layout/NoEncontrado';
import { formatearFechaHora } from '../../../utils/formatearFecha';
import { useHistoria } from '../hooks/useHistoria';

const COLUMNAS = [
  {
    clave: 'fechaHora',
    titulo: 'Fecha',
    renderizar: (consulta) =>
      consulta.fechaHora ? (
        formatearFechaHora(consulta.fechaHora)
      ) : (
        <Insignia texto="Urgencia sin cita previa" tono="aviso" />
      ),
  },
  { clave: 'diagnostico', titulo: 'Diagnóstico' },
  { clave: 'tratamiento', titulo: 'Tratamiento' },
];

export default function HistoriaClinicaPage() {
  const { idMascota } = useParams();
  const historia = useHistoria(idMascota);

  if (historia.noEncontrado) {
    return (
      <NoEncontrado
        titulo="Mascota no encontrada"
        mensaje="No existe una mascota con ese identificador. Vuelve a la lista y elige una."
      />
    );
  }

  return (
    <section className="pagina">
      <Link to="/historia-clinica">Volver a la lista de mascotas</Link>
      <EstadoDatos
        cargando={historia.cargando}
        error={historia.error}
        onReintentar={historia.reintentar}
      >
        <h1>Historia clínica de {historia.mascota?.nombre}</h1>
        <p className="pagina__descripcion">Observaciones: {historia.observaciones}</p>
        <EstadoDatos
          vacio={historia.consultas.length === 0}
          mensajeVacio="Esta mascota aún no tiene consultas registradas."
        >
          <Tabla
            descripcion="Consultas en orden cronológico"
            columnas={COLUMNAS}
            filas={historia.consultas}
            obtenerClave={(consulta) => consulta.idConsulta}
          />
        </EstadoDatos>
      </EstadoDatos>
    </section>
  );
}
