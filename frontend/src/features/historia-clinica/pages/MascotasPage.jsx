import { Link } from 'react-router-dom';
import EstadoDatos from '../../../components/ui/EstadoDatos';
import Tabla from '../../../components/ui/Tabla';
import { formatearFecha } from '../../../utils/formatearFecha';
import { useMascotas } from '../hooks/useMascotas';

const COLUMNAS = [
  { clave: 'nombre', titulo: 'Nombre' },
  { clave: 'especie', titulo: 'Especie' },
  { clave: 'raza', titulo: 'Raza', renderizar: (mascota) => mascota.raza ?? 'Sin dato' },
  {
    clave: 'fechaNacimiento',
    titulo: 'Nacimiento',
    renderizar: (mascota) =>
      mascota.fechaNacimiento ? formatearFecha(mascota.fechaNacimiento) : 'Sin dato',
  },
  { clave: 'propietario', titulo: 'Propietario' },
  {
    clave: 'historia',
    titulo: 'Historia clínica',
    renderizar: (mascota) => (
      <Link to={`/historia-clinica/${mascota.idMascota}`}>Ver historia de {mascota.nombre}</Link>
    ),
  },
];

export default function MascotasPage() {
  const { mascotas, cargando, error, reintentar } = useMascotas();

  return (
    <section className="pagina">
      <h1>Historia clínica</h1>
      <p className="pagina__descripcion">Elige una mascota para ver sus consultas.</p>
      <EstadoDatos
        cargando={cargando}
        error={error}
        vacio={mascotas.length === 0}
        mensajeVacio="Aún no hay mascotas registradas."
        onReintentar={reintentar}
      >
        <Tabla
          descripcion="Mascotas registradas"
          columnas={COLUMNAS}
          filas={mascotas}
          obtenerClave={(mascota) => mascota.idMascota}
        />
      </EstadoDatos>
    </section>
  );
}
