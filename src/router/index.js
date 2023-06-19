import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayous from '/home/samuel/Documentos/vue_udemy/proyectoSalon/frontend/src/views/appointments/AppointmentsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayous,
      children: [
        {
          path: '/reservaciones/nueva',
          component: ()=> import('../views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: ()=> import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'appointmet-details',
              component: ()=> import('../views/appointments/AppointmentView.vue'),
            }
          ]
        }
      ]
    },
  ]
})

export default router
