export default function CampoSelect({
  id,
  etiqueta,
  valor,
  onCambio,
  opciones,
  textoVacio = 'Selecciona una opción',
  obligatorio = false,
  error = '',
}) {
  const idError = `${id}-error`;

  return (
    <div className={`campo${error ? ' campo--con-error' : ''}`}>
      <label htmlFor={id} className="campo__etiqueta">
        {etiqueta}
        {obligatorio && (
          <span className="campo__obligatorio" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      <select
        id={id}
        name={id}
        className="campo__control"
        value={valor}
        onChange={(evento) => onCambio(evento.target.value)}
        aria-required={obligatorio}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? idError : undefined}
      >
        <option value="">{textoVacio}</option>
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
      {error && (
        <p id={idError} className="campo__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
