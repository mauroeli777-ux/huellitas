import { NavLink } from 'react-router-dom';

const ENLACES = [
  { ruta: '/panel', texto: 'Panel principal', exacto: false },
  { ruta: '/citas', texto: 'Agenda de citas', exacto: true },
  { ruta: '/citas/nueva', texto: 'Agendar cita', exacto: false },
  { ruta: '/catalogo', texto: 'Catálogo', exacto: false },
  { ruta: '/historia-clinica', texto: 'Historia clínica', exacto: false },
];

export default function BarraLateral() {
  return (
    <nav className="barra-lateral" aria-label="Módulos de Huellitas">
      <p className="barra-lateral__marca">Huellitas</p>
      <ul className="barra-lateral__lista">
        {ENLACES.map((enlace) => (
          <li key={enlace.ruta}>
            <NavLink
              to={enlace.ruta}
              end={enlace.exacto}
              className={({ isActive }) =>
                `barra-lateral__enlace${isActive ? ' barra-lateral__enlace--activo' : ''}`
              }
            >
              {enlace.texto}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
