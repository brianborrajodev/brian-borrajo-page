# AGENTS.md

Instrucciones para agentes de código que trabajen en este repositorio (OpenCode, Codex, Claude Code u otros compatibles con `AGENTS.md`). Se asume que el agente opera desde la raíz del proyecto.

## 1. Contexto del proyecto

- Portfolio personal de Brian Borrajo: proyectos, valoraciones y comentarios de visitantes.
- Proyecto en fase de MVP (ver `README.md`); no asumas funcionalidades que aún no existen.
- Documentación y comentarios en **español**; identificadores de código en **inglés**.
- Usa siempre la ruta más corta que resuelva la tarea: no refactorices ni reordenes archivos sin que se te pida.

## 2. Estructura (no reordenar sin motivo explícito)

```
.
├── docs/
│   ├── design/          # Diseño de Figma
│   ├── database/        # schema.dbml + schema.svg (documentación del modelo)
│   └── ADR-*.md         # Decisiones de arquitectura (p. ej. ADR-001)
├── public/              # Estáticos de Vite (/icons.svg, /favicon.svg)
├── src/
│   ├── frontend/        # React: App.jsx, main.jsx, assets/, components/, styles/
│   └── backend/         # Flask: app.py, extensions.py, models/, migrations/, requirements.txt, Dockerfile
├── Dockerfile           # Imagen del frontend
├── docker-compose.yml
├── .env.example
├── README.md
└── AGENTS.md
```

Reglas de ubicación:

- Lo que pertenece a la raíz va en la raíz: `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `public/`, `Dockerfile` y `docker-compose.yml`.
- El código React vive **directamente** en `src/frontend/`. No crees `src/frontend/src/`.
- Todo CSS creado manualmente va en `src/frontend/styles/` y se importa desde ahí con rutas relativas (`./styles/...` o `../styles/...`). No dejes archivos `.css` sueltos en `src/frontend/` ni en `src/frontend/components/`.
- La API Flask vive en `src/backend/`.
- Los ADR adicionales se guardan directamente en `docs/` (p. ej. `docs/ADR-001-titulo.md`), no dentro de `docs/design/` ni `docs/database/`.
- Si mueves un archivo, actualiza en el mismo cambio `README.md`, `index.html`, los Dockerfiles y `docker-compose.yml` según corresponda.

## 3. Comandos habituales

```bash
# Frontend (raíz del repo)
npm install
npm run dev        # Vite en http://localhost:5173
npm run lint
npm run build

# Entorno completo (requiere .env)
cp .env.example .env
docker compose up --build --watch
docker compose watch   # si el stack ya está arrancado
docker compose logs -f
docker compose down

# Backend / BD
curl http://localhost:5000/health
curl http://localhost:5000/health/db
docker compose exec db psql -U portfolio -d portfolio

