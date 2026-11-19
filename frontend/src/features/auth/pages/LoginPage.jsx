import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Alerta from '../../../components/ui/Alerta';
import Boton from '../../../components/ui/Boton';
import CampoTexto from '../../../components/ui/CampoTexto';
import { useInicioSesion } from '../hooks/useInicioSesion';

export default function LoginPage() {
  const { usuario } = useAuth();
  const { valores, errores, errorServidor, enviando, cambiarCampo, enviar } = useInicioSesion();

  if (usuario) return <Navigate to="/panel" replace />;

  return (
    <main className="inicio-sesion">
      <form className="inicio-sesion__formulario" onSubmit={enviar} noValidate>
        <h1>Huellitas</h1>
        <p className="pagina__descripcion">Ingresa para gestionar la clínica.</p>

        {errorServidor && <Alerta tipo="error">{errorServidor}</Alerta>}

        <CampoTexto
          id="correo"
          etiqueta="Correo electrónico"
          tipo="email"
          valor={valores.correo}
          onCambio={(valor) => cambiarCampo('correo', valor)}
          error={errores.correo}
          autoComplete="username"
          obligatorio
        />
        <CampoTexto
          id="contrasena"
          etiqueta="Contraseña"
          tipo="password"
          valor={valores.contrasena}
          onCambio={(valor) => cambiarCampo('contrasena', valor)}
          error={errores.contrasena}
          autoComplete="current-password"
          obligatorio
        />
        <Boton tipo="submit" cargando={enviando}>
          Iniciar sesión
        </Boton>
      </form>
    </main>
  );
}
