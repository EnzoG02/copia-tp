import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Dashboard from './pages/Dashboard'
import CrearAlquiler from './features/alquileres/CrearAlquiler'
import Alquileres from './features/alquileres/Alquileres'
import Empleados from './features/empleados/Empleados'
import Clientes from './features/clientes/Clientes'
import Vehiculos from './features/vehiculos/Vehiculos'

export default function App(){
  return(
    <Routes>
      <Route element={<AppLayout/>}>
        <Route path= "/" element={<Dashboard/>}/>
        <Route path='/alquileres' element={<Alquileres/>}/>
        <Route path='/alquileres/new' element={<CrearAlquiler/>}/>
        <Route path='/empleados' element={<Empleados/>}/>
        <Route path='/clientes' element={<Clientes/>}/>
        <Route path='/vehiculos' element={<Vehiculos/>}/>
      </Route>
       
    </Routes>
  )
}