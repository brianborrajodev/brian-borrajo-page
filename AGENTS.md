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
│   ├── database/        # schema.dbml (UML) + init.sql (creación real)
│   └── ADR-*.md         # Decisiones de arquitectura (ADR adicionales)
├── public/              # Estáticos de Vite (/icons.svg, /favicon.svg)
├── src/
│   ├── frontend/        # React: App.jsx, main.jsx, index.css, assets/
│   └── backend/         # Flask: app.py, requirements.txt, Dockerfile
├── Dockerfile           # Imagen del frontend
├── docker-compose.yml
├── .env.example
├── README.md
└── AGENTS.md
```

Reglas de ubicación:

- Lo que pertenece a la raíz va en la raíz: `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `public/`, `Dockerfile` y `docker-compose.yml`.
- El código React vive **directamente** en `src/frontend/`. No crees `src/frontend/src/`.
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
```

El stack se arranca con `--watch`: Compose sincroniza `src/frontend/`, `public/` e `index.html` (Vite recarga) y `src/backend/` (Flask se reinicia). Cambios en `package.json`, `package-lock.json`, `vite.config.js` o `requirements.txt` reconstruyen la imagen. No reintroduzcas bind mounts de código (`.:/app`, `./src/frontend:/app`, `./src/backend:/app`): Compose Watch ya hace la sincronización y evita problemas de `node_modules` entre Windows y Linux.

## 4. Convenciones de trabajo

- Ramas y commits con prefijo `feat/`, `fix/` o `docs/` (ver `README.md`). Ejemplo: `feat/login-github`, `docs: update README`.
- No hagas commits ni pushes salvo que se te pida explícitamente.
- `.env` está ignorado y **nunca** debe subirse; usa `.env.example` como plantilla.
- No ejecutes `docker compose down -v`, borres volúmenes ni elimines datos sin confirmación.
- No edites `node_modules/`, `dist/` ni `__pycache__/`; son artefactos generados.

## 5. Base de datos

- PostgreSQL 16 en el servicio `db`; datos persistentes en el volumen `pgdata`.
- `docs/database/schema.dbml` es la documentación del modelo y `docs/database/init.sql` la fuente de las tablas reales. **Mantén ambos sincronizados**.
- `init.sql` solo se ejecuta al crear el volumen por primera vez. Todavía no hay sistema de migraciones: si hay que alterar una tabla con datos existentes, propón una migración antes de aplicar cambios destructivos.
- La API construye `DATABASE_URL` desde `POSTGRES_*` si no se define la variable; usa `psycopg` (v3).

## 6. Frontend

- React 19 + Vite 8 + Tailwind CSS v4 (mediante `@tailwindcss/vite`).
- Punto de entrada: `index.html` → `/src/frontend/main.jsx`.
- Estáticos servidos desde `public/` se referencian con ruta absoluta (`/icons.svg`); los importados desde `src/frontend/assets/` se referencian con `import`.
- El frontend solo recibe variables de entorno que empiecen por `VITE_` (p. ej. `VITE_API_URL`).

## 7. Backend

- Aplicación Flask única en `src/backend/app.py`; dependencias en `src/backend/requirements.txt`.
- Endpoints actuales: `GET /health` y `GET /health/db`. CORS configurable con `CORS_ORIGINS`.
- Las credenciales OAuth de GitHub y LinkedIn son solo variables de entorno previstas; no implementes flujos falsos ni las hardcodees.

## 8. Antes de dar por terminada una tarea

- [ ] `npm run lint` y `npm run build` pasan si se tocó el frontend.
- [ ] `docker compose config --quiet` pasa si se tocó Compose (con `.env` presente).
- [ ] `docker compose build` pasa si se cambiaron Dockerfiles o dependencias.
- [ ] `README.md` y este archivo siguen reflejando la estructura y las variables reales.
- [ ] `git status` no muestra archivos generados ni `.env` preparados para commit.
