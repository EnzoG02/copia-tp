from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db import Base, engine
from .modelo import Modelo

class Marca(Base):
    __tablename__="Marca"
    id:Mapped[int] = mapped_column(primary_key=True, index=True)
    nombre: Mapped[str]=mapped_column(String, unique=True, index=True)
    habilitada: Mapped[bool] = mapped_column(default=True)

    modelos: Mapped[list["Modelo"]]= relationship(
        back_populates="marca",
        cascade="all, delete-orphan"
    )