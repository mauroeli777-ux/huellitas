// columnas: [{ clave, titulo, renderizar?(fila) }]; obtenerClave(fila) devuelve un identificador único
export default function Tabla({ columnas, filas, obtenerClave, descripcion }) {
  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <caption className="solo-lectores">{descripcion}</caption>
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna.clave} scope="col">
                {columna.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={obtenerClave(fila)}>
              {columnas.map((columna) => (
                <td key={columna.clave}>
                  {columna.renderizar ? columna.renderizar(fila) : fila[columna.clave]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
