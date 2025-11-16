# backend/app/models/cliente.py
from sqlalchemy import Column, Integer, String  
from app.db import Base
from sqlalchemy.orm import relationship, Mapped                          

class Cliente(Base):
    __tablename__ = "Cliente"  

    dni = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    apellido = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    telefono = Column(String, nullable=True)
    fechaAlta = Column(String, nullable=False) 

    alquileres: Mapped[list["Alquiler"]] = relationship(
        back_populates="cliente",
        cascade="all"
    )


