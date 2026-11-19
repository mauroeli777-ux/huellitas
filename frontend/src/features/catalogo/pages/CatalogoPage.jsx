import CampoSelect from '../../../components/ui/CampoSelect';
import CampoTexto from '../../../components/ui/CampoTexto';
import EstadoDatos from '../../../components/ui/EstadoDatos';
import Insignia from '../../../components/ui/Insignia';
import Tabla from '../../../components/ui/Tabla';
import PrecioProducto from '../components/PrecioProducto';
import { FILTRO_SOLO_DISPONIBLES, useProductos } from '../hooks/useProductos';

const OPCIONES_DISPONIBILIDAD = [{ valor: FILTRO_SOLO_DISPONIBLES, etiqueta: 'Solo disponibles' }];

const COLUMNAS = [
  { clave: 'nombreProducto', titulo: 'Producto' },
  { clave: 'categoria', titulo: 'Categoría' },
  {
    clave: 'precioFinal',
    titulo: 'Precio',
    renderizar: (producto) => (
      <PrecioProducto precio={producto.precio} precioFinal={producto.precioFinal} />
    ),
  },
  {
    clave: 'stock',
    titulo: 'Disponibilidad',
    renderizar: (producto) =>
      producto.stock > 0 ? (
        <Insignia texto={`${producto.stock} unidades`} tono="exito" />
      ) : (
        <Insignia texto="Agotado" tono="peligro" />
      ),
  },
];

export default function CatalogoPage() {
  const catalogo = useProductos();
  const opcionesCategorias = catalogo.categorias.map((categoria) => ({
    valor: categoria.idCategoria,
    etiqueta: categoria.nombreCategoria,
  }));

  return (
    <section className="pagina">
      <h1>Catálogo de productos</h1>
      <div className="barra-herramientas">
        <CampoTexto
          id="busqueda"
          etiqueta="Buscar producto"
          valor={catalogo.busqueda}
          onCambio={catalogo.setBusqueda}
          placeholder="Ej. collar"
        />
        <CampoSelect
          id="categoria"
          etiqueta="Categoría"
          valor={catalogo.idCategoria}
          onCambio={catalogo.setIdCategoria}
          opciones={opcionesCategorias}
          textoVacio="Todas"
        />
        <CampoSelect
          id="disponibilidad"
          etiqueta="Disponibilidad"
          valor={catalogo.disponibilidad}
          onCambio={catalogo.setDisponibilidad}
          opciones={OPCIONES_DISPONIBILIDAD}
          textoVacio="Todos"
        />
      </div>

      <EstadoDatos
        cargando={catalogo.cargando}
        error={catalogo.error}
        vacio={catalogo.productos.length === 0}
        mensajeVacio="Ningún producto coincide con la búsqueda."
        onReintentar={catalogo.reintentar}
      >
        <Tabla
          descripcion="Productos de la tienda"
          columnas={COLUMNAS}
          filas={catalogo.productos}
          obtenerClave={(producto) => producto.idProducto}
        />
      </EstadoDatos>
    </section>
  );
}
