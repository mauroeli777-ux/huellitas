// Minúsculas y sin tildes, para que "hipoalergenico" encuentre "hipoalergénico"
export function normalizarTexto(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
