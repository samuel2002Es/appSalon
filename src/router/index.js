import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayous from '/home/samuel/Documentos/vue_udemy/proyectoSalon/frontend/src/views/appointments/AppointmentsLayout.vue'
import AuthAPI from '../api/AuthAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    //todas estas rutas no deberian ser publicas o visibles para todos, solo los autenticados
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayous,
      meta: { requiresAuth: true},
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: ()=> import('../views/appointments/MyAppointmentsView.vue'),
        },
        {
          path: 'nueva',
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

//ejecutar antes de mandar informacion
//to = pagina donde vamos. from = de donde venimos. next =
router.beforeEach( async (to,from,next)=>{
  //validamos si requiere validacion la ruta, si requiere autenticacion enviamos peticion al backend y si aun esta vigente
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    try {
      //aqui con lo que esta comentado traemos la informacion del usuario, esto nos serviria el guardarlo en lo que es el estore, para presentarlo cuando sea necesario
      /* const {data} = await AuthAPI.auth() 
      console.log(data) */
      await AuthAPI.auth() 
      next()
    } catch (error) {
      //que hacer cuando el token no es valido
      next({
        name: 'login',
      })
    }
  }else{
    next()
  }
  console.log(requiresAuth)
})
export default router
