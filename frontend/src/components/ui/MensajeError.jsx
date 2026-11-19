import Alerta from './Alerta';
import Boton from './Boton';

export default function MensajeError({ mensaje, onReintentar }) {
  return (
    <div className="estado-datos">
      <Alerta tipo="error">{mensaje}</Alerta>
      {onReintentar && (
        <Boton variante="secundario" onClick={onReintentar}>
          Reintentar
        </Boton>
      )}
    </div>
  );
}
