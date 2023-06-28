<template>
  <div>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
    <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalón</p>
    <FormKit 
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
    import AuthAPI from '../../api/AuthAPI'
    //utilizando destructuracion sacamos password_confirm, y volvemos a escribir la data sin ese valor
    const handleSubmit = async ({password_confirm, ...data}) => {
        //para obtener todos los errores que se tengan de faltas en informacion que previamente establecimos, tenemos que meterlo en un try catch
        try {
            //interaccion con base de datos tiene que llevar el await
            await AuthAPI.register(data)
        } catch (error) {
            console.log(error)
        }
    }   

</script>
