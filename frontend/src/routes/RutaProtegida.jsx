import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaProtegida() {
  const { usuario } = useAuth();
  return usuario ? <Outlet /> : <Navigate to="/iniciar-sesion" replace />;
}
