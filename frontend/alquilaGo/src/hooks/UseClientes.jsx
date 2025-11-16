import { useCallback, useEffect, useState } from "react";
import getClientes from '../services/clientesService'


export const useClientes = ()=>{
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchClientes = useCallback(async ()=>{
        setLoading(true)
        setError(null)
        try{
            const data = await getClientes();
            setClientes(data)
            console.log("Hook de clientes obtuvo correctamente la info")

        }
        catch(e){
            setError(e)
            console.error("Error al cargar los clientes", e.message)
        }
        finally{
            setLoading(false)
        }
    }, [])

    useEffect(()=>{
        fetchClientes();
    }, [fetchClientes])

    return {clientes, loading, error, fetchClientes}

}