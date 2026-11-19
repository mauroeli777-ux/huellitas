import Cargando from './Cargando';
import MensajeError from './MensajeError';
import SinResultados from './SinResultados';

// Decide qué mostrar según el estado de una carga: cargando, error, sin resultados o el contenido
export default function EstadoDatos({
  cargando,
  error,
  vacio = false,
  mensajeVacio,
  onReintentar,
  children,
}) {
  if (cargando) return <Cargando />;
  if (error) return <MensajeError mensaje={error} onReintentar={onReintentar} />;
  if (vacio) return <SinResultados mensaje={mensajeVacio} />;
  return children;
}
