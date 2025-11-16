from sqlalchemy import Boolean, Integer, String, ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

class Vehiculo(Base):
    __tablename__ = "Vehiculo"
    patente: Mapped[str]= mapped_column(String, primary_key=True, index=True)
    añoModelo: Mapped[int] =mapped_column(Integer, unique=False)
    añoIngreso: Mapped[int] =mapped_column(Integer, unique=False)
    kilometros: Mapped[float]= mapped_column(Float, default=0)
    precioPorDia: Mapped[float] = mapped_column(Float, default=0)
    color: Mapped[str] = mapped_column(String)
    disponibleHoy:Mapped[bool] = mapped_column(Boolean, default=True) #Refinar calculo de disponiblidad en la siguiente

    modelo_id: Mapped[int] = mapped_column(ForeignKey("Modelo.id"))

    modelo: Mapped["Modelo"] = relationship(
        back_populates="vehiculos"
    )
    alquileres: Mapped[list["Alquiler"]] = relationship(
        back_populates="vehiculo",
        cascade="all"
    )
