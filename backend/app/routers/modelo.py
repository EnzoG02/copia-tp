from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.deps import get_db
from app.models.modelo import Modelo 
from app.schema import ModeloCreate, ModeloBase, ModeloOut

router = APIRouter(prefix="/modelos", tags=["modelos"])

@router.get("/", response_model=list[ModeloOut])
def obtener_modelos(db: Session = Depends(get_db)):
    stmt = select(Modelo).order_by(Modelo.id)
    rows = db.execute(stmt).scalars().all()
    return rows

@router.get("/{modelo_id}", response_model=ModeloOut)
def obtener_modelo_id(modelo_id:int, db: Session = Depends(get_db)):
    obj = db.get(Modelo, modelo_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return obj
@router.post("/", response_model=ModeloCreate)
def crear_modelo(payload: ModeloCreate, db: Session=Depends(get_db)):
    obj = Modelo()
    obj.nombre = payload.nombre
    obj.marca_id = payload.marca_id #AÑADIR VALIDACIÓN EN REFINAMIENTO 
    obj.habilitada = payload.habilitada
    obj.stock = payload.stock #AÑADIR CONTADOR EN REFINAMIENTO  CON LOS VEHÍCULOS
    db.add(obj)
    try:
        db.commit()    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error al insertar el modelo{e}")
    db.refresh(obj)
    return obj
