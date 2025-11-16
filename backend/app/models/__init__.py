from .marca import Marca
from .modelo import Modelo
from .alquiler import Alquiler
from .vehiculo import Vehiculo
from .cliente import Cliente
from .empleado import Empleado
from app.db import Base
__all__ =["Marca", "Modelo", "Vehiculo", "Alquiler","Cliente", "Empleado","Base"]