# Migraciones (comandos cortos; servicios con perfil "tools")
docker compose run --rm migrate -m "descripcion"
docker compose run --rm upgrade
docker compose run --rm backend flask --app app:app db check
```

El stack se arranca con `--watch`: Compose sincroniza `src/frontend/`, `public/` e `index.html` (Vite recarga) y `src/backend/` (Flask se reinicia). Cambios en `package.json`, `package-lock.json`, `vite.config.js` o `requirements.txt` reconstruyen la imagen. No reintroduzcas bind mounts de código (`.:/app`, `./src/frontend:/app`, `./src/backend:/app`): Compose Watch ya hace la sincronización y evita problemas de `node_modules` entre Windows y Linux. La única excepción es `./src/backend/migrations:/app/migrations` en los servicios `migrate` y `upgrade`, para que las revisiones generadas persistan en el host.

## 4. Convenciones de trabajo

- Ramas y commits con prefijo `feat/`, `fix/` o `docs/` (ver `README.md`). Ejemplo: `feat/login-github`, `docs: update README`.
- No hagas commits ni pushes salvo que se te pida explícitamente.
- `.env` está ignorado y **nunca** debe subirse; usa `.env.example` como plantilla.
- No ejecutes `docker compose down -v`, borres volúmenes ni elimines datos sin confirmación.
- No edites `node_modules/`, `dist/` ni `__pycache__/`; son artefactos generados.

## 5. Base de datos

- PostgreSQL 16 en el servicio `db`; datos persistentes en el volumen `pgdata`.
- Los modelos SQLAlchemy en `src/backend/models/` son la **única fuente de verdad** del esquema: un `.py` por tabla, exportados en `models/__init__.py`. `docs/database/schema.dbml` y `schema.svg` se conservan solo como documentación: al cambiar los modelos, actualízalos también para que no queden desfasados. `init.sql` sí se eliminó; no lo reintroduzcas.
- Flask-Migrate se inicializa en `src/backend/extensions.py` y se registra en `app.py` con `SQLALCHEMY_DATABASE_URI` (la misma `DATABASE_URL` o `POSTGRES_*`). El repositorio de revisiones es `src/backend/migrations/`, generado por `flask db init`; Flask-Migrate usa Alembic por dentro, así que ese `alembic.ini` no se gestiona a mano.
- Un volumen nuevo arranca sin tablas: aplica `docker compose run --rm upgrade`.
- Para cambios de esquema: editar modelos → `docker compose run --rm migrate -m "descripción"` → revisar la revisión → `docker compose run --rm upgrade` → `docker compose run --rm backend flask --app app:app db check`. Propón una migración antes de cualquier cambio destructivo con datos existentes.
- Los servicios `migrate` y `upgrade` usan el perfil `tools` y montan `./src/backend/migrations:/app/migrations`; no arrancan con `docker compose up`.
- `docker compose run` usa la imagen construida: reconstruye el backend si cambian dependencias o el `Dockerfile`.
- La API construye `DATABASE_URL` desde `POSTGRES_*` si no se define la variable; usa `psycopg` (v3).

## 6. Frontend

- React 19 + Vite 8 + Tailwind CSS v4 (mediante `@tailwindcss/vite`).
- Punto de entrada: `index.html` → `/src/frontend/main.jsx`.
- Estáticos servidos desde `public/` se referencian con ruta absoluta (`/icons.svg`); los importados desde `src/frontend/assets/` se referencian con `import`.
- En `.env` están `FRONTEND_URL` (origen permitido por CORS), `BACKEND_URL` (URL del servicio) y `VITE_API_URL` (URL que consume el frontend). Las tres se leen directamente desde `.env`; no hay mapeos entre ellas. Vite solo expone al navegador variables `VITE_*`.

## 7. Backend

- Aplicación Flask única en `src/backend/app.py`; dependencias en `src/backend/requirements.txt` (Flask, psycopg, SQLAlchemy, Flask-SQLAlchemy y Flask-Migrate entre otras).
- Endpoints actuales: `GET /health` y `GET /health/db`. CORS se configura con un único origen, `FRONTEND_URL` de `.env`; no existen `CORS_ORIGINS`, `VITE_ORIGINS` ni `VITE_FRONTEND_URL`.
- Las credenciales OAuth de GitHub y LinkedIn son solo variables de entorno previstas; no implementes flujos falsos ni las hardcodees.

## 8. Antes de dar por terminada una tarea

- [ ] `npm run lint` y `npm run build` pasan si se tocó el frontend.
- [ ] `docker compose config --quiet` pasa si se tocó Compose (con `.env` presente).
- [ ] `docker compose build` pasa si se cambiaron Dockerfiles o dependencias.
- [ ] `flask db check` pasa si se tocó el esquema, la revisión generada está en `src/backend/migrations/versions/` y `docs/database/schema.dbml` sigue coincidiendo con los modelos.
- [ ] `README.md` y este archivo siguen reflejando la estructura y las variables reales.
- [ ] `git status` no muestra archivos generados ni `.env` preparados para commit.
