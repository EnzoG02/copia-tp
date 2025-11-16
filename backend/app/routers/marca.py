from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.deps import get_db
from app.models import Marca
from app.schema import MarcaCreate, MarcaOut, MarcaUpdate


router = APIRouter(prefix="/marcas", tags=["marcas"])

@router.get("/", response_model=list[MarcaOut])
def listar_marcas(db: Session= Depends(get_db)):
    stmt = select(Marca).order_by(Marca.id)
    rows = db.execute(stmt).scalars().all()
    return rows

@router.get("/{marca_id}")
def obtener_marca_id(marca_id:int, db: Session= Depends(get_db)):
    obj = db.get(Marca, marca_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return obj
@router.post("/", response_model=MarcaOut, status_code= status.HTTP_201_CREATED)
def crear_marca(payload: MarcaCreate, db:Session = Depends(get_db)):
    obj = Marca()
    obj.nombre = payload.nombre
    obj.habilitada = payload.habilitada
    db.add(obj)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error al insertar: {e}")
    db.refresh(obj)
    return obj
