<template>
  <div>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesión</h1>
    <p class="text-2xl text-white text-center my-5">Si tienes un cuenta, inicia sesión</p>
    <FormKit 
        id="loginForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <!-- lo que se le envia al servidor es lo que corresponde a name y nos ayuda a recuperar los datos en el handle submit -->
        <FormKit 
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Usuario"
            validation="required|email"
            :validation-messages="{
                required: 'EL email es obligatorio',
                email: 'Email no valido'
            }"
        />
        <FormKit 
            type="password"
            label="Password"
            name="password"
            placeholder="Password de Usuario"
            validation="required"
            :validation-messages="{
                required: 'EL password es obligatorio',
            }"
        />
        <!-- la regla para crear el confirm es en name debe comenzar con el name a confirmar si son iguales despues tiene que ir separado por un _ y confirm-->


        <FormKit
            type="submit">Iniciar sesión</FormKit>
    </FormKit>
  </div>
</template>
<script setup>
import AuthAPI from '../../api/AuthAPI'
import { inject } from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter()
const toast = inject('toast')
const handleSubmit = async (formData)=>{
    try {
        const { data } = await AuthAPI.login(formData)
        toast.open({
                message: data.msg,
                type: 'success'
            })
            //console.log(data.token)
        localStorage.setItem('AUTH_TOKEN', data.token)
        setTimeout(()=>{
            router.push({name: 'my-appointments'})
        },5000)
    } catch (error) {
        toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
    }
}
</script>
