import apiClient from "./apiClient"

// gett todos los alquileres

const getAlquileres = async()=>{
    const response = await apiClient.get('/alquileres')
    return response.data
}


export default getAlquileres