// tono: 'exito' | 'aviso' | 'peligro' | 'neutro'
export default function Insignia({ texto, tono = 'neutro' }) {
  return <span className={`insignia insignia--${tono}`}>{texto}</span>;
}
