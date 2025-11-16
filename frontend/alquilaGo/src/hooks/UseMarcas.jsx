import { useEffect, useState, useCallback } from "react";
import mymService from "../services/mYmService";

export default function useMarcas(){
    const[marcas, setMarcas] = useState([])
    const[error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchMarcas = useCallback(async()=>{
        setLoading(true)
        setError(null)
        try{
            const data = await mymService.getMarcas();
            setMarcas(data)
            setError(null)
            console.log("Marcas obtenidas correctamente")
        }
        catch(e){
            console.error("Ocurrió un errror al obtener las marcas", e.message)
            setError(e)
        }
        finally{
            setLoading(false)
        }
    
    }, [])
    useEffect(()=>{
        fetchMarcas();
    }, [fetchMarcas])

    return {marcas, loading, error, fetchMarcas}
}

