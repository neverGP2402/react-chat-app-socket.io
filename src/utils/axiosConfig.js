import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8000"
})

instance.interceptors.response.use((res)=> {
    const {data} = res
    return data
})

export default instance