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

</template>
<script setup>
import SelectedService from '../../components/SelectedService.vue';
import { useAppointmentsStore } from '../../stores/appointments';
import { formatCurrrency } from '../../helpers'

const appointments = useAppointmentsStore()
</script>
