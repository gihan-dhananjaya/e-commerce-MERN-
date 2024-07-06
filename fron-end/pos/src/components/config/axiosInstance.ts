import axios,{AxiosInstance,InternalAxiosRequestConfig} from "axios";
import BASE_URL from "./apiConfig";

const instance:AxiosInstance = axios.create({
    baseURL:BASE_URL
});

instance.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
        
        let token = document.cookie.split(';').find(record=>record.startsWith('token=')); 
        
        token = token?.split('=')[1]
        config.headers.Authorization=token;
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default instance;