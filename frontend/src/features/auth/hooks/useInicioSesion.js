import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { validarInicioSesion } from '../../../utils/validarInicioSesion';
import { obtenerMensajeError } from '../../../utils/obtenerMensajeError';
import { useEnvioUnico } from '../../../utils/useEnvioUnico';

const VALORES_INICIALES = { correo: '', contrasena: '' };

export function useInicioSesion() {
  const { iniciarSesion } = useAuth();
  const navegar = useNavigate();
  const { enviando, ejecutar } = useEnvioUnico();
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState(null);

  function cambiarCampo(nombre, valor) {
    setValores((anteriores) => ({ ...anteriores, [nombre]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [nombre]: undefined }));
    setErrorServidor(null);
  }

  function enviar(evento) {
    evento.preventDefault();
    const erroresEncontrados = validarInicioSesion(valores);
    setErrores(erroresEncontrados);
    setErrorServidor(null);
    if (Object.keys(erroresEncontrados).length > 0) return;

    ejecutar(async () => {
      try {
        await iniciarSesion(valores.correo, valores.contrasena);
        navegar('/panel');
      } catch (falla) {
        setErrorServidor(obtenerMensajeError(falla));
      }
    });
  }

  return { valores, errores, errorServidor, enviando, cambiarCampo, enviar };
}
