# TRABAJOPRACTICODAO-G21
Se realizará el desarrollo del trabajo práctico integrador de la materia Desarrollo de Aplicaciones con Objetos.
ReadMe contiene: Consignas generales del trabajo, desiciones de tecnologías, elección del tema, objetivos del sistema, Como probar el sistema.

#Consignas generales del trabajo:
Desarrollar	una	aplicación	de	gestión	completa	que	combine:	
Interfaz	de	usuario	(desktop	con	Tkinter,	Flet,	pyQt,	etc.	o	web	con	flask,	fastAPI,	django,	etc.	y	angular	o	react).
 Base	de	datos	relacional	(SQLite	o	MySQL).
 Operaciones	CRUD	(Altas,	Bajas,	Modificaciones,	Consultas).
 Validaciones	de	datos	y	consistencia	en	los	registros.
 Transacciones	operativas	(ventas,	compras,	alquileres,	turnos,	reservas,	etc.).
 Generación	de	reportes	detallados	y	estadísticos.	

 # Decisiones de tecnologías
 -  Se utilizará python para el backend con FASTAPI
 -  Se utilzará javascript para el frontend con Vite y React
 -  Se montará una base de datos sqlite


# Elección del tema: alquiler de vehículos:
Objetivos del sistema
1. Digitalizar y estandarizar el ciclo de alquiler: Unificar la administración
de empleados, clientes, vehículos (marcas/modelos), alquileres, cobros,
daños y mantenimientos en un solo sistema.
2. Asegurar disponibilidad real de la flota: Prevenir alquileres superpuestos
y bloquear vehículos deshabilitados o en mantenimiento.
3. Gestionar alquileres con trazabilidad completa: Registrar empleado,
cliente, vehículo, período, observaciones y precio acordado para cada
alquiler.
4. Registrar y controlar cobros: Soportar múltiples cobros por alquiler
(principal, multas/daños), con formas de pago y montos validados.
5. Administrar daños y multas: Registrar daños y multas asociados a un
alquiler, calcular impacto económico y, si aplica, disparar mantenimiento.
6. Planificar y registrar mantenimientos: Generar mantenimientos por
servicio (km) o daño, con fechas y costo, bloqueando la disponibilidad.
7. Proveer reportes de gestión: Ofrecer reportes de alquileres (por cliente,
vehículos más alquilados, por período) y facturación mensual.
8. Restringir el acceso al personal autorizado: Sistema exclusivo para
empleados con logueo básico y permisos mínimos.
9. Garantizar calidad e integridad de datos: Forzar unicidades (DNI,
patente), claves foráneas y validaciones de dominio.
10.Facilitar auditoría y seguimiento: Mantener fechas de alta/gestión e
historial consultable por cliente, vehículo y alquiler.
