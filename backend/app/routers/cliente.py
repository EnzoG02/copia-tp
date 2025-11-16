from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, exc
from app.deps import get_db
from app.models.cliente import Cliente
from app.schema import ClienteCreate, ClienteUpdate, ClienteOut  # ajustá ruta si usás schemas/cliente.py

router = APIRouter(prefix="/clientes", tags=["clientes"])

@router.post("", response_model=ClienteOut, status_code=status.HTTP_201_CREATED)
def crear_cliente(payload: ClienteCreate, db: Session = Depends(get_db)):
    # Duplicados por dni o email
    existente = (
        db.query(Cliente)
        .filter(or_(Cliente.dni == payload.dni, Cliente.email == payload.email))
        .first()
    )
    if existente:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cliente con ese DNI o email ya existe",
        )

    cliente = Cliente(
        dni=payload.dni,
        nombre=payload.nombre,
        apellido=payload.apellido,
        email=payload.email,
        telefono=payload.telefono,
        fechaAlta=payload.fechaAlta,
    )
    db.add(cliente)
    try:
        db.commit()
    except exc.IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Violación de unicidad (DNI/Email)",
        )
    db.refresh(cliente)
    return cliente

@router.get("", response_model=list[ClienteOut])
def listar_clientes(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return db.query(Cliente).offset(skip).limit(limit).all()

@router.get("/{dni}", response_model=ClienteOut)
def obtener_cliente(dni: int, db: Session = Depends(get_db)):
    cli = db.query(Cliente).get(dni)
    if not cli:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No encontrado")
    return cli

@router.patch("/{dni}", response_model=ClienteOut)
def actualizar_cliente(dni: int, payload: ClienteUpdate, db: Session = Depends(get_db)):
    cli = db.query(Cliente).get(dni)
    if not cli:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No encontrado")

    data = payload.model_dump(exclude_unset=True)
    # Si viene email, chequear unicidad
    if "email" in data and data["email"] and data["email"] != cli.email:
        if db.query(Cliente).filter(Cliente.email == data["email"]).first():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email ya registrado")

    for k, v in data.items():
        setattr(cli, k, v)

    try:
        db.commit()
    except exc.IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Violación de unicidad")
    db.refresh(cli)
    return cli

@router.delete("/{dni}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_cliente(dni: int, db: Session = Depends(get_db)):
    cli = db.query(Cliente).get(dni)
    if not cli:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No encontrado")
    db.delete(cli)
    db.commit()
    return None
