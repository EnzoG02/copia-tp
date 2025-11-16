from sqlalchemy import Boolean, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db import Base, engine
from .vehiculo import Vehiculo


class Modelo(Base):
    __tablename__ = "Modelo"
    id: Mapped[int]= mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(80), unique=False, index=True)
    habilitada: Mapped[bool] = mapped_column(default=True)
    stock: Mapped[int] = mapped_column(Integer, default=0, unique=False)

    marca_id: Mapped[int] = mapped_column(ForeignKey("Marca.id"), unique=False)
    marca: Mapped["Marca"] = relationship(
        back_populates= "modelos"
    )
    vehiculos: Mapped[list["Vehiculo"]] = relationship(
        back_populates="modelo",
        cascade="all, delete-orphan"
    )