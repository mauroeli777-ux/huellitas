// tipo: 'exito' | 'error' | 'aviso'
export default function Alerta({ tipo = 'aviso', children }) {
  const rol = tipo === 'error' ? 'alert' : 'status';
  return (
    <div className={`alerta alerta--${tipo}`} role={rol}>
      {children}
    </div>
  );
}
