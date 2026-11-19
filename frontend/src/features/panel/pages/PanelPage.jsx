import { useNavigate } from 'react-router-dom';
import Boton from '../../../components/ui/Boton';
import EstadoDatos from '../../../components/ui/EstadoDatos';
import TarjetaCita from '../components/TarjetaCita';
import { usePanel } from '../hooks/usePanel';

export default function PanelPage() {
  const { proximaCita, proximaVacunacion, cargando, error, reintentar } = usePanel();
  const navegar = useNavigate();

  return (
    <section className="pagina">
      <h1>Panel principal</h1>
      <p className="pagina__descripcion">Lo que viene en la agenda de la clínica.</p>

      <EstadoDatos cargando={cargando} error={error} onReintentar={reintentar}>
        <div className="rejilla-tarjetas">
          <TarjetaCita
            titulo="Próxima cita"
            cita={proximaCita}
            mensajeSinCita="No hay citas agendadas por ahora."
          />
          <TarjetaCita
            titulo="Próxima vacunación"
            cita={proximaVacunacion}
            mensajeSinCita="No hay vacunaciones agendadas por ahora."
          />
        </div>
        <div className="acciones">
          <Boton onClick={() => navegar('/citas/nueva')}>Agendar una cita</Boton>
          <Boton variante="secundario" onClick={() => navegar('/citas')}>
            Ver la agenda completa
          </Boton>
        </div>
      </EstadoDatos>
    </section>
  );
}
