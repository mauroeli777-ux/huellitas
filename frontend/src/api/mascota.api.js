import httpClient from './httpClient';
import { USAR_MOCKS } from './config';
import * as mockApi from './mocks/mockApi';

export async function listarMascotas() {
  if (USAR_MOCKS) return mockApi.listarMascotas();
  const { data } = await httpClient.get('/mascotas');
  return data;
}

export async function obtenerHistoria(idMascota) {
  if (USAR_MOCKS) return mockApi.obtenerHistoria(idMascota);
  const { data } = await httpClient.get(`/mascotas/${idMascota}/historia`);
  return data;
}
