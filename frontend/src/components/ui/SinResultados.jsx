export default function SinResultados({ mensaje = 'No hay resultados para mostrar.' }) {
  return <p className="estado-datos estado-datos--vacio">{mensaje}</p>;
}
