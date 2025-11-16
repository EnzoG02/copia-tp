from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware


from .deps import get_db
from .db import engine


app = FastAPI(title="TP DAO TEMA 3 API ", version="0.0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:5173'],
    allow_credentials = True,
    allow_methods =['*'],
    allow_headers = ['*']
)


@app.get("/health")
def health():
    return{"status: ok"}

@app.get("/debug/db-info")
def db_info(db: Session = Depends(get_db)):
    tables = db.execute(text("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")).all()
    tables_names = [t[0] for t in tables]

    sample_counts = {}
    for tname in tables_names:
        try:
            cnt = db.execute(text(f'SELECT COUNT(*) FROM "{tname}"')).scalar_one()
            sample_counts[tname] = cnt
        except Exception:
            sample_counts[tname] = "error"

    return {
        "database_path": str(engine.url.database),  # ruta absoluta usada
        "tables": tables_names,
        "counts": sample_counts,
    }   


# Routers de negocio

from .routers import marca as marca_router
from .routers import modelo as modelo_router
from .routers import vehiculo as vehiculo_router
from .routers import cliente as clientes_router
from .routers import empleado as Empleado_router
from .routers import alquiler as alquiler_router
app.include_router(marca_router.router)
app.include_router(modelo_router.router)
app.include_router(vehiculo_router.router)
app.include_router(clientes_router.router)
app.include_router(Empleado_router.router)
app.include_router(alquiler_router.router)