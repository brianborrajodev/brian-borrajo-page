"""API Flask del portfolio personal."""

import os

import psycopg
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-only-change-me")

cors_origins = [
    origin.strip()
    for origin in os.environ.get("CORS_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]
CORS(app, origins=cors_origins)


def get_database_url() -> str:
    """Devuelve la URL de PostgreSQL, construyéndola desde las variables POSTGRES_*."""
    if database_url := os.environ.get("DATABASE_URL"):
        return database_url

    user = os.environ.get("POSTGRES_USER", "portfolio")
    password = os.environ.get("POSTGRES_PASSWORD", "portfolio")
    host = os.environ.get("POSTGRES_HOST", "db")
    port = os.environ.get("POSTGRES_PORT", "5432")
    database = os.environ.get("POSTGRES_DB", "portfolio")
    return f"postgresql://{user}:{password}@{host}:{port}/{database}"


@app.get("/health")
def health():
    return jsonify(status="ok")


@app.get("/health/db")
def health_db():
    """Comprueba que la API puede conectarse a PostgreSQL."""
    try:
        with psycopg.connect(get_database_url(), connect_timeout=3) as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
    except psycopg.Error as exc:
        return jsonify(status="error", detail=str(exc)), 503

    return jsonify(status="ok", database="postgresql")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")))
