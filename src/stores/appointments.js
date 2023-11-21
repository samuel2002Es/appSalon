import {defineStore} from 'pinia'
import { ref, computed, onMounted, inject, watch } from 'vue'
import { useRouter } from 'vue-router'

import AppointmentAPI from '../api/AppointmentAPI'
import { converToISO } from '../helpers/date.js'
export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const appointmentsByDate = ref([])

    const toast = inject('toast');

    const router = useRouter()

    onMounted(()=>{
        const startHour = 10
        const endHour = 19
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ":00")        
        }
    })
    watch(date,async()=>{
        time.value = ''
        if (date.value=== '') return
        //obtenemos las citas
        const {data} = await AppointmentAPI.getByDate(date.value)
        appointmentsByDate.value = data
        console.log(data)
    })
    function onServiceSelected(service){
        //console.log(service)
        //comprovacion si en el arreglo de services tenemos ya ese servicio no lo debemos guardar
        if(services.value.some(itemSelectedService => itemSelectedService._id === service._id)){
            //si ya esta en mi arreglo y doy click sobre el lo elimino
            //recorre el arreglo, todos los que sean diferentes al servicio.id guardalos en mi arreglo services
            //no es que lo borre, sino que vuelve a guardar todos los que no correspondan al id que seleccione, aqui solo entra cuando ya habia seleccionado antes
            services.value = services.value.filter(itemSelectedService => itemSelectedService._id !== service._id)
            //console.log("ya esta en la cita")
        }else{
            if (services.value.length == 2) {
                alert('maximo 2 servicios por cita')
                return
            }
            services.value.push(service)
            //console.log("lo agrege correctamente")
        }
        //console.log(services.value)
    }
    //los computed son para que se calculen solos en caso de cambiar algo en ellos
    async function createAppointment(){
        const appointment = {
            services: services.value.map(item => item._id),
            date: converToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }
        try {
            const {data} = await AppointmentAPI.create(appointment)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            clearAppointmentData()
            router.push({name: 'my-appointments'})
        //console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    function clearAppointmentData() {
        services.value = []
        date.value = ''
        time.value = ''
    }
    const isServiceSelected = computed(()=>{
        return (id) => services.value.some( serviceItem => serviceItem._id === id)
            //si algun servicio esta en mi variable services es porque esta seleccionado, 
    }) 

    const noServicesSelected = computed(() => services.value.length === 0)
    //funcion para saber el total de lo seleccionado
    //reduce: lo que hace la funcion es crear una variable total la cual comienza en cero, y va iterando sumando por cada iteracion el precio todo esto de mi arreglo services
    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })
    const isValidReservation = computed(() =>{
        //si hay algo en nuestro arreglo y tenemos alguna fecha y una hora
        return services.value.length && date.value.length && time.value.length
    })

    const isDateSelected = computed(()=>{
        return date.value ? true : false
    })

    const disableTime = computed(()=>{
        return (hour)=>{
            return appointmentsByDate.value.find(appointment => appointment.time === hour)
        }
    })
    return {
        onServiceSelected,
        createAppointment,
        isServiceSelected,
        services,
        date,
        hours,
        time,
        totalAmount,
        noServicesSelected,
        isValidReservation,
        isDateSelected,
        disableTime
    }
})