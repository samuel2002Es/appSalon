<template>
  <div
  class="p-5 space-y-5 rounded-lg cursor-pointer bg-white"
  >
    <p class="text-2xl font-light">{{ service.name }}</p>
    <p class="text-4xl font-black text-blue-600">{{ service.price }}</p>
    <p class="text-4xl font-black text-blue-600">{{ formatCurrrency(service.price)}}</p>
  </div>
</template>
<script setup>
    import { formatCurrrency } from '../helpers'
    defineProps({
        service: {
            type: Object
        }
    })
</script>
