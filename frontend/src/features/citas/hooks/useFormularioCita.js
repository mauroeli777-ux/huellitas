import { useState } from 'react';
import { crearCita } from '../../../api/cita.api';
import { obtenerMensajeError } from '../../../utils/obtenerMensajeError';
import { useEnvioUnico } from '../../../utils/useEnvioUnico';
import { validarCita } from '../../../utils/validarCita';

const VALORES_INICIALES = { idMascota: '', idServicio: '', idUsuarioVet: '', fechaHora: '' };
const ESTADO_HTTP_CONFLICTO = 409;

export function useFormularioCita() {
  const { enviando, ejecutar } = useEnvioUnico();
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState(null);
  const [citaCreada, setCitaCreada] = useState(null);

  const hayCambios = Object.values(valores).some((valor) => valor !== '');

  function cambiarCampo(nombre, valor) {
    setValores((anteriores) => ({ ...anteriores, [nombre]: valor }));
    setErrores((anteriores) => ({ ...anteriores, [nombre]: undefined }));
    setErrorServidor(null);
    setCitaCreada(null);
  }

  function enviar(evento) {
    evento.preventDefault();
    const erroresEncontrados = validarCita(valores);
    setErrores(erroresEncontrados);
    setErrorServidor(null);
    setCitaCreada(null);
    if (Object.keys(erroresEncontrados).length > 0) return;

    ejecutar(async () => {
      try {
        const cita = await crearCita({
          idMascota: Number(valores.idMascota),
          idServicio: Number(valores.idServicio),
          idUsuarioVet: Number(valores.idUsuarioVet),
          fechaHora: valores.fechaHora,
        });
        setCitaCreada(cita);
        setValores(VALORES_INICIALES);
      } catch (falla) {
        const mensaje = obtenerMensajeError(falla);
        // Horario ocupado (RN-03): el mensaje va junto al campo de fecha y hora, y se conservan los valores
        if (falla?.response?.status === ESTADO_HTTP_CONFLICTO) {
          setErrores({ fechaHora: mensaje });
        } else {
          setErrorServidor(mensaje);
        }
      }
    });
  }

  return {
    valores,
    errores,
    errorServidor,
    citaCreada,
    enviando,
    hayCambios,
    cambiarCampo,
    enviar,
  };
}
