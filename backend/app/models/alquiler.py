from sqlalchemy import String, Integer, Date, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db import Base
from datetime import date

class Alquiler(Base):
    __tablename__ = "Alquiler"

    id : Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    cliente_dni : Mapped[int] = mapped_column(ForeignKey("Cliente.dni"), unique=False)
    empleado_dni : Mapped[int] = mapped_column(Integer, unique= False)
    vehiculo_patente : Mapped[str] = mapped_column(ForeignKey("Vehiculo.patente"), unique=False)
    fechaDeGestion : Mapped[date] = mapped_column(Date)
    fechaDelnicio : Mapped[date] = mapped_column(Date)
    fechaFin : Mapped[date] = mapped_column(Date)

    vehiculo : Mapped["Vehiculo"] = relationship(
        back_populates= "alquileres"
    )
    cliente: Mapped["Cliente"] = relationship(
        back_populates="alquileres"
    )
