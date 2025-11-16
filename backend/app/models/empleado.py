from sqlalchemy import Column, Integer, String
from app.db import Base

class Empleado(Base):
    __tablename__ = "Empleado"  # respeta el nombre exacto en la BD

    dni = Column(Integer, primary_key=True, index=True)
    nombreUsuario = Column(String, unique=True, index=True, nullable=False)
    nombre = Column(String, nullable=False)
    apellido = Column(String, nullable=False)
    fechaAlta = Column(String, nullable=False)      # ISO: YYYY-MM-DD
    password_hash = Column(String, nullable=False)
    permisos = Column(String, nullable=False, default="user")
