import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutPrincipal from '../components/layout/LayoutPrincipal';
import NoEncontrado from '../components/layout/NoEncontrado';
import LoginPage from '../features/auth/pages/LoginPage';
import PanelPage from '../features/panel/pages/PanelPage';
import AgendaPage from '../features/citas/pages/AgendaPage';
import NuevaCitaPage from '../features/citas/pages/NuevaCitaPage';
import CatalogoPage from '../features/catalogo/pages/CatalogoPage';
import MascotasPage from '../features/historia-clinica/pages/MascotasPage';
import HistoriaClinicaPage from '../features/historia-clinica/pages/HistoriaClinicaPage';
import RutaProtegida from './RutaProtegida';

// Todas las rutas del frontend se declaran aquí
export const router = createBrowserRouter([
  { path: '/iniciar-sesion', element: <LoginPage /> },
  {
    element: <RutaProtegida />,
    children: [
      {
        element: <LayoutPrincipal />,
        children: [
          { index: true, element: <Navigate to="/panel" replace /> },
          { path: 'panel', element: <PanelPage /> },
          { path: 'citas', element: <AgendaPage /> },
          { path: 'citas/nueva', element: <NuevaCitaPage /> },
          { path: 'catalogo', element: <CatalogoPage /> },
          { path: 'historia-clinica', element: <MascotasPage /> },
          { path: 'historia-clinica/:idMascota', element: <HistoriaClinicaPage /> },
          { path: '*', element: <NoEncontrado /> },
        ],
      },
    ],
  },
]);
