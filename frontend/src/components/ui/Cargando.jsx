export default function Cargando({ mensaje = 'Cargando…' }) {
  return (
    <p className="estado-datos" role="status">
      {mensaje}
    </p>
  );
}
