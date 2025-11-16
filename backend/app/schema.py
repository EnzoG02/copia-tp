from typing import Optional
from datetime import date
from pydantic import Field, BaseModel
from pydantic import BaseModel, EmailStr, Field, ConfigDict  # <-- acá está EmailStr

#Marca

class MarcaBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=80)
    habilitada: bool = True

class MarcaCreate(MarcaBase):
    pass

class MarcaUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=1, max_length=80)
    habilitada: Optional[bool] = None

class MarcaOut(MarcaBase):
    id: int
    modelos: list["ModeloOut"] = []
    class Config:
        from_attributes = True
class MarcaSimpleOut(MarcaBase): # este es para la salida en modelos, si devuelve la marca entera se hace un bucle infinito
    id: int
    class Config:
        from_attributes = True

#Modelo, le usmos la misma base

class ModeloBase(BaseModel):
    nombre: str= Field(..., min_length=1, max_length=180)
    habilitada: bool = True
    stock: int = 0
    marca_id: int 

class ModeloCreate(ModeloBase):
    marca_id : int

class ModeloUpdate(BaseModel):
    nombre: Optional[str] = Field(None,  max_length=180)
    stock: Optional[int] = None

class ModeloOut(ModeloBase):
    id:int
    marca:"MarcaSimpleOut"

    class Config:
        from_attributes = True
class ModeloSimpleOut(ModeloBase):
    id: int
    class Config:
        from_attributes= True
##Vehculo

class VehiculoBase(BaseModel):
    patente: str = Field(..., min_length=6, max_length=12)
    añoModelo:int
    añoIngreso:int
    kilometros: float 
    precioPorDia: float 
    color: str= Field(..., min_length=4, max_length=15)
    disponibleHoy: bool
    modelo_id: int
class VehiculoCreate(VehiculoBase):
    modelo_id: int
class VehiculoOut(VehiculoBase):
    patente: str
    modelo: "ModeloSimpleOut"
class VehiculoSimpleOut(VehiculoBase):
    patente: str
    class Config:
        from_attributes: True
#hacer el update de vehiculos que  sea dinámico y unirlo con lo de modelos el stoc





##CLIENTE
class ClienteBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=80)
    apellido: str = Field(..., min_length=1, max_length=80)
    email: EmailStr
    telefono: Optional[str] = None

class ClienteCreate(ClienteBase):
    dni: int
    fechaAlta: str
class ClienteUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=1, max_length=80)
    apellido: Optional[str] = Field(None, min_length=1, max_length=80)
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None

class ClienteOut(ClienteBase):
    dni: int
    fechaAlta: str
 #
    class Config:
        from_attributes = True  
class ClienteSimpleOut(ClienteBase):
    dni:int
    nombre: str
    apellido: str
    class Config:
        from_attributes = True
## EMPLEADO
# -------- EMPLEADO SCHEMAS --------
from pydantic import BaseModel
from typing import Optional

# -------- Empleado --------
class EmpleadoBase(BaseModel):
    nombreUsuario: str
    nombre: str
    apellido: str
    fechaAlta: str            
    password_hash: str
    permisos: str = "user"

    class Config:
        orm_mode = True

class EmpleadoCreate(EmpleadoBase):
    dni: int

class EmpleadoUpdate(BaseModel):
    nombreUsuario: Optional[str] = None
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    fechaAlta: Optional[str] = None
    password_hash: Optional[str] = None
    permisos: Optional[str] = None

    class Config:
        orm_mode = True

class EmpleadoOut(EmpleadoBase):
    dni: int

#Alquiler

class AlquilerBase(BaseModel):
    cliente_dni: int 
    empleado_dni: int
    fechaDeGestion: date
    fechaFin: date
    fechaDelnicio: date
    vehiculo_patente: str = Field(..., min_length=6, max_length=12)
class AlquilerCreate(AlquilerBase):
    pass

class AlquilerOut(AlquilerBase):
    id: int
    vehiculo: VehiculoSimpleOut
    cliente: ClienteSimpleOut
class AlquilerSimpleOut(AlquilerBase):
    id: int
    vehiculo_patente: str
    
EmpleadoOut.model_rebuild()
MarcaOut.model_rebuild()
ModeloOut.model_rebuild()
VehiculoOut.model_rebuild()
AlquilerOut.model_rebuild()
ClienteOut.model_rebuild()