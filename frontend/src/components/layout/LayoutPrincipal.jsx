import { Outlet } from 'react-router-dom';
import BarraLateral from './BarraLateral';
import Encabezado from './Encabezado';

export default function LayoutPrincipal() {
  return (
    <div className="aplicacion">
      <BarraLateral />
      <div className="aplicacion__cuerpo">
        <Encabezado />
        <main className="aplicacion__contenido">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
