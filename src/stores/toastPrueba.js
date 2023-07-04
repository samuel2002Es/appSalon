import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
//para que las notificaciones se vean bien 
import "vue-toast-notification/dist/theme-default.css"
//import "vue-toast-notification/dist/theme-sugar.css" and theme-boostrap

export const useToastn = defineStore('toastPrueba', ()=>{
    const toastPrueba = useToast({
        duration: 5000,
        position: 'top-left'
    });

    return {
        toastPrueba
    }
})