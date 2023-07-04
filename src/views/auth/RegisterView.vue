<template>
  <div>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
    <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalón</p>
    <FormKit 
        id="registerForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit 
            type="text"
            label="Nombre"
            name="name"
            placeholder="Tu nombre"
            validation="required|length:3"
            :validation-messages="{
                required: 'EL nombre es obligatorio',
                length: 'El nombre es muy corto'
            }"
        />
        <!-- lo que se le envia al servidor es lo que corresponde a name y nos ayuda a recuperar los datos en el handle submit -->
        <FormKit 
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Registro"
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
            placeholder="Password de Usuario - Min 8 Caracteres"
            validation="required|length:8"
            :validation-messages="{
                required: 'EL password es obligatorio',
                length: 'El password debe contener al menos 8 caracteres'
            }"
        />
        <!-- la regla para crear el confirm es en name debe comenzar con el name a confirmar si son iguales despues tiene que ir separado por un _ y confirm-->
        <FormKit 
            type="password"
            label="Repetir Password"
            name="password_confirm"
            placeholder="Repite el password"
            validation="required|confirm"
            :validation-messages="{
                required: 'EL password es obligatorio',
                confirm: 'Los passwords no son iguales'
            }"
        />


        <FormKit
            type="submit">Crear Cuenta</FormKit>
    </FormKit>
  </div>
</template>
<script setup>
    import { inject } from 'vue'
    import AuthAPI from '../../api/AuthAPI'
    //import { useToastn } from '../../stores/toastPrueba';
    import { reset } from '@formkit/vue'


    //usando store
    /* const store = useToastn()  
    store.toastPrueba.open({
        message:'Soy buenisimo',
        type: 'success'
    }) */
    //usando inject desde main
    const toast = inject('toast')
    /* toast.open({
    message: 'Probando Toast',
    type: 'success'
    })
 */
    //utilizando destructuracion sacamos password_confirm, y volvemos a escribir la data sin ese valor
    const handleSubmit = async ({password_confirm, ...FormData}) => {
        console.log(FormData)
        //para obtener todos los errores que se tengan de faltas en informacion que previamente establecimos, tenemos que meterlo en un try catch
        try {
            //interaccion con base de datos tiene que llevar el await
            //data siempre se crea en axios cuando una peticion es correcta
            const { data } = await AuthAPI.register(FormData)
            //console.log(data.msg)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            reset('registerForm')
        } catch (error) {
            //consultas que fallan con axios estan en response
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
            console.log(error)
        }
    }   

</script>
