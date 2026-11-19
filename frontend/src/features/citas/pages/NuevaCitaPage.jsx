import EstadoDatos from '../../../components/ui/EstadoDatos';
import { useAdvertirSalida } from '../../../utils/useAdvertirSalida';
import CitaForm from '../components/CitaForm';
import { useCatalogosCita } from '../hooks/useCatalogosCita';
import { useFormularioCita } from '../hooks/useFormularioCita';

export default function NuevaCitaPage() {
  const catalogos = useCatalogosCita();
  const formulario = useFormularioCita();
  useAdvertirSalida(formulario.hayCambios);

  return (
    <section className="pagina">
      <h1>Agendar cita</h1>
      <p className="pagina__descripcion">Los campos marcados con * son obligatorios.</p>

      <EstadoDatos
        cargando={catalogos.cargando}
        error={catalogos.error}
        onReintentar={catalogos.reintentar}
      >
        <CitaForm
          mascotas={catalogos.mascotas}
          servicios={catalogos.servicios}
          veterinarios={catalogos.veterinarios}
          valores={formulario.valores}
          errores={formulario.errores}
          errorServidor={formulario.errorServidor}
          citaCreada={formulario.citaCreada}
          enviando={formulario.enviando}
          onCambiarCampo={formulario.cambiarCampo}
          onEnviar={formulario.enviar}
        />
      </EstadoDatos>
    </section>
  );
}
