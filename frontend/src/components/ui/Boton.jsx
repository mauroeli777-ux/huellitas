export default function Boton({
  children,
  tipo = 'button',
  variante = 'primario',
  cargando = false,
  deshabilitado = false,
  onClick,
}) {
  return (
    <button
      type={tipo}
      className={`boton boton--${variante}`}
      disabled={deshabilitado || cargando}
      aria-busy={cargando}
      onClick={onClick}
    >
      {cargando ? 'Procesando…' : children}
    </button>
  );
}
