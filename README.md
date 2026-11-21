# Brian Borrajo Page

Página web / portfolio personal donde cualquier persona puede explorar los proyectos en los que he participado y dejar su opinión: valorar proyectos, y comentar si le gustó trabajar conmigo o qué le parece mi forma de programar.

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)

## Tabla de contenidos

- [Funcionalidades (MVP)](#funcionalidades-mvp)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Puesta en marcha](#puesta-en-marcha)
- [Variables de entorno](#variables-de-entorno)
- [Documentación](#documentación)
- [Convenciones de ramas y commits](#convenciones-de-ramas-y-commits)
- [Estado del proyecto](#estado-del-proyecto)
- [Licencia y autor](#licencia-y-autor)

## Funcionalidades (MVP)

- [ ] Página de inicio (Home) respetando el diseño documentado en `docs/design`.
- [ ] Inicio de sesión con **LinkedIn** y **GitHub**.
- [ ] Valoración de proyectos por parte de los usuarios autenticados.
- [ ] Sección de comentarios sobre mí (experiencia trabajando conmigo, forma de programar, etc.).

## Stack tecnológico

| Capa | Tecnología |
| --- | --- |
| Frontend | JavaScript, React, Vite |
| Backend | Python, Flask |
| Base de datos | PostgreSQL |
| Entorno de desarrollo | Docker (Docker Compose) |
| Autenticación | OAuth con LinkedIn y GitHub |

## Estructura del proyecto

```
.
├── docs/
│   ├── design/      # Diseño de Figma
│   └── database/    # Diagrama UML de la base de datos y script init.sql
├── src/
│   ├── frontend/    # Aplicación React (Vite)
│   │   ├── Dockerfile
│   │   └── package.json
│   └── backend/     # API Flask
│       ├── Dockerfile
│       ├── app.py
│       └── requirements.txt
├── .env.example     # Plantilla de variables de entorno
├── .env             # Variables de entorno (no se sube al repositorio)
├── docker-compose.yml
└── README.md
```

> La estructura puede evolucionar durante el desarrollo.

## Puesta en marcha

### Requisitos previos

- [Docker](https://www.docker.com/) con Docker Compose (incluido en Docker Desktop).
- Node.js y npm (versión por definir) si se ejecuta el frontend fuera de Docker.
- Python 3 (versión por definir) si se ejecuta el backend fuera de Docker.

### Instalación

```bash
# 1. Clonar el repositorio
git clone <URL-DEL-REPOSITORIO>
cd <NOMBRE-DE-LA-CARPETA>

# 2. Crear el archivo de variables de entorno y ajustarlo si hace falta
cp .env.example .env
```

### Ejecución

```bash
# Construir las imágenes y arrancar todos los servicios
docker compose up --build

# En otra terminal, seguir los logs
docker compose logs -f

# Detener los servicios (añade -v para borrar también los datos de PostgreSQL)
docker compose down
```

Una vez arrancado:

| Servicio | Tecnología | Puerto | Descripción |
| --- | --- | --- | --- |
| `frontend` | React + Vite | `5173` | Interfaz web (http://localhost:5173) |
| `backend` | Python + Flask | `5000` | API (http://localhost:5000/health) |
| `db` | PostgreSQL 16 | `5432` | Base de datos, con tablas creadas desde `docs/database/init.sql` |

El backend espera a que PostgreSQL esté listo antes de arrancar. Los datos se guardan en el volumen `pgdata`, por lo que sobreviven a `docker compose down`. Para comprobar la conexión a la base de datos:

```bash
curl http://localhost:5000/health/db
# o
docker compose exec db psql -U portfolio -d portfolio
```

## Variables de entorno

Las variables de entorno viven en un archivo `.env` en la raíz del proyecto. **Nunca debe subirse al repositorio** (asegúrate de que está en `.gitignore`).

| Variable | Descripción |
| --- | --- |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Usuario, contraseña y nombre de la base de datos PostgreSQL |
| `POSTGRES_PORT` | Puerto PostgreSQL expuesto en el host (por defecto `5432`) |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL (opcional; tiene prioridad sobre las variables `POSTGRES_*` en la API) |
| `SECRET_KEY` | Clave secreta de Flask |
| `FLASK_DEBUG` | Activa el modo debug de Flask (`1` en desarrollo) |
| `CORS_ORIGINS` | Orígenes permitidos por la API (por defecto `http://localhost:5173`) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Credenciales OAuth de GitHub |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | Credenciales OAuth de LinkedIn |
| `VITE_API_URL` | URL de la API que usa el frontend (por defecto `http://localhost:5000`) |

## Documentación

- [Diseño (Figma)](docs/design)
- [Base de datos (UML)](docs/database)
- [Script de creación de tablas](docs/database/init.sql)

## Convenciones de ramas y commits

Prefijos usados tanto en ramas como en commits:

| Prefijo | Uso |
| --- | --- |
| `feat/` | Nueva funcionalidad |
| `fix/` | Corrección de errores |
| `docs/` | Cambios en documentación |

Ejemplos: rama `feat/login-github`, commit `docs: add initial README`.

## Estado del proyecto

🚧 **En desarrollo.** Actualmente trabajando en el MVP.

## Licencia y autor

© Brian Borrajo Otalvaro. Todos los derechos reservados.

**Autor:** Brian Borrajo Otalvaro
