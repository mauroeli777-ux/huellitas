import { formatearMoneda } from '../../../utils/formatearMoneda';

// Solo muestra los valores que entrega la API: el descuento se calcula en el backend
export default function PrecioProducto({ precio, precioFinal }) {
  const tieneDescuento = precioFinal < precio;
  return (
    <span className="precio">
      {tieneDescuento && <s className="precio__original">{formatearMoneda(precio)}</s>}
      <strong>{formatearMoneda(precioFinal)}</strong>
    </span>
  );
}
