// Datos de prueba con la forma de la respuesta de la API.
// Tomados del script 02_dml_huellitas.sql; lo agregado respecto al DML está marcado con "(extra)".

export const usuarios = [
  {
    idUsuario: 1,
    nombres: 'Mauricio Elizalde',
    correo: 'admin@huellitas.co',
    rol: 'administrador',
  },
  { idUsuario: 2, nombres: 'Julian Ramirez', correo: 'jramirez@huellitas.co', rol: 'veterinario' },
  { idUsuario: 3, nombres: 'Ana Rios', correo: 'ana.rios@example.com', rol: 'cliente' },
];

export const veterinarios = [
  { idUsuario: 2, nombres: 'Julian Ramirez', especialidad: 'Medicina general' },
];

export const servicios = [
  { idServicio: 1, nombreServicio: 'Consulta general', precio: 55000 },
  { idServicio: 2, nombreServicio: 'Vacunacion', precio: 45000 },
];

export const mascotas = [
  {
    idMascota: 1,
    idUsuario: 3,
    propietario: 'Ana Rios',
    especie: 'Perro',
    nombre: 'Luna',
    raza: 'Labrador',
    fechaNacimiento: '2022-03-14',
    sexo: 'H',
  },
  {
    idMascota: 2,
    idUsuario: 4,
    propietario: 'Luis Pena',
    especie: 'Perro',
    nombre: 'Rocky',
    raza: 'Criollo',
    fechaNacimiento: '2021-11-20',
    sexo: 'M',
  },
];

const luna = { idMascota: 1, mascota: 'Luna' };
const rocky = { idMascota: 2, mascota: 'Rocky' };
const julian = { idUsuarioVet: 2, veterinario: 'Julian Ramirez' };
const consultaGeneral = { idServicio: 1, servicio: 'Consulta general' };
const vacunacion = { idServicio: 2, servicio: 'Vacunacion' };

export const citas = [
  {
    idCita: 1,
    ...luna,
    ...consultaGeneral,
    ...julian,
    fechaHora: '2026-09-15T09:00:00',
    estado: 'atendida',
  },
  {
    idCita: 2,
    ...rocky,
    ...vacunacion,
    ...julian,
    fechaHora: '2026-09-30T08:30:00',
    estado: 'atendida',
  },
  // (extra) citas futuras para probar el panel y el choque de horario (error 409)
  {
    idCita: 3,
    ...rocky,
    ...consultaGeneral,
    ...julian,
    fechaHora: '2026-11-24T09:00:00',
    estado: 'agendada',
  },
  {
    idCita: 4,
    ...luna,
    ...vacunacion,
    ...julian,
    fechaHora: '2026-11-26T08:30:00',
    estado: 'agendada',
  },
  // (extra) cita cancelada para probar el filtro de estado
  {
    idCita: 5,
    ...luna,
    ...consultaGeneral,
    ...julian,
    fechaHora: '2026-10-05T10:00:00',
    estado: 'cancelada',
  },
];

export const historias = [
  { idHistoria: 1, idMascota: 1, observaciones: 'Paciente tranquilo, buena condicion corporal' },
  { idHistoria: 2, idMascota: 2, observaciones: 'Requiere seguimiento dermatologico' },
];

export const consultas = [
  {
    idConsulta: 1,
    idHistoria: 1,
    idCita: 1,
    diagnostico: 'Paciente sano, sin hallazgos',
    tratamiento: 'Continuar con dieta actual',
  },
  // (extra) caso límite: consulta de urgencia sin cita previa (id_cita NULL en la base de datos)
  {
    idConsulta: 2,
    idHistoria: 2,
    idCita: null,
    diagnostico: 'Dermatitis alérgica en zona dorsal',
    tratamiento: 'Antihistamínico por 7 días y control en 15 días',
  },
];

export const categorias = [
  { idCategoria: 1, nombreCategoria: 'Alimento' },
  { idCategoria: 2, nombreCategoria: 'Accesorios' },
];

export const productos = [
  {
    idProducto: 1,
    idCategoria: 1,
    categoria: 'Alimento',
    nombreProducto: 'Concentrado Dogy 5kg',
    precio: 78000,
    precioFinal: 78000,
    stock: 40,
  },
  {
    idProducto: 2,
    idCategoria: 2,
    categoria: 'Accesorios',
    nombreProducto: 'Collar ajustable M',
    precio: 15000,
    precioFinal: 13500,
    stock: 60,
  },
  // (extra) caso límite: producto agotado
  {
    idProducto: 3,
    idCategoria: 2,
    categoria: 'Accesorios',
    nombreProducto: 'Shampoo hipoalergénico 500 ml',
    precio: 32000,
    precioFinal: 32000,
    stock: 0,
  },
];
