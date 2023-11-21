import api from '../lib/axios'

export default {
    create(data){
        //ya no utilizamos el token porque lo pusimos en axios.js
        //const token = localStorage.getItem('AUTH_TOKEN');

        //en post enviamos: url,data,token
        return api.post('/appointments',data)
    },
    getByDate(date){
        return api.get(`/appointments?date=${date}`)
    }
}