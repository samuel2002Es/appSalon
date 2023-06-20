import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import ServicesAPI from '../api/ServicesAPI'

export const useServicesStore = defineStore('services', ()=>{
    const services = ref([])
    onMounted(async()=>{
        try {
            const { data } = await ServicesAPI.all()
            services.value = data
            //console.log(data)
        } catch (error) {
            console.error(error)
        }
    })
    return {
        services
    }
})