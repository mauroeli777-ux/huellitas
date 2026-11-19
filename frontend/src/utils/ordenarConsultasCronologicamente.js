// De la más antigua a la más reciente; las consultas sin cita (urgencias) no tienen fecha y van al final
export function ordenarConsultasCronologicamente(consultas) {
  return [...consultas].sort((a, b) => {
    if (a.fechaHora === null && b.fechaHora === null) return 0;
    if (a.fechaHora === null) return 1;
    if (b.fechaHora === null) return -1;
    return new Date(a.fechaHora) - new Date(b.fechaHora);
  });
}
