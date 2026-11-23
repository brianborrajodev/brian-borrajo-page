"""Extensiones Flask compartidas: ORM y migraciones."""

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from models.base import Base

# Se reutiliza la base declarativa propia para mantener un .py por tabla.
db = SQLAlchemy(model_class=Base)
migrate = Migrate()
