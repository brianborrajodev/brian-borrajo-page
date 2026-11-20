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
| Base de datos | MongoDB |
| Entorno de desarrollo | Docker (Dockerfile) |
| Autenticación | OAuth con LinkedIn y GitHub |

## Estructura del proyecto

```
.
├── docs/
│   ├── design/      # Diseño de Figma
│   └── database/    # Diagrama UML de la base de datos
├── public/          # Archivos estáticos
├── src/
│   ├── frontend/    # Aplicación React (Vite)
│   └── backend/     # API Flask
├── .env             # Variables de entorno (no se sube al repositorio)
├── Dockerfile
└── README.md
```

> La estructura puede evolucionar durante el desarrollo.

## Puesta en marcha

### Requisitos previos

- [Docker](https://www.docker.com/)
- Node.js y npm (versión por definir) si se ejecuta el frontend fuera de Docker
- Python 3 (versión por definir) si se ejecuta el backend fuera de Docker

### Instalación

```bash
# 1. Clonar el repositorio
git clone <URL-DEL-REPOSITORIO>
cd <NOMBRE-DE-LA-CARPETA>

# 2. Crear el archivo de variables de entorno
cp .env.example .env   # pendiente: crear .env.example
```

### Ejecución

> Pendiente de completar cuando estén definidos los scripts y el entorno Docker.

```bash
# Frontend
cd src/frontend
npm install
npm run dev

# Backend
cd src/backend
# comandos por definir
```

## Variables de entorno

Las variables de entorno viven en un archivo `.env` en la raíz del proyecto. **Nunca debe subirse al repositorio** (asegúrate de que está en `.gitignore`).

Variables previstas (por definir):

| Variable | Descripción |
| --- | --- |
| `MONGODB_URI` | Cadena de conexión a MongoDB |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Credenciales OAuth de GitHub |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | Credenciales OAuth de LinkedIn |
| `SECRET_KEY` | Clave secreta de Flask |

## Documentación

- [Diseño (Figma)](docs/design)
- [Base de datos (UML)](docs/database)

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