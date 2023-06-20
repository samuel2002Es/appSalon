<template>
  <h2 class="text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
  <p class="text-white text=lg">A continuacion verifica la información y confirma tu cita</p>

  <h3 class="text-3xl font-extrabold text-white">Servicios</h3>

  <p v-if="appointments.noServicesSelected" class="text-white text-2xl text-center">No hay servicios seleccionados</p>
  <div v-else
  class="grid gap-5"
  >
  <SelectedService 
    v-for="service in appointments.services"
    :key="service._id"
    :service="service"
  ></SelectedService>
    <p
      class="text-white text-right text-2xl">Total a pagar: 
      <span class="font-black">{{ formatCurrrency(appointments.totalAmount) }}</span>
    </p>
  </div>

  <div class="space-y-8" v-if="!appointments.noServicesSelected">
    <h3 class="text-3xl font-extrabold text-white">Fecha y hora</h3>
    
    <div class="lg:flex gap-5 items-start">
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <VueTailwindDatePicker 
          i18n="es-mx"
          as-single
          no-input
        ></VueTailwindDatePicker>
      </div>
      <div>
        
      </div>
    </div>
  </div>

</template>
<script setup>
import SelectedService from '../../components/SelectedService.vue';
import { useAppointmentsStore } from '../../stores/appointments';
import { formatCurrrency } from '../../helpers'
import VueTailwindDatePicker from 'vue-tailwind-datepicker'

const appointments = useAppointmentsStore()
</script>
