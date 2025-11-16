from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, exc
from app import schema as sch

from app.deps import get_db
from app.models.empleado import Empleado
from app.schema import EmpleadoCreate, EmpleadoUpdate, EmpleadoOut

router = APIRouter(prefix="/empleados", tags=["empleados"])

@router.post("", response_model=sch.EmpleadoOut, status_code=status.HTTP_201_CREATED)
def crear_empleado(payload: sch.EmpleadoCreate, db: Session = Depends(get_db)):
    existente = db.query(Empleado).filter(
        (Empleado.dni == payload.dni) | (Empleado.nombreUsuario == payload.nombreUsuario)
    ).first()
    if existente:
        raise HTTPException(status_code=409, detail="Empleado ya existe (dni o nombreUsuario).")

    obj = Empleado(**payload.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("", response_model=list[sch.EmpleadoOut])
def listar_empleados(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return db.query(Empleado).offset(skip).limit(limit).all()

@router.get("/{dni}", response_model=sch.EmpleadoOut)
def obtener_empleado(dni: int, db: Session = Depends(get_db)):
    obj = db.query(Empleado).get(dni)
    if not obj:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return obj

@router.patch("/{dni}", response_model=sch.EmpleadoOut)
def actualizar_empleado(dni: int, payload: sch.EmpleadoUpdate, db: Session = Depends(get_db)):
    obj = db.query(Empleado).get(dni)
    if not obj:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")

    data = payload.dict(exclude_unset=True)

    if "nombreUsuario" in data:
        dup = db.query(Empleado).filter(
            Empleado.nombreUsuario == data["nombreUsuario"],
            Empleado.dni != dni
        ).first()
        if dup:
            raise HTTPException(status_code=409, detail="nombreUsuario ya está en uso")

    for k, v in data.items():
        setattr(obj, k, v)

    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{dni}", status_code=status.HTTP_204_NO_CONTENT)
def borrar_empleado(dni: int, db: Session = Depends(get_db)):
    emp = db.get(Empleado, dni)
    if not emp:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")

    try:
        db.delete(emp)
        db.commit()
    except IntegrityError:
        db.rollback()
        # Hay registros que referencian a este empleado (p.ej. Alquiler)
        raise HTTPException(
            status_code=409,
            detail="No se puede eliminar: el empleado tiene datos relacionados (p.ej. alquileres).",
        )