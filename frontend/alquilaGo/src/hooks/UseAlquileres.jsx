import { useCallback, useEffect, useState } from "react";
import getAlquileres from '../services/alquileresService.js'



export const useAlquileres = () =>{
    const [alquileres, setAlquileres] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const fetchAlquileres = useCallback(async ()=> {
        setLoading(true)
        setError(null)
        try{
            const data = await getAlquileres();
            setAlquileres(data);
            console.log("Hook de alquileres obtuvo correctamente la info")
        }
        catch(e){
            setError(e)
            console.error('Error al carga los alquileres', e.message)    
        }
        finally{
            setLoading(false)
        }
    }, [])

    useEffect(()=>{
        fetchAlquileres();

    },[fetchAlquileres])

    return {
        alquileres, loading, error, fetchAlquileres}
    }
