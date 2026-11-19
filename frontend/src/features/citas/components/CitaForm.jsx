import { Link } from 'react-router-dom';
import Alerta from '../../../components/ui/Alerta';
import Boton from '../../../components/ui/Boton';
import CampoSelect from '../../../components/ui/CampoSelect';
import CampoTexto from '../../../components/ui/CampoTexto';
import { formatearFechaHora } from '../../../utils/formatearFecha';

export default function CitaForm({
  mascotas,
  servicios,
  veterinarios,
  valores,
  errores,
  errorServidor,
  citaCreada,
  enviando,
  onCambiarCampo,
  onEnviar,
}) {
  const opcionesMascotas = mascotas.map((m) => ({
    valor: m.idMascota,
    etiqueta: `${m.nombre} (${m.especie})`,
  }));
  const opcionesServicios = servicios.map((s) => ({
    valor: s.idServicio,
    etiqueta: s.nombreServicio,
  }));
  const opcionesVeterinarios = veterinarios.map((v) => ({
    valor: v.idUsuario,
    etiqueta: v.nombres,
  }));

  return (
    <form className="formulario" onSubmit={onEnviar} noValidate>
      {citaCreada && (
        <Alerta tipo="exito">
          La cita de {citaCreada.mascota} quedó agendada para{' '}
          {formatearFechaHora(citaCreada.fechaHora)}. <Link to="/citas">Ver la agenda</Link>
        </Alerta>
      )}
      {errorServidor && <Alerta tipo="error">{errorServidor}</Alerta>}

      <CampoSelect
        id="idMascota"
        etiqueta="Mascota"
        valor={valores.idMascota}
        onCambio={(valor) => onCambiarCampo('idMascota', valor)}
        opciones={opcionesMascotas}
        error={errores.idMascota}
        obligatorio
      />
      <CampoSelect
        id="idServicio"
        etiqueta="Servicio"
        valor={valores.idServicio}
        onCambio={(valor) => onCambiarCampo('idServicio', valor)}
        opciones={opcionesServicios}
        error={errores.idServicio}
        obligatorio
      />
      <CampoSelect
        id="idUsuarioVet"
        etiqueta="Veterinario"
        valor={valores.idUsuarioVet}
        onCambio={(valor) => onCambiarCampo('idUsuarioVet', valor)}
        opciones={opcionesVeterinarios}
        error={errores.idUsuarioVet}
        obligatorio
      />
      <CampoTexto
        id="fechaHora"
        etiqueta="Fecha y hora"
        tipo="datetime-local"
        valor={valores.fechaHora}
        onCambio={(valor) => onCambiarCampo('fechaHora', valor)}
        error={errores.fechaHora}
        obligatorio
      />

      <Boton tipo="submit" cargando={enviando}>
        Agendar cita
      </Boton>
    </form>
  );
}
