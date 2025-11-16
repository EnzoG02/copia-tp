import apiClient from "./apiClient";


const getMarcas = async ()=>{
    const response = await apiClient.get("/marcas")
    return response.data
}



const getModelos = async ()=>{
    const response = await apiClient.get("/modelos")
    return response.data
}

const mymService = {getMarcas, getModelos}

export default mymService