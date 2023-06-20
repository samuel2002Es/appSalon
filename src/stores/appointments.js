import {defineStore} from 'pinia'
import { ref, computed } from 'vue'

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])

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
    return {
        onServiceSelected,
        isServiceSelected,
        services,
        totalAmount,
        noServicesSelected
    }
})