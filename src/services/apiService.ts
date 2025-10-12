import axios from "axios";
import {baseURL} from "./urls";

const apiService = axios.create({baseURL})

apiService.interceptors.request.use(request=>{
    request.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODg1NmUzMjQzODk3M2UyYzIxOGVmOWJiNjRiMmQ0YSIsIm5iZiI6MTc1NjMwMTI0Mi44MjgsInN1YiI6IjY4YWYwN2JhYTBjNDkyNzc1NjM5MDgzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0RTPvnG54xFXzcVnUPNJvwBc-wZ-TiWbsALLqiYb9ec`
    return request
})

export {apiService}