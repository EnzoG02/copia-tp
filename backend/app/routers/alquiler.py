from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.deps import get_db
from app.models.alquiler import Alquiler
from app.models.vehiculo import Vehiculo
from app.schema import AlquilerBase, AlquilerCreate, AlquilerOut

router = APIRouter(prefix="/alquileres", tags=["Alquiler"])

@router.get("/", response_model=list[AlquilerOut])
def obtener_alquileres(db: Session = Depends(get_db)):
    stmt = select(Alquiler).order_by(Alquiler.id)
    rows= db.execute(stmt).scalars().all()

    return rows

@router.post("/", response_model=AlquilerOut)
def crear_alquiler(payload: AlquilerCreate, db: Session = Depends(get_db)):
    obj = Alquiler()
    obj.cliente_dni = payload.cliente_dni
    obj.empleado_dni = payload.empleado_dni
    obj.fechaDeGestion = payload.fechaDeGestion
    obj.fechaDelnicio = payload.fechaDelnicio
    obj.fechaFin = payload.fechaFin
    obj.vehiculo_patente = payload.vehiculo_patente
    
    db.add(obj)
    try:
        db.commit()
        
    except Exception  as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error al intentar crear el alquiler {e}")
    db.refresh(obj)
    return obj



