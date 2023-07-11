import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '../api/AuthAPI'

export const useUserStore = defineStore('user', () =>{
    const router = useRouter()
    const user = ref({})
    onMounted(async ()=>{
        try {
            const {data} = await AuthAPI.auth()
            console.log(data)
            user.value = data
        } catch (error) {
            console.log(error)
        }
    })
    function logout(){
        //eliminar storage
        localStorage.removeItem('AUTH_TOKEN')
        //reiniciar user
        user.value = {}
        //redireccionar con router
        router.push({name: 'login'})
    }
    const getUserName = computed(()=>user.value?.name ? user.value?.name:'' )
    return {
    user,
    logout,
    getUserName
    }
})