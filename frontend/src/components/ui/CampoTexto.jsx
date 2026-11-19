export default function CampoTexto({
  id,
  etiqueta,
  valor,
  onCambio,
  tipo = 'text',
  obligatorio = false,
  error = '',
  ayuda = '',
  autoComplete,
  placeholder,
}) {
  const idError = `${id}-error`;
  const idAyuda = `${id}-ayuda`;
  const describedBy = [error && idError, ayuda && idAyuda].filter(Boolean).join(' ') || undefined;

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
      <input
        id={id}
        name={id}
        type={tipo}
        className="campo__control"
        value={valor}
        onChange={(evento) => onCambio(evento.target.value)}
        aria-required={obligatorio}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
      {ayuda && (
        <p id={idAyuda} className="campo__ayuda">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={idError} className="campo__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
