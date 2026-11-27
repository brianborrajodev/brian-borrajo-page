#  Portfolio Web de Brian Borrajo Otalvaro

Bienvenidos al README de mi portfolio personal . El MVP permite conocerme, explorar mis proyectos y redes, y encontrar mis datos de contacto. Incluye navegación, filtros y fichas interactivas; todavía no ofrece interacción social (cuentas, likes o comentarios) ni guarda el contenido del portfolio en una base de datos.

![Estado](https://img.shields.io/badge/estado-en%20producci%C3%B3n-brightgreen)

🌐 **Portfolio en producción:** [brian-borrajo-otalvaro-portfolio.onrender.com](https://brian-borrajo-otalvaro-portfolio.onrender.com/)

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

El MVP publicado es un portfolio informativo. Permite navegar entre páginas sin recarga, filtrar proyectos, consultar sus fichas y abrir los enlaces de contacto y perfiles. No incluye cuentas de usuario, likes, comentarios ni persistencia del contenido del portfolio en una base de datos.

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
| Backend | Python 3.12 y Flask (actualmente solo ofrece endpoints de salud) |
| Base de datos | PostgreSQL 16 (infraestructura preparada; el MVP no la usa para el contenido del portfolio) |
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
│   ├── frontend/    # React: App.jsx, main.jsx, routes.jsx, assets/, components/, layouts/, pages/, data/, styles/
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
- Node.js 22 y npm si se ejecuta el frontend fuera de Docker.
- Python 3.12 si se ejecuta el backend fuera de Docker.

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

El backend y el esquema de PostgreSQL están preparados para futuras funciones (usuarios, likes y comentarios), pero **el frontend del MVP publicado no consume la API ni guarda el contenido del portfolio en la base de datos**. Los modelos de SQLAlchemy en `src/backend/models/` son la fuente de verdad del esquema: un archivo `.py` por tabla, todos heredan de `db.Model` y se exportan en `models/__init__.py`. Flask-Migrate (integrado en `src/backend/app.py` mediante `src/backend/extensions.py`) genera y aplica migraciones con `flask db ...`. `docs/database/schema.dbml` y `docs/database/schema.svg` son documentación visual del esquema.

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
Todos los valores requeridos por Compose y Flask se leen desde `.env` y no tienen valores de respaldo; copia `.env.example` y completa sus secretos antes de arrancar los servicios. Las credenciales OAuth son marcadores para la futura función de inicio de sesión y actualmente no se utilizan.

`.env.example` está configurado para Docker Compose (`POSTGRES_HOST=db`). Si ejecutas Flask directamente en el host, cambia `POSTGRES_HOST` a `localhost` en tu `.env`.

| Variable | Descripción |
| --- | --- |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Credenciales y nombre de la base de datos PostgreSQL |
| `POSTGRES_HOST` / `POSTGRES_PORT` | Host y puerto de PostgreSQL desde la API (en Compose, el host es `db`) |
| `POSTGRES_HEALTHCHECK_HOST` | Host local usado por la comprobación de salud de PostgreSQL |
| `POSTGRES_EXPOSED_PORT` | Puerto de PostgreSQL expuesto en el host |
| `SECRET_KEY` | Clave secreta obligatoria de Flask |
| `FLASK_DEBUG` / `FLASK_RUN_HOST` / `FLASK_RUN_PORT` | Modo de depuración y dirección/puerto de Flask |
| `BACKEND_EXPOSED_PORT` | Puerto del backend expuesto en el host |
| `FRONTEND_URL` | Único origen permitido por CORS (p. ej. `http://localhost:5173`) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Credenciales OAuth de GitHub |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | Credenciales OAuth de LinkedIn |
| `VITE_HOST` / `VITE_PORT` | Dirección y puerto donde escucha Vite |
| `FRONTEND_EXPOSED_PORT` | Puerto del frontend expuesto en el host |
| `VITE_API_URL` | URL de API que usará el frontend cuando consuma endpoints; Vite solo expone al navegador variables `VITE_*` |

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

🚀 **En producción.** El MVP está publicado en [Render](https://brian-borrajo-otalvaro-portfolio.onrender.com/); el proyecto continúa en desarrollo para futuras funcionalidades.

## Licencia y autor

© Brian Borrajo Otalvaro. Todos los derechos reservados.

**Autor:** Brian Borrajo Otalvaro
