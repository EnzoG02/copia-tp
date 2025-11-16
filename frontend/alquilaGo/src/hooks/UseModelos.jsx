import { useState, useEffect, useCallback } from "react";
import mymService from "../services/mYmService";

export default function useModelos(){
    const [modelos, setModelos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchModelos = useCallback(async ()=>{

        setLoading(true)
        setError(null)

        try{
            const data = await mymService.getModelos()
            setModelos(data)
            console.log("Hook de modelos obtuvo correctamente la info")
        }
        catch(e){
            console.error("Error al obtener los modelos", e.message)
            setError(error)
        }
        finally{
            setLoading(false)
        }

    }, [])

    useEffect(()=>{
        fetchModelos();
    }, [fetchModelos])

    return {modelos, loading, error, fetchModelos}
}