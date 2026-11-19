import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { iniciarSesion as iniciarSesionApi } from '../api/auth.api';

const AuthContext = createContext(null);
const CLAVE_USUARIO = 'usuario';
const CLAVE_TOKEN = 'token';

function leerUsuarioGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIO));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado);

  const iniciarSesion = useCallback(async (correo, contrasena) => {
    const { token, usuario: usuarioAutenticado } = await iniciarSesionApi(correo, contrasena);
    localStorage.setItem(CLAVE_TOKEN, token);
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuarioAutenticado));
    setUsuario(usuarioAutenticado);
  }, []);

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({ usuario, iniciarSesion, cerrarSesion }),
    [usuario, iniciarSesion, cerrarSesion]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return contexto;
}
