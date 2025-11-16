import apiClient from "./apiClient";

const getClientes = async()=>{
    const response = await apiClient.get('/clientes')
    return response.data
}


export default getClientes