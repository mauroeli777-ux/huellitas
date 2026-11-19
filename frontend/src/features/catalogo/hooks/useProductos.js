import { useMemo, useState } from 'react';
import { listarCategorias, listarProductos } from '../../../api/producto.api';
import { normalizarTexto } from '../../../utils/normalizarTexto';
import { useCargaDatos } from '../../../utils/useCargaDatos';

export const FILTRO_SOLO_DISPONIBLES = 'disponibles';

function cargarCatalogo() {
  return Promise.all([listarProductos(), listarCategorias()]).then(([productos, categorias]) => ({
    productos,
    categorias,
  }));
}

export function useProductos() {
  const { datos, cargando, error, reintentar } = useCargaDatos(cargarCatalogo);
  const [busqueda, setBusqueda] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [disponibilidad, setDisponibilidad] = useState('');

  const productos = useMemo(() => {
    const textoBuscado = normalizarTexto(busqueda.trim());
    return (datos?.productos ?? []).filter((producto) => {
      const coincideNombre = normalizarTexto(producto.nombreProducto).includes(textoBuscado);
      const coincideCategoria = !idCategoria || producto.idCategoria === Number(idCategoria);
      const coincideStock = disponibilidad !== FILTRO_SOLO_DISPONIBLES || producto.stock > 0;
      return coincideNombre && coincideCategoria && coincideStock;
    });
  }, [datos, busqueda, idCategoria, disponibilidad]);

  return {
    productos,
    categorias: datos?.categorias ?? [],
    cargando,
    error,
    reintentar,
    busqueda,
    setBusqueda,
    idCategoria,
    setIdCategoria,
    disponibilidad,
    setDisponibilidad,
  };
}
