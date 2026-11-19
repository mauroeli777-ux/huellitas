import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Boton from '../ui/Boton';

export default function Encabezado() {
  const { usuario, cerrarSesion } = useAuth();
  const navegar = useNavigate();

  function manejarSalida() {
    cerrarSesion();
    navegar('/iniciar-sesion');
  }

  return (
    <header className="encabezado">
      <p className="encabezado__usuario">
        {usuario.nombres} <span className="encabezado__rol">({usuario.rol})</span>
      </p>
      <Boton variante="secundario" onClick={manejarSalida}>
        Cerrar sesión
      </Boton>
    </header>
  );
}
