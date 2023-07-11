import api from '../lib/axios'

export default {
    create(data){
        const token = localStorage.getItem('AUTH_TOKEN');

        //en post enviamos: url,data,token
        return api.post('/appointments',data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    }
}