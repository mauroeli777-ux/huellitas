import httpClient from './httpClient';
import { USAR_MOCKS } from './config';
import * as mockApi from './mocks/mockApi';

export async function listarCitas() {
  if (USAR_MOCKS) return mockApi.listarCitas();
  const { data } = await httpClient.get('/citas');
  return data;
}

export async function crearCita(datosCita) {
  if (USAR_MOCKS) return mockApi.crearCita(datosCita);
  const { data } = await httpClient.post('/citas', datosCita);
  return data;
}

export async function listarServicios() {
  if (USAR_MOCKS) return mockApi.listarServicios();
  const { data } = await httpClient.get('/servicios');
  return data;
}

export async function listarVeterinarios() {
  if (USAR_MOCKS) return mockApi.listarVeterinarios();
  const { data } = await httpClient.get('/veterinarios');
  return data;
}
