<template>
  <div
  class="p-5 space-y-5 rounded-lg cursor-pointer bg-white"
  >
    <p class="text-2xl font-light">{{ service.name }}</p>
    <p>{{ formatCurrency(service.price) }}</p>
  </div>
</template>
<script setup>
    import { formatCurrency } from '../helpers'
    defineProps({
        service: {
            type: Object
        }
    })
</script>
