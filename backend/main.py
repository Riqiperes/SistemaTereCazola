from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from pathlib import Path

# Ruta ABSOLUTA para que coincida con el volumen del compose
DB_PATH = Path("/app/data/tere.db")
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="Tere Cazola QR API")

# Para el enfoque de PROXY no necesitas CORS (un solo origen 5173).
# Aun así, lo dejo laxo por si lo pruebas con dos orígenes.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # usa allow_origin_regex si quieres filtrar por dominio
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,      # importante que sea False si usas "*"
)

def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ---- Inicialización de la BD ----
with get_conn() as c:
    c.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first TEXT NOT NULL COLLATE NOCASE,
            last  TEXT NOT NULL COLLATE NOCASE,
            points INTEGER NOT NULL DEFAULT 0,
            UNIQUE(first, last)
        );
        """
    )
    c.execute(
        "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_nocase ON users(first, last);"
    )
    c.commit()

class ScanIn(BaseModel):
    first: str
    last: str

@app.post("/api/scan")
def scan_user(payload: ScanIn):
    try:
        first = payload.first.strip()
        last = payload.last.strip()
        if not first or not last:
            raise HTTPException(status_code=400, detail="Nombre y apellido son requeridos")

        with get_conn() as c:
            cur = c.execute(
                """
                UPDATE users
                SET points = points + 1
                WHERE first = ? AND last = ?;
                """,
                (first, last),
            )
            if cur.rowcount == 0:
                c.execute(
                    "INSERT OR IGNORE INTO users(first, last, points) VALUES (?,?,1);",
                    (first, last),
                )
            c.commit()
            row = c.execute(
                "SELECT first, last, points FROM users WHERE first = ? AND last = ?",
                (first, last),
            ).fetchone()
            return {"ok": True, "user": dict(row)}
    except HTTPException:
        raise
    except Exception as e:
        # Útil durante pruebas: devuelve el detalle del error
        raise HTTPException(status_code=500, detail=f"{type(e).__name__}: {e}")

@app.get("/api/users")
def list_users():
    with get_conn() as c:
        rows = c.execute(
            "SELECT first, last, points FROM users ORDER BY points DESC, last, first"
        ).fetchall()
        return {"ok": True, "users": [dict(r) for r in rows]}

@app.get("/api/stats")
def stats():
    with get_conn() as c:
        total_scans = c.execute(
            "SELECT COALESCE(SUM(points),0) AS s FROM users"
        ).fetchone()[0]
        total_users = c.execute(
            "SELECT COUNT(*) FROM users"
        ).fetchone()[0]
        return {"ok": True, "total_scans": total_scans, "total_users": total_users}
