import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
        'Content-Type': 'application/json'
    } 
}
)

const getHealth = async()=>{
    const {data} = await apiClient.get('api/health')
    return {data}
}

export default apiClient

