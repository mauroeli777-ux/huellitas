import { Link } from 'react-router-dom';

export default function NoEncontrado({
  titulo = 'Página no encontrada',
  mensaje = 'La dirección que escribiste no existe o fue movida.',
}) {
  return (
    <section className="pagina">
      <h1>{titulo}</h1>
      <p>{mensaje}</p>
      <Link to="/panel">Volver al panel principal</Link>
    </section>
  );
}
