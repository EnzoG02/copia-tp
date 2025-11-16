from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.deps import get_db
from app.models.vehiculo import Vehiculo
from app.schema import VehiculoBase, VehiculoCreate, VehiculoOut

router = APIRouter(prefix="/vehiculos", tags=["Vehiculos"])

@router.get("/", response_model=list[VehiculoOut])
def obtener_vehiculos(db: Session= Depends(get_db)):
    stmt= select(Vehiculo)
    rows= db.execute(stmt).scalars().all()
    return rows

@router.get("/{patente}", response_model=VehiculoOut)
def obtener_vehiculo_patente(patente:str, db: Session= Depends(get_db)):
    obj = db.get(Vehiculo,patente)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return obj

@router.post("/", response_model=VehiculoOut)
def crear_vehiculo(payload:VehiculoCreate, db: Session =  Depends(get_db)):
    obj= Vehiculo()
    obj.patente = payload.patente
    obj.añoIngreso = payload.añoIngreso
    obj.añoModelo = payload.añoModelo
    obj.color = payload.color
    obj.disponibleHoy = payload.disponibleHoy
    obj.kilometros = payload.kilometros
    obj.modelo_id = payload.modelo_id
    obj.precioPorDia = payload.precioPorDia

    db.add(obj)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail=f"Error al agregar el vehículo {e}")
    db.refresh(obj)
    return obj
