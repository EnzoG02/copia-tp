import apiClient from "./apiClient";

const getVehiculos = async()=>{
    const response = await apiClient.get('/vehiculos')
    return response.data
}

export default getVehiculos;