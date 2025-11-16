import { useCallback, useEffect, useState } from "react";
import getVehiculos from "../services/vehiculosService";

export const useVehiculos = ()=>{
    const [vehiculos, setVehiculos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const fetchVehiculos = useCallback(async ()=> {
        setLoading(true)
        setError(null)
        try{
            const data = await getVehiculos();
            setVehiculos(data);
            console.log("Hook de vehiculos obtuvo correctamente la info")
        }
        catch(e){
            setError(e)
            console.error('Error al carga los vehiculos', e.message)    
        }
        finally{
            setLoading(false)
        }
    }, [])

    useEffect(()=>{
        fetchVehiculos();

    },[fetchVehiculos])

    return {
        vehiculos, loading, error, fetchVehiculos}
}