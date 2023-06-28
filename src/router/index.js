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
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: ()=> import('../views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: ()=> import('../views/auth/ConfirmAccountView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: ()=> import('../views/auth/LoginView.vue')
        }
      ]
    }
  ]
})

export default router
