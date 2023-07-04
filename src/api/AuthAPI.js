import api from '../lib/axios'

export default {
    register(data){
        return api.post('/auth/register',data)
    },
    verifyAccount(token){
        return api.get(`/auth/verify/${token}`)
    },
    login(data){
        return api.post('/auth/login',data)
    },
    auth(){
        //cuando es una peticion get el segundo parametro son las configuraciones no los datos
        //get ruta,config
        //post ruta,datos,config
        const token = localStorage.getItem('AUTH_TOKEN');
        return api.get('/auth/user',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    }
}