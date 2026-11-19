import httpClient from './httpClient';
import { USAR_MOCKS } from './config';
import * as mockApi from './mocks/mockApi';

export async function iniciarSesion(correo, contrasena) {
  if (USAR_MOCKS) return mockApi.iniciarSesion(correo, contrasena);
  const { data } = await httpClient.post('/auth/login', { correo, contrasena });
  return data;
}
