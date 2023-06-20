import { ref } from 'vue';
import { defineStore } from 'pinia';



export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(false)
    const authModal = ref(false)

    function login() {
        isAuth.value = true
    }

    function logout() {
        isAuth.value = false
    }

    return { isAuth, authModal, login, logout }
})