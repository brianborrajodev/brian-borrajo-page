# Brian Borrajo Page

Portfolio personal de Brian Borrajo. El MVP permite conocerme, explorar mis proyectos y redes, y encontrar mis datos de contacto. Actualmente es una web informativa: no tiene funciones de interacción para visitantes ni conexión de sus páginas a una base de datos.

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)

## Tabla de contenidos

- [Funcionalidades (MVP)](#funcionalidades-mvp)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Puesta en marcha](#puesta-en-marcha)
- [Base de datos y migraciones](#base-de-datos-y-migraciones)
- [Variables de entorno](#variables-de-entorno)
- [Documentación](#documentación)
- [Convenciones de ramas y commits](#convenciones-de-ramas-y-commits)
- [Estado del proyecto](#estado-del-proyecto)
- [Licencia y autor](#licencia-y-autor)

## Funcionalidades (MVP)

El MVP actual es un portfolio sin cuentas de usuario, likes, comentarios ni persistencia de datos. Se puede navegar entre sus páginas y abrir las fichas de los proyectos.

- [x] Home con diseño arcade y adaptación a móvil y escritorio.
- [x] Página de proyectos con filtros y fichas en modal.
- [x] Página de redes profesionales.
- [x] Página de contacto directo y profesional.
- [x] Navegación entre páginas sin recarga y cambio entre tema diurno/nocturno.

### Funcionalidades planteadas para el futuro

- [ ] Inicio de sesión con **LinkedIn** y **GitHub**.
- [ ] Likes o valoraciones de proyectos por parte de usuarios autenticados.
- [ ] Comentarios sobre la experiencia de trabajar conmigo y mi forma de programar.
- [ ] Persistencia de usuarios, likes y comentarios en PostgreSQL, mediante la API Flask.

## Stack tecnológico

| Capa | Tecnología |
| --- | --- |
| Frontend | JavaScript, React, Vite |
| Backend | Python y Flask (actualmente solo ofrece endpoints de salud) |
| Base de datos | PostgreSQL (infraestructura preparada; el MVP no la usa para el contenido del portfolio) |
| Modelado y migraciones | SQLAlchemy + Flask-SQLAlchemy + Flask-Migrate (base para funcionalidades futuras) |
| Entorno de desarrollo | Docker (Docker Compose) |
| Autenticación | OAuth con LinkedIn y GitHub (planificada; aún no implementada) |

## Estructura del proyecto

```
.
├── docs/
│   ├── design/      # Diseño de Figma
│   ├── database/    # schema.dbml y schema.svg (documentación del modelo)
│   └── ADR-*.md     # Decisiones de arquitectura
├── public/          # Archivos estáticos de Vite
├── src/
│   ├── frontend/    # Código React (main.jsx, App.jsx, assets/, components/, styles/)
│   └── backend/     # API Flask
│       ├── Dockerfile
│       ├── app.py
│       ├── extensions.py  # SQLAlchemy y Flask-Migrate
│       ├── models/        # Un .py por tabla (fuente de verdad del esquema)
│       ├── migrations/    # Revisiones generadas por Flask-Migrate
│       └── requirements.txt
├── .dockerignore
├── .env.example     # Plantilla de variables de entorno
├── .env             # Variables de entorno (no se sube al repositorio)
├── Dockerfile       # Imagen del frontend
├── docker-compose.yml
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
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
# Construir las imágenes, arrancar los servicios y activar la recarga automática
docker compose up --build --watch

# Si el stack ya está arrancado, conectarse solo al modo watch
docker compose watch

# En otra terminal, seguir los logs
docker compose logs -f

# Crear las tablas la primera vez (o tras borrar el volumen)
docker compose run --rm upgrade

# Detener los servicios (sin -v para conservar los datos de PostgreSQL)
docker compose down
```

Con `--watch`, los cambios en `src/frontend/`, `public/` e `index.html` se sincronizan y Vite recarga el navegador; los cambios en `src/backend/` se sincronizan y Flask reinicia el proceso. Los cambios en `package.json`, `package-lock.json`, `vite.config.js` o `requirements.txt` reconstruyen la imagen correspondiente.

Una vez arrancado:

| Servicio | Tecnología | Puerto | Descripción |
| --- | --- | --- | --- |
| `frontend` | React + Vite | `5173` | Interfaz web (http://localhost:5173) |
| `backend` | Python + Flask | `5000` | API (http://localhost:5000/health) |
| `db` | PostgreSQL 16 | `5432` | Base de datos, con tablas creadas por Flask-Migrate desde los modelos |

El backend espera a que PostgreSQL esté listo antes de arrancar. Los datos se guardan en el volumen `pgdata`, por lo que sobreviven a `docker compose down`. Un volumen nuevo arranca sin tablas: aplica la migración inicial con `docker compose run --rm upgrade`. Para comprobar la conexión:

```bash
curl http://localhost:5000/health/db
# o
docker compose exec db psql -U portfolio -d portfolio
```

## Base de datos y migraciones

Los modelos de SQLAlchemy en `src/backend/models/` son la **única fuente de verdad** del esquema: un archivo `.py` por tabla, todos heredan de `db.Model` y se exportan desde `models/__init__.py`. Flask-Migrate (integrado en `src/backend/app.py` mediante `src/backend/extensions.py`, donde también está la convención de nombres de restricciones) genera y aplica las migraciones con los comandos `flask db ...`. `docs/database/schema.dbml` y `docs/database/schema.svg` se mantienen solo como documentación visual, así que hay que actualizarlos cuando cambien los modelos. `init.sql` se eliminó: las tablas las crea únicamente la migración.

> Flask-Migrate usa Alembic internamente: por eso `src/backend/migrations/` contiene un `alembic.ini` y un `env.py` generados por `flask db init`. No se gestionan a mano ni existe un `alembic.ini` en la raíz; las operaciones se hacen siempre con `flask db`.

Los servicios `migrate` y `upgrade` tienen el perfil `tools`: no arrancan con `docker compose up`, solo se usan con `docker compose run`.

| Acción | Comando |
| --- | --- |
| Generar una revisión tras editar los modelos | `docker compose run --rm migrate -m "descripción"` |
| Crear las tablas / aplicar cambios pendientes | `docker compose run --rm upgrade` |
| Comprobar que modelos y base de datos coinciden | `docker compose run --rm backend flask --app app:app db check` |
| Ver el historial de revisiones | `docker compose run --rm backend flask --app app:app db history` |
| Ver la revisión actual | `docker compose run --rm backend flask --app app:app db current` |
| Revertir la última revisión | `docker compose run --rm backend flask --app app:app db downgrade -1` |
| Eliminar todas las tablas (volver a `base`) | `docker compose run --rm backend flask --app app:app db downgrade base` |

Flujo al cambiar el esquema:

1. Editar el modelo correspondiente en `src/backend/models/` (o crear un archivo nuevo y exportarlo en `models/__init__.py`).
2. Generar la revisión con `docker compose run --rm migrate -m "descripción"` y revisar el archivo creado en `src/backend/migrations/versions/` (ese directorio está montado desde el host, así que la revisión persiste).
3. Aplicarla con `docker compose run --rm upgrade` y verificar con `docker compose run --rm backend flask --app app:app db check`.

> `docker compose run` usa la imagen construida: ejecuta `docker compose build` si cambiaste `requirements.txt` o el `Dockerfile`. Los cambios en `src/backend/` ya se sincronizan con Compose Watch en los contenedores arrancados.

Para empezar de cero (esto **borra también los datos**):

```bash
docker compose down
docker volume rm mi-pagina_pgdata
docker compose up -d db
docker compose run --rm upgrade
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
| `FRONTEND_URL` | URL del frontend: único origen permitido por CORS en la API (p. ej. `http://localhost:5173`) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Credenciales OAuth de GitHub |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | Credenciales OAuth de LinkedIn |
| `BACKEND_URL` | URL del servicio backend |
| `VITE_API_URL` | URL de la API que consume el frontend; Vite solo expone al navegador variables `VITE_*` (por defecto `http://localhost:5000`) |

## Documentación

- [Diseño (Figma)](docs/design)
- [Esquema de la base de datos (DBML)](docs/database/schema.dbml) y [diagrama](docs/database/schema.svg) (documentación)
- [ADR-001: SQLAlchemy y Flask-Migrate](docs/ADR-001-sqlalchemy-flask-migrate.md)
- Modelos y migraciones: `src/backend/models/` y `src/backend/migrations/`.
- Los ADR adicionales se guardan directamente en `docs/`.

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
