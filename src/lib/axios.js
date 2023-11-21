import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api  

//que podemos hace para no repetir el token
//interceptors
//interceptors para el request, estos son como un middleware
// edicion de datos en encabezados, gestios de errores entre otras cosas
api.interceptors.request.use((req, res) =>{
    const token = localStorage.getItem('AUTH_TOKEN');
    //si hay un token envialo siempre
    if(token){
            req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})