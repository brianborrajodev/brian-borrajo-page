# ADR-001: SQLAlchemy y Flask-Migrate como único modelo del esquema

- **Estado:** Aceptada
- **Fecha:** 2026-11-22

## Contexto

El esquema de PostgreSQL estaba definido dos veces: `docs/database/init.sql` creaba las tablas al iniciar el volumen por primera vez y `docs/database/schema.dbml` (con su `schema.svg`) lo documentaba. No había sistema de migraciones: cualquier cambio destructivo obligaba a borrar el volumen `pgdata` y perder los datos.

## Decisión

- Los modelos de SQLAlchemy en `src/backend/models/` son la **única fuente de verdad**: un archivo `.py` por tabla, todos exportados desde `models/__init__.py`.
- `src/backend/extensions.py` crea la instancia de SQLAlchemy sobre esa base declarativa y registra Flask-Migrate en la aplicación Flask.
- Las migraciones se gestionan con la CLI de Flask-Migrate (`flask db init`, `flask db migrate`, `flask db upgrade`, ...). Se eliminó toda la configuración independiente de Alembic: no hay `alembic.ini` en la raíz ni se invoca el comando `alembic` directamente.
- `src/backend/migrations/` es el repositorio generado por `flask db init`; Flask-Migrate usa Alembic internamente, así que ese directorio contiene un `alembic.ini` y un `env.py` propios que no se editan a mano.
- Se elimina `docs/database/init.sql` y se retira su montaje de `docker-compose.yml`. El volumen existente se recrea para que las tablas antiguas no convivan con las creadas por la migración inicial.
- Se conservan `docs/database/schema.dbml` y `docs/database/schema.svg` como documentación del modelo, no como fuente de verdad: hay que actualizarlos a mano cuando cambien los modelos.

## Consecuencias

### Positivas

- Un solo lugar que define cada tabla, sus columnas, restricciones y relaciones.
- Los cambios de esquema quedan versionados y son reversibles desde la CLI de Flask, integrada con la configuración de la app.
- `flask db check` detecta divergencias entre los modelos y la base de datos.

### Negativas

- Hay que ejecutar la migración de forma explícita al crear un volumen nuevo; PostgreSQL arranca sin tablas.
- El DBML y el SVG hay que mantenerlos sincronizados manualmente; `flask db check` no detecta si se quedan desfasados.

## Flujo de trabajo

Los servicios `migrate` y `upgrade` (perfil `tools`) ofrecen comandos cortos y montan `src/backend/migrations` para que las revisiones generadas persistan en el host.

```bash
# Crear las tablas en un volumen nuevo
docker compose run --rm upgrade

# Tras editar los modelos, generar y revisar una nueva revisión
# (y actualizar docs/database/schema.dbml y schema.svg)
docker compose run --rm migrate -m "descripcion"
docker compose run --rm upgrade
docker compose run --rm backend flask --app app:app db check
```
