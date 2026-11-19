# Huellitas — Frontend (React)

Módulos del frontend de la clínica veterinaria Huellitas: panel principal, agenda y agendamiento de citas,
catálogo de productos e historia clínica. Evidencia 6 (GA7-220501096-AA4-EV01).

## Requisitos

- Node.js 20 o superior

## Instalación y ejecución

```bash
cd frontend
npm install
cp .env.example .env      # en Windows: copy .env.example .env
npm run dev               # abre http://localhost:5173
```

Otros comandos: `npm run lint`, `npm run format`, `npm run build`.

## Datos de prueba

Por defecto el frontend usa los datos de `src/api/mocks/` (`VITE_USAR_MOCKS=true`), con la misma forma que
tendrá la respuesta de la API. Se basan en el script `02_dml_huellitas.sql`.

- Inicio de sesión: `admin@huellitas.co`, `jramirez@huellitas.co` o `ana.rios@example.com` con cualquier
  contraseña de 6 o más caracteres. Un correo desconocido o una contraseña corta produce el error 401.
- Caso de error de horario (409): agendar con Julian Ramirez el `2026-11-24` a las `09:00`.
- Caso límite de historia clínica: la historia de Rocky tiene una consulta de urgencia sin cita previa.
- Caso límite de catálogo: el shampoo hipoalergénico está agotado.git status
- Caso de mascota inexistente (404): abrir `/historia-clinica/99`.
- Caso de error del servidor (500): poner `VITE_SIMULAR_ERROR=true` en `.env` y reiniciar `npm run dev`.

Para usar la API real (HUE-17): `VITE_USAR_MOCKS=false` y definir `VITE_API_URL`.

## Estructura

Sigue la sección 2.3 del plan técnico (Evidencia 4): `api/`, `components/ui`, `components/layout`,
`features/<módulo>/{components,hooks,pages}`, `context/`, `routes/`, `utils/` y `styles/`.
Los hooks genéricos (`useCargaDatos`, `useEnvioUnico`, `useAdvertirSalida`) viven en `utils/` porque se
usan en más de una feature.
Cargando, MensajeError y SinResultados son piezas internas de EstadoDatos: las pantallas solo usan ese componente, que es el genérico reutilizado.
