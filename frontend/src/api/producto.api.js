import httpClient from './httpClient';
import { USAR_MOCKS } from './config';
import * as mockApi from './mocks/mockApi';

export async function listarProductos() {
  if (USAR_MOCKS) return mockApi.listarProductos();
  const { data } = await httpClient.get('/productos');
  return data;
}

export async function listarCategorias() {
  if (USAR_MOCKS) return mockApi.listarCategorias();
  const { data } = await httpClient.get('/categorias');
  return data;
}
